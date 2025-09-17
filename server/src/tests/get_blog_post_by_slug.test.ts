import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { blogPostsTable } from '../db/schema';
import { getBlogPostBySlug } from '../handlers/get_blog_post_by_slug';

// Test blog post data
const testBlogPost = {
  title: 'Test Blog Post',
  slug: 'test-blog-post',
  excerpt: 'This is a test excerpt',
  content: 'This is the full content of the test blog post. It contains detailed information about the topic.',
  author: 'John Doe',
  category: 'Technology',
  tags: '["tech", "testing", "blog"]',
  featured_image: 'https://example.com/image.jpg',
  published: true
};

const unpublishedBlogPost = {
  title: 'Unpublished Blog Post',
  slug: 'unpublished-post',
  excerpt: null,
  content: 'This post is not published yet.',
  author: 'Jane Smith',
  category: 'Draft',
  tags: null,
  featured_image: null,
  published: false
};

describe('getBlogPostBySlug', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should return blog post when found by slug', async () => {
    // Create test blog post in database
    const insertResults = await db.insert(blogPostsTable)
      .values(testBlogPost)
      .returning()
      .execute();

    const createdPost = insertResults[0];

    // Test retrieving by slug
    const result = await getBlogPostBySlug('test-blog-post');

    expect(result).not.toBeNull();
    expect(result!.id).toEqual(createdPost.id);
    expect(result!.title).toEqual('Test Blog Post');
    expect(result!.slug).toEqual('test-blog-post');
    expect(result!.excerpt).toEqual('This is a test excerpt');
    expect(result!.content).toEqual('This is the full content of the test blog post. It contains detailed information about the topic.');
    expect(result!.author).toEqual('John Doe');
    expect(result!.category).toEqual('Technology');
    expect(result!.tags).toEqual('["tech", "testing", "blog"]');
    expect(result!.featured_image).toEqual('https://example.com/image.jpg');
    expect(result!.published).toEqual(true);
    expect(result!.created_at).toBeInstanceOf(Date);
    expect(result!.updated_at).toBeInstanceOf(Date);
  });

  it('should return null when blog post not found', async () => {
    // Test with non-existent slug
    const result = await getBlogPostBySlug('non-existent-slug');

    expect(result).toBeNull();
  });

  it('should return unpublished blog post by slug', async () => {
    // Create unpublished test blog post
    const insertResults = await db.insert(blogPostsTable)
      .values(unpublishedBlogPost)
      .returning()
      .execute();

    const createdPost = insertResults[0];

    // Test retrieving unpublished post by slug
    const result = await getBlogPostBySlug('unpublished-post');

    expect(result).not.toBeNull();
    expect(result!.id).toEqual(createdPost.id);
    expect(result!.title).toEqual('Unpublished Blog Post');
    expect(result!.slug).toEqual('unpublished-post');
    expect(result!.excerpt).toBeNull();
    expect(result!.content).toEqual('This post is not published yet.');
    expect(result!.author).toEqual('Jane Smith');
    expect(result!.category).toEqual('Draft');
    expect(result!.tags).toBeNull();
    expect(result!.featured_image).toBeNull();
    expect(result!.published).toEqual(false);
    expect(result!.published_at).toBeNull();
  });

  it('should handle special characters in slug', async () => {
    // Create blog post with special characters in slug
    const specialSlugPost = {
      ...testBlogPost,
      title: 'Special Blog Post',
      slug: 'special-blog-post-2024'
    };

    await db.insert(blogPostsTable)
      .values(specialSlugPost)
      .returning()
      .execute();

    // Test retrieving by slug with special characters
    const result = await getBlogPostBySlug('special-blog-post-2024');

    expect(result).not.toBeNull();
    expect(result!.title).toEqual('Special Blog Post');
    expect(result!.slug).toEqual('special-blog-post-2024');
  });

  it('should be case sensitive for slug matching', async () => {
    // Create test blog post
    await db.insert(blogPostsTable)
      .values(testBlogPost)
      .returning()
      .execute();

    // Test with different case
    const result = await getBlogPostBySlug('Test-Blog-Post');

    expect(result).toBeNull();
  });

  it('should return only first match when multiple posts exist', async () => {
    // Create multiple test blog posts with different slugs
    const posts = [
      { ...testBlogPost, slug: 'unique-post-1', title: 'First Post' },
      { ...testBlogPost, slug: 'unique-post-2', title: 'Second Post' }
    ];

    await db.insert(blogPostsTable)
      .values(posts)
      .execute();

    // Test retrieving specific post
    const result = await getBlogPostBySlug('unique-post-1');

    expect(result).not.toBeNull();
    expect(result!.title).toEqual('First Post');
    expect(result!.slug).toEqual('unique-post-1');
  });

  it('should handle published_at timestamp correctly', async () => {
    // Create published post with published_at timestamp
    const publishedAt = new Date('2024-01-15T10:00:00Z');
    const publishedPost = {
      ...testBlogPost,
      slug: 'published-post-with-date',
      published_at: publishedAt
    };

    await db.insert(blogPostsTable)
      .values(publishedPost)
      .execute();

    const result = await getBlogPostBySlug('published-post-with-date');

    expect(result).not.toBeNull();
    expect(result!.published_at).toBeInstanceOf(Date);
    expect(result!.published_at!.getTime()).toEqual(publishedAt.getTime());
  });
});