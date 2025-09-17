import { db } from '../db';
import { blogPostsTable } from '../db/schema';
import { type UpdateBlogPostInput, type BlogPost } from '../schema';
import { eq } from 'drizzle-orm';

export const updateBlogPost = async (input: UpdateBlogPostInput): Promise<BlogPost | null> => {
  try {
    const { id, ...updateData } = input;
    
    // Check if the blog post exists
    const existingPost = await db.select()
      .from(blogPostsTable)
      .where(eq(blogPostsTable.id, id))
      .execute();

    if (existingPost.length === 0) {
      return null;
    }

    // Prepare update values, handling published_at logic
    const updateValues: any = {
      ...updateData,
      updated_at: new Date()
    };

    // If publishing a post, set published_at to current time
    // If unpublishing a post, set published_at to null
    if (updateData.published === true && !existingPost[0].published) {
      updateValues.published_at = new Date();
    } else if (updateData.published === false) {
      updateValues.published_at = null;
    }

    // Update the blog post
    const result = await db.update(blogPostsTable)
      .set(updateValues)
      .where(eq(blogPostsTable.id, id))
      .returning()
      .execute();

    if (result.length === 0) {
      return null;
    }

    return result[0];
  } catch (error) {
    console.error('Blog post update failed:', error);
    throw error;
  }
};