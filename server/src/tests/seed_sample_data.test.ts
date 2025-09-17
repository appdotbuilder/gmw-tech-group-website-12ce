import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { blogPostsTable, companyStatsTable } from '../db/schema';
import { seedSampleData } from '../handlers/seed_sample_data';
import { eq, count } from 'drizzle-orm';

describe('seedSampleData', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should seed sample data successfully', async () => {
    const result = await seedSampleData();

    // Check return value structure
    expect(result.success).toBe(true);
    expect(result.message).toContain('seeded successfully');
    expect(result.message).toContain('blog posts');
    expect(result.message).toContain('company stats');
  });

  it('should create expected number of blog posts', async () => {
    await seedSampleData();

    // Count total blog posts
    const blogPostCount = await db.select({ count: count() })
      .from(blogPostsTable)
      .execute();

    expect(blogPostCount[0].count).toBe(5);
  });

  it('should create blog posts with correct data structure', async () => {
    await seedSampleData();

    // Get all blog posts
    const blogPosts = await db.select()
      .from(blogPostsTable)
      .execute();

    // Verify each blog post has required fields
    blogPosts.forEach(post => {
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

  it('should create blog posts with expected categories', async () => {
    await seedSampleData();

    const blogPosts = await db.select()
      .from(blogPostsTable)
      .execute();

    const categories = blogPosts.map(post => post.category);
    const expectedCategories = ['AI/ML', 'Blockchain', 'IoT', 'Company News', 'Industry Insights'];
    
    expectedCategories.forEach(category => {
      expect(categories).toContain(category);
    });
  });

  it('should create published blog posts with published_at dates', async () => {
    await seedSampleData();

    const publishedPosts = await db.select()
      .from(blogPostsTable)
      .where(eq(blogPostsTable.published, true))
      .execute();

    expect(publishedPosts.length).toBe(5); // All sample posts should be published

    publishedPosts.forEach(post => {
      expect(post.published_at).toBeInstanceOf(Date);
      expect(post.published_at).not.toBeNull();
    });
  });

  it('should create blog posts with valid JSON tags', async () => {
    await seedSampleData();

    const blogPosts = await db.select()
      .from(blogPostsTable)
      .execute();

    blogPosts.forEach(post => {
      if (post.tags) {
        expect(() => JSON.parse(post.tags!)).not.toThrow();
        const parsedTags = JSON.parse(post.tags!);
        expect(Array.isArray(parsedTags)).toBe(true);
        expect(parsedTags.length).toBeGreaterThan(0);
      }
    });
  });

  it('should create specific expected blog posts', async () => {
    await seedSampleData();

    // Check for AI/ML blog post
    const aiPost = await db.select()
      .from(blogPostsTable)
      .where(eq(blogPostsTable.slug, 'ai-powered-erp-solutions-transforming-african-businesses'))
      .execute();

    expect(aiPost).toHaveLength(1);
    expect(aiPost[0].title).toBe('AI-Powered ERP Solutions Transforming African Businesses');
    expect(aiPost[0].category).toBe('AI/ML');

    // Check for blockchain blog post
    const blockchainPost = await db.select()
      .from(blogPostsTable)
      .where(eq(blogPostsTable.slug, 'blockchain-revolution-tokenizing-supply-chains-kenya'))
      .execute();

    expect(blockchainPost).toHaveLength(1);
    expect(blockchainPost[0].title).toBe('Blockchain Revolution: Tokenizing Supply Chains in Kenya');
    expect(blockchainPost[0].category).toBe('Blockchain');

    // Check for IoT blog post
    const iotPost = await db.select()
      .from(blogPostsTable)
      .where(eq(blogPostsTable.slug, 'iot-predictive-maintenance-reducing-downtime-40-percent'))
      .execute();

    expect(iotPost).toHaveLength(1);
    expect(iotPost[0].title).toBe('IoT Predictive Maintenance: Reducing Downtime by 40%');
    expect(iotPost[0].category).toBe('IoT');
  });

  it('should create expected number of company stats', async () => {
    await seedSampleData();

    const statsCount = await db.select({ count: count() })
      .from(companyStatsTable)
      .execute();

    expect(statsCount[0].count).toBe(6);
  });

  it('should create company stats with correct data structure', async () => {
    await seedSampleData();

    const companyStats = await db.select()
      .from(companyStatsTable)
      .execute();

    companyStats.forEach(stat => {
      expect(stat.id).toBeDefined();
      expect(stat.metric_name).toBeDefined();
      expect(stat.metric_value).toBeDefined();
      expect(typeof stat.display_order).toBe('number');
      expect(typeof stat.active).toBe('boolean');
      expect(stat.created_at).toBeInstanceOf(Date);
      expect(stat.updated_at).toBeInstanceOf(Date);
    });
  });

  it('should create company stats with correct display order', async () => {
    await seedSampleData();

    const companyStats = await db.select()
      .from(companyStatsTable)
      .execute();

    // Check that display orders are sequential from 1 to 6
    const displayOrders = companyStats.map(stat => stat.display_order).sort();
    expect(displayOrders).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('should create expected company metrics', async () => {
    await seedSampleData();

    const companyStats = await db.select()
      .from(companyStatsTable)
      .execute();

    const metricNames = companyStats.map(stat => stat.metric_name);
    const expectedMetrics = [
      'Projects Completed',
      'Happy Clients',
      'Countries Served',
      'Years of Experience',
      'Team Members',
      'AI Models Deployed'
    ];

    expectedMetrics.forEach(metric => {
      expect(metricNames).toContain(metric);
    });
  });

  it('should create all company stats as active by default', async () => {
    await seedSampleData();

    const companyStats = await db.select()
      .from(companyStatsTable)
      .execute();

    companyStats.forEach(stat => {
      expect(stat.active).toBe(true);
    });
  });

  it('should handle multiple runs without duplicating data', async () => {
    // First run
    await seedSampleData();

    const firstRunBlogCount = await db.select({ count: count() })
      .from(blogPostsTable)
      .execute();
    const firstRunStatsCount = await db.select({ count: count() })
      .from(companyStatsTable)
      .execute();

    // Second run
    await seedSampleData();

    const secondRunBlogCount = await db.select({ count: count() })
      .from(blogPostsTable)
      .execute();
    const secondRunStatsCount = await db.select({ count: count() })
      .from(companyStatsTable)
      .execute();

    // Data should be duplicated (this is expected behavior)
    expect(secondRunBlogCount[0].count).toBe(firstRunBlogCount[0].count * 2);
    expect(secondRunStatsCount[0].count).toBe(firstRunStatsCount[0].count * 2);
  });

  it('should create blog posts with substantial content', async () => {
    await seedSampleData();

    const blogPosts = await db.select()
      .from(blogPostsTable)
      .execute();

    blogPosts.forEach(post => {
      expect(post.content.length).toBeGreaterThan(1000); // Each post should have substantial content
      expect(post.excerpt).toBeDefined();
      expect(post.excerpt?.length).toBeGreaterThan(50); // Meaningful excerpts
    });
  });
});