import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { blogPostsTable } from '../db/schema';
import { type CreateBlogPostInput } from '../schema';
import { getBlogPosts } from '../handlers/get_blog_posts';

// Test blog post data
const testPublishedPost: CreateBlogPostInput = {
  title: 'Published Blog Post',
  slug: 'published-blog-post',
  excerpt: 'This is a published post excerpt',
  content: 'This is the content of a published blog post.',
  author: 'Test Author',
  category: 'Technology',
  tags: '["tech", "blog"]',
  featured_image: 'https://example.com/image.jpg',
  published: true
};

const testDraftPost: CreateBlogPostInput = {
  title: 'Draft Blog Post',
  slug: 'draft-blog-post',
  excerpt: 'This is a draft post excerpt',
  content: 'This is the content of a draft blog post.',
  author: 'Test Author',
  category: 'Technology',
  tags: '["draft", "test"]',
  featured_image: null,
  published: false
};

const testOldPost: CreateBlogPostInput = {
  title: 'Old Blog Post',
  slug: 'old-blog-post',
  excerpt: null,
  content: 'This is an older blog post content.',
  author: 'Old Author',
  category: 'Business',
  tags: null,
  featured_image: null,
  published: true
};

describe('getBlogPosts', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should return all blog posts when no filter is applied', async () => {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 3600000);
    const twoHoursAgo = new Date(now.getTime() - 7200000);

    // Create test posts with explicit timestamps
    await db.insert(blogPostsTable).values([
      {
        ...testPublishedPost,
        created_at: twoHoursAgo,
        updated_at: twoHoursAgo,
        published_at: twoHoursAgo
      },
      {
        ...testDraftPost,
        created_at: oneHourAgo,
        updated_at: oneHourAgo
      },
      {
        ...testOldPost,
        created_at: now,
        updated_at: now,
        published_at: now
      }
    ]).execute();

    const result = await getBlogPosts();

    expect(result).toHaveLength(3);
    
    // Should be ordered by created_at descending (newest first)
    expect(result[0].title).toEqual('Old Blog Post');
    expect(result[1].title).toEqual('Draft Blog Post');
    expect(result[2].title).toEqual('Published Blog Post');

    // Verify all fields are present
    result.forEach(post => {
      expect(post.id).toBeDefined();
      expect(post.title).toBeDefined();
      expect(post.slug).toBeDefined();
      expect(post.content).toBeDefined();
      expect(post.author).toBeDefined();
      expect(post.category).toBeDefined();
      expect(typeof post.published).toBe('boolean');
      expect(post.created_at).toBeInstanceOf(Date);
      expect(post.updated_at).toBeInstanceOf(Date);
    });
  });

  it('should return only published posts when published=true', async () => {
    // Create test posts
    await db.insert(blogPostsTable).values([
      {
        ...testPublishedPost,
        published_at: new Date()
      },
      {
        ...testDraftPost
      },
      {
        ...testOldPost,
        published_at: new Date(Date.now() - 86400000)
      }
    ]).execute();

    const result = await getBlogPosts(true);

    expect(result).toHaveLength(2);
    result.forEach(post => {
      expect(post.published).toBe(true);
    });

    // Should include both published posts
    const titles = result.map(p => p.title);
    expect(titles).toContain('Published Blog Post');
    expect(titles).toContain('Old Blog Post');
    expect(titles).not.toContain('Draft Blog Post');
  });

  it('should return only draft posts when published=false', async () => {
    // Create test posts
    await db.insert(blogPostsTable).values([
      {
        ...testPublishedPost,
        published_at: new Date()
      },
      {
        ...testDraftPost
      }
    ]).execute();

    const result = await getBlogPosts(false);

    expect(result).toHaveLength(1);
    expect(result[0].published).toBe(false);
    expect(result[0].title).toEqual('Draft Blog Post');
    expect(result[0].published_at).toBeNull();
  });

  it('should return empty array when no posts exist', async () => {
    const result = await getBlogPosts();

    expect(result).toHaveLength(0);
    expect(Array.isArray(result)).toBe(true);
  });

  it('should return empty array when no published posts exist', async () => {
    // Create only draft posts
    await db.insert(blogPostsTable).values([
      {
        ...testDraftPost
      }
    ]).execute();

    const result = await getBlogPosts(true);

    expect(result).toHaveLength(0);
    expect(Array.isArray(result)).toBe(true);
  });

  it('should handle nullable fields correctly', async () => {
    // Create post with minimal required fields
    await db.insert(blogPostsTable).values([
      {
        title: 'Minimal Post',
        slug: 'minimal-post',
        excerpt: null,
        content: 'Minimal content',
        author: 'Author',
        category: 'Test',
        tags: null,
        featured_image: null,
        published: false
      }
    ]).execute();

    const result = await getBlogPosts();

    expect(result).toHaveLength(1);
    expect(result[0].excerpt).toBeNull();
    expect(result[0].tags).toBeNull();
    expect(result[0].featured_image).toBeNull();
    expect(result[0].published_at).toBeNull();
    expect(result[0].title).toEqual('Minimal Post');
  });

  it('should maintain correct order with multiple posts', async () => {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 3600000);
    const twoHoursAgo = new Date(now.getTime() - 7200000);

    // Create posts with specific timestamps
    await db.insert(blogPostsTable).values([
      {
        ...testPublishedPost,
        title: 'Newest Post',
        created_at: now,
        updated_at: now,
        published_at: now
      }
    ]).execute();

    await db.insert(blogPostsTable).values([
      {
        ...testDraftPost,
        title: 'Middle Post',
        created_at: oneHourAgo,
        updated_at: oneHourAgo
      }
    ]).execute();

    await db.insert(blogPostsTable).values([
      {
        ...testOldPost,
        title: 'Oldest Post',
        created_at: twoHoursAgo,
        updated_at: twoHoursAgo,
        published_at: twoHoursAgo
      }
    ]).execute();

    const result = await getBlogPosts();

    expect(result).toHaveLength(3);
    expect(result[0].title).toEqual('Newest Post');
    expect(result[1].title).toEqual('Middle Post');
    expect(result[2].title).toEqual('Oldest Post');
  });
});