import { db } from '../db';
import { blogPostsTable } from '../db/schema';
import { type BlogPost } from '../schema';
import { eq } from 'drizzle-orm';

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    // Query for the blog post by slug
    const results = await db.select()
      .from(blogPostsTable)
      .where(eq(blogPostsTable.slug, slug))
      .limit(1)
      .execute();

    // Return null if no blog post found
    if (results.length === 0) {
      return null;
    }

    // Return the found blog post
    return results[0];
  } catch (error) {
    console.error('Get blog post by slug failed:', error);
    throw error;
  }
};