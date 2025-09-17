import { db } from '../db';
import { blogPostsTable } from '../db/schema';
import { type BlogPost } from '../schema';
import { eq, desc } from 'drizzle-orm';

export const getBlogPosts = async (published?: boolean): Promise<BlogPost[]> => {
  try {
    // Build query based on filter
    const results = published !== undefined
      ? await db.select()
          .from(blogPostsTable)
          .where(eq(blogPostsTable.published, published))
          .orderBy(desc(blogPostsTable.created_at))
          .execute()
      : await db.select()
          .from(blogPostsTable)
          .orderBy(desc(blogPostsTable.created_at))
          .execute();

    // Return results with proper date type coercion
    return results.map(post => ({
      ...post,
      created_at: post.created_at,
      updated_at: post.updated_at,
      published_at: post.published_at
    }));
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
    throw error;
  }
};