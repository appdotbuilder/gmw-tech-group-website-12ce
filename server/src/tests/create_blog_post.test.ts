import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { blogPostsTable } from '../db/schema';
import { type CreateBlogPostInput } from '../schema';
import { createBlogPost } from '../handlers/create_blog_post';
import { eq } from 'drizzle-orm';

// Test input for creating a published blog post
const publishedPostInput: CreateBlogPostInput = {
  title: 'How AI is Transforming Business Strategy',
  slug: 'ai-transforming-business-strategy',
  excerpt: 'Discover how artificial intelligence is revolutionizing the way companies approach strategic planning.',
  content: 'Artificial intelligence has become a game-changer in the business world. From automating routine tasks to providing predictive analytics, AI is reshaping how companies operate and make decisions.',
  author: 'John Smith',
  category: 'Technology',
  tags: '["AI", "Business Strategy", "Machine Learning", "Digital Transformation"]',
  featured_image: 'https://example.com/ai-business.jpg',
  published: true
};

// Test input for creating a draft blog post
const draftPostInput: CreateBlogPostInput = {
  title: 'The Future of Blockchain in Supply Chain',
  slug: 'blockchain-supply-chain-future',
  excerpt: null,
  content: 'This is a draft article about blockchain applications in supply chain management.',
  author: 'Jane Doe',
  category: 'Blockchain',
  tags: null,
  featured_image: null,
  published: false
};

describe('createBlogPost', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should create a published blog post', async () => {
    const result = await createBlogPost(publishedPostInput);

    // Basic field validation
    expect(result.title).toEqual('How AI is Transforming Business Strategy');
    expect(result.slug).toEqual('ai-transforming-business-strategy');
    expect(result.excerpt).toEqual(publishedPostInput.excerpt);
    expect(result.content).toEqual(publishedPostInput.content);
    expect(result.author).toEqual('John Smith');
    expect(result.category).toEqual('Technology');
    expect(result.tags).toEqual('["AI", "Business Strategy", "Machine Learning", "Digital Transformation"]');
    expect(result.featured_image).toEqual('https://example.com/ai-business.jpg');
    expect(result.published).toBe(true);
    expect(result.id).toBeDefined();
    expect(result.created_at).toBeInstanceOf(Date);
    expect(result.updated_at).toBeInstanceOf(Date);
    expect(result.published_at).toBeInstanceOf(Date);
  });

  it('should create a draft blog post with null published_at', async () => {
    const result = await createBlogPost(draftPostInput);

    // Basic field validation
    expect(result.title).toEqual('The Future of Blockchain in Supply Chain');
    expect(result.slug).toEqual('blockchain-supply-chain-future');
    expect(result.excerpt).toBeNull();
    expect(result.content).toEqual(draftPostInput.content);
    expect(result.author).toEqual('Jane Doe');
    expect(result.category).toEqual('Blockchain');
    expect(result.tags).toBeNull();
    expect(result.featured_image).toBeNull();
    expect(result.published).toBe(false);
    expect(result.published_at).toBeNull();
    expect(result.id).toBeDefined();
    expect(result.created_at).toBeInstanceOf(Date);
    expect(result.updated_at).toBeInstanceOf(Date);
  });

  it('should save blog post to database', async () => {
    const result = await createBlogPost(publishedPostInput);

    // Query using proper drizzle syntax
    const blogPosts = await db.select()
      .from(blogPostsTable)
      .where(eq(blogPostsTable.id, result.id))
      .execute();

    expect(blogPosts).toHaveLength(1);
    const savedPost = blogPosts[0];
    expect(savedPost.title).toEqual('How AI is Transforming Business Strategy');
    expect(savedPost.slug).toEqual('ai-transforming-business-strategy');
    expect(savedPost.excerpt).toEqual(publishedPostInput.excerpt);
    expect(savedPost.content).toEqual(publishedPostInput.content);
    expect(savedPost.author).toEqual('John Smith');
    expect(savedPost.category).toEqual('Technology');
    expect(savedPost.tags).toEqual('["AI", "Business Strategy", "Machine Learning", "Digital Transformation"]');
    expect(savedPost.featured_image).toEqual('https://example.com/ai-business.jpg');
    expect(savedPost.published).toBe(true);
    expect(savedPost.published_at).toBeInstanceOf(Date);
    expect(savedPost.created_at).toBeInstanceOf(Date);
    expect(savedPost.updated_at).toBeInstanceOf(Date);
  });

  it('should handle minimal required fields only', async () => {
    const minimalInput: CreateBlogPostInput = {
      title: 'Minimal Post',
      slug: 'minimal-post',
      excerpt: null,
      content: 'This is a minimal blog post with only required fields.',
      author: 'Test Author',
      category: 'General',
      tags: null,
      featured_image: null,
      published: false
    };

    const result = await createBlogPost(minimalInput);

    expect(result.title).toEqual('Minimal Post');
    expect(result.slug).toEqual('minimal-post');
    expect(result.excerpt).toBeNull();
    expect(result.content).toEqual('This is a minimal blog post with only required fields.');
    expect(result.author).toEqual('Test Author');
    expect(result.category).toEqual('General');
    expect(result.tags).toBeNull();
    expect(result.featured_image).toBeNull();
    expect(result.published).toBe(false);
    expect(result.published_at).toBeNull();
    expect(result.id).toBeDefined();
    expect(result.created_at).toBeInstanceOf(Date);
    expect(result.updated_at).toBeInstanceOf(Date);
  });

  it('should set published_at when published is true', async () => {
    const beforeTime = new Date();
    const result = await createBlogPost(publishedPostInput);
    const afterTime = new Date();

    expect(result.published).toBe(true);
    expect(result.published_at).toBeInstanceOf(Date);
    expect(result.published_at!.getTime()).toBeGreaterThanOrEqual(beforeTime.getTime());
    expect(result.published_at!.getTime()).toBeLessThanOrEqual(afterTime.getTime());
  });

  it('should not set published_at when published is false', async () => {
    const result = await createBlogPost(draftPostInput);

    expect(result.published).toBe(false);
    expect(result.published_at).toBeNull();
  });

  it('should create multiple blog posts with unique IDs', async () => {
    const result1 = await createBlogPost(publishedPostInput);
    
    // Create a second post with different slug
    const secondPostInput = {
      ...publishedPostInput,
      title: 'Second Blog Post',
      slug: 'second-blog-post'
    };
    const result2 = await createBlogPost(secondPostInput);

    expect(result1.id).not.toEqual(result2.id);
    expect(result1.title).toEqual('How AI is Transforming Business Strategy');
    expect(result2.title).toEqual('Second Blog Post');

    // Verify both posts are in database
    const allPosts = await db.select()
      .from(blogPostsTable)
      .execute();

    expect(allPosts).toHaveLength(2);
  });
});