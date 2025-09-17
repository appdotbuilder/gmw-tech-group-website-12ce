import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { blogPostsTable } from '../db/schema';
import { type UpdateBlogPostInput, type CreateBlogPostInput } from '../schema';
import { updateBlogPost } from '../handlers/update_blog_post';
import { eq } from 'drizzle-orm';

// Helper to create a test blog post
const createTestPost = async (): Promise<number> => {
  const testPostData: CreateBlogPostInput = {
    title: 'Original Title',
    slug: 'original-title',
    excerpt: 'Original excerpt',
    content: 'Original content for testing',
    author: 'Test Author',
    category: 'technology',
    tags: JSON.stringify(['tech', 'test']),
    featured_image: 'original-image.jpg',
    published: false
  };

  const result = await db.insert(blogPostsTable)
    .values({
      ...testPostData,
      published_at: null
    })
    .returning()
    .execute();

  return result[0].id;
};

// Test inputs for various scenarios
const updateTitleInput = (id: number): UpdateBlogPostInput => ({
  id,
  title: 'Updated Title'
});

const updateMultipleFieldsInput = (id: number): UpdateBlogPostInput => ({
  id,
  title: 'New Title',
  content: 'New content for the blog post',
  category: 'ai_ml',
  published: true
});

const publishPostInput = (id: number): UpdateBlogPostInput => ({
  id,
  published: true
});

const unpublishPostInput = (id: number): UpdateBlogPostInput => ({
  id,
  published: false
});

describe('updateBlogPost', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should update a single field', async () => {
    const postId = await createTestPost();
    const result = await updateBlogPost(updateTitleInput(postId));

    expect(result).not.toBeNull();
    expect(result!.title).toEqual('Updated Title');
    expect(result!.content).toEqual('Original content for testing'); // Unchanged
    expect(result!.updated_at).toBeInstanceOf(Date);
  });

  it('should update multiple fields', async () => {
    const postId = await createTestPost();
    const result = await updateBlogPost(updateMultipleFieldsInput(postId));

    expect(result).not.toBeNull();
    expect(result!.title).toEqual('New Title');
    expect(result!.content).toEqual('New content for the blog post');
    expect(result!.category).toEqual('ai_ml');
    expect(result!.published).toBe(true);
    expect(result!.published_at).toBeInstanceOf(Date);
    expect(result!.updated_at).toBeInstanceOf(Date);
  });

  it('should set published_at when publishing unpublished post', async () => {
    const postId = await createTestPost();
    const result = await updateBlogPost(publishPostInput(postId));

    expect(result).not.toBeNull();
    expect(result!.published).toBe(true);
    expect(result!.published_at).toBeInstanceOf(Date);
    expect(result!.published_at).not.toBeNull();
  });

  it('should set published_at to null when unpublishing', async () => {
    // First create and publish a post
    const postId = await createTestPost();
    await updateBlogPost(publishPostInput(postId));

    // Then unpublish it
    const result = await updateBlogPost(unpublishPostInput(postId));

    expect(result).not.toBeNull();
    expect(result!.published).toBe(false);
    expect(result!.published_at).toBeNull();
  });

  it('should not change published_at if already published', async () => {
    // Create and publish a post first
    const postId = await createTestPost();
    const publishedPost = await updateBlogPost(publishPostInput(postId));
    const originalPublishedAt = publishedPost!.published_at;

    // Wait a moment to ensure different timestamps
    await new Promise(resolve => setTimeout(resolve, 10));

    // Update another field while keeping published true
    const result = await updateBlogPost({
      id: postId,
      title: 'Another Title Update',
      published: true
    });

    expect(result).not.toBeNull();
    expect(result!.title).toEqual('Another Title Update');
    expect(result!.published).toBe(true);
    expect(result!.published_at).toEqual(originalPublishedAt); // Should not change
  });

  it('should save changes to database', async () => {
    const postId = await createTestPost();
    await updateBlogPost(updateMultipleFieldsInput(postId));

    // Query database directly to verify changes were saved
    const posts = await db.select()
      .from(blogPostsTable)
      .where(eq(blogPostsTable.id, postId))
      .execute();

    expect(posts).toHaveLength(1);
    expect(posts[0].title).toEqual('New Title');
    expect(posts[0].content).toEqual('New content for the blog post');
    expect(posts[0].category).toEqual('ai_ml');
    expect(posts[0].published).toBe(true);
    expect(posts[0].published_at).toBeInstanceOf(Date);
  });

  it('should return null for non-existent post', async () => {
    const result = await updateBlogPost({
      id: 99999, // Non-existent ID
      title: 'Updated Title'
    });

    expect(result).toBeNull();
  });

  it('should handle nullable fields correctly', async () => {
    const postId = await createTestPost();
    
    const result = await updateBlogPost({
      id: postId,
      excerpt: null,
      tags: null,
      featured_image: null
    });

    expect(result).not.toBeNull();
    expect(result!.excerpt).toBeNull();
    expect(result!.tags).toBeNull();
    expect(result!.featured_image).toBeNull();
  });

  it('should update only provided fields', async () => {
    const postId = await createTestPost();
    
    // Update only the slug
    const result = await updateBlogPost({
      id: postId,
      slug: 'updated-slug'
    });

    expect(result).not.toBeNull();
    expect(result!.slug).toEqual('updated-slug');
    expect(result!.title).toEqual('Original Title'); // Should remain unchanged
    expect(result!.content).toEqual('Original content for testing'); // Should remain unchanged
    expect(result!.author).toEqual('Test Author'); // Should remain unchanged
  });

  it('should update timestamp fields correctly', async () => {
    const postId = await createTestPost();
    const beforeUpdate = new Date();
    
    const result = await updateBlogPost({
      id: postId,
      title: 'Time Test Title'
    });

    expect(result).not.toBeNull();
    expect(result!.updated_at).toBeInstanceOf(Date);
    expect(result!.updated_at.getTime()).toBeGreaterThanOrEqual(beforeUpdate.getTime());
    expect(result!.created_at).toBeInstanceOf(Date);
  });
});