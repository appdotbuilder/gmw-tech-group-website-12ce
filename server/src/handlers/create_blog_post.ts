import { db } from '../db';
import { blogPostsTable } from '../db/schema';
import { type CreateBlogPostInput, type BlogPost } from '../schema';

export const createBlogPost = async (input: CreateBlogPostInput): Promise<BlogPost> => {
  try {
    // Set published_at timestamp if the post is being published
    const publishedAt = input.published ? new Date() : null;

    // Insert blog post record
    const result = await db.insert(blogPostsTable)
      .values({
        title: input.title,
        slug: input.slug,
        excerpt: input.excerpt,
        content: input.content,
        author: input.author,
        category: input.category,
        tags: input.tags,
        featured_image: input.featured_image,
        published: input.published,
        published_at: publishedAt
      })
      .returning()
      .execute();

    // Return the created blog post
    const blogPost = result[0];
    return blogPost;
  } catch (error) {
    console.error('Blog post creation failed:', error);
    throw error;
  }
};