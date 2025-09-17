import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { newsletterSubscriptionsTable } from '../db/schema';
import { type CreateNewsletterSubscriptionInput } from '../schema';
import { createNewsletterSubscription } from '../handlers/create_newsletter_subscription';
import { eq } from 'drizzle-orm';

// Test input with name
const testInputWithName: CreateNewsletterSubscriptionInput = {
  email: 'test@example.com',
  name: 'John Doe'
};

// Test input without name (nullable field)
const testInputWithoutName: CreateNewsletterSubscriptionInput = {
  email: 'anonymous@example.com',
  name: null
};

describe('createNewsletterSubscription', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should create a newsletter subscription with name', async () => {
    const result = await createNewsletterSubscription(testInputWithName);

    // Basic field validation
    expect(result.email).toEqual('test@example.com');
    expect(result.name).toEqual('John Doe');
    expect(result.subscribed).toEqual(true);
    expect(result.id).toBeDefined();
    expect(result.created_at).toBeInstanceOf(Date);
    expect(result.updated_at).toBeInstanceOf(Date);
  });

  it('should create a newsletter subscription without name', async () => {
    const result = await createNewsletterSubscription(testInputWithoutName);

    // Basic field validation
    expect(result.email).toEqual('anonymous@example.com');
    expect(result.name).toBeNull();
    expect(result.subscribed).toEqual(true);
    expect(result.id).toBeDefined();
    expect(result.created_at).toBeInstanceOf(Date);
    expect(result.updated_at).toBeInstanceOf(Date);
  });

  it('should save newsletter subscription to database', async () => {
    const result = await createNewsletterSubscription(testInputWithName);

    // Query using proper drizzle syntax
    const subscriptions = await db.select()
      .from(newsletterSubscriptionsTable)
      .where(eq(newsletterSubscriptionsTable.id, result.id))
      .execute();

    expect(subscriptions).toHaveLength(1);
    expect(subscriptions[0].email).toEqual('test@example.com');
    expect(subscriptions[0].name).toEqual('John Doe');
    expect(subscriptions[0].subscribed).toEqual(true);
    expect(subscriptions[0].created_at).toBeInstanceOf(Date);
    expect(subscriptions[0].updated_at).toBeInstanceOf(Date);
  });

  it('should set subscribed to true by default', async () => {
    const result = await createNewsletterSubscription(testInputWithName);

    // Verify subscription status is active
    expect(result.subscribed).toEqual(true);

    // Verify in database as well
    const subscriptions = await db.select()
      .from(newsletterSubscriptionsTable)
      .where(eq(newsletterSubscriptionsTable.id, result.id))
      .execute();

    expect(subscriptions[0].subscribed).toEqual(true);
  });

  it('should handle multiple subscriptions correctly', async () => {
    // Create multiple subscriptions
    const result1 = await createNewsletterSubscription(testInputWithName);
    const result2 = await createNewsletterSubscription(testInputWithoutName);

    // Verify both subscriptions exist
    const allSubscriptions = await db.select()
      .from(newsletterSubscriptionsTable)
      .execute();

    expect(allSubscriptions).toHaveLength(2);
    
    // Verify each subscription has unique ID and correct data
    const ids = allSubscriptions.map(sub => sub.id);
    expect(new Set(ids).size).toEqual(2); // All IDs should be unique
    
    const emails = allSubscriptions.map(sub => sub.email);
    expect(emails).toContain('test@example.com');
    expect(emails).toContain('anonymous@example.com');
  });

  it('should set timestamps correctly', async () => {
    const before = new Date();
    const result = await createNewsletterSubscription(testInputWithName);
    const after = new Date();

    // Verify timestamps are within reasonable range
    expect(result.created_at.getTime()).toBeGreaterThanOrEqual(before.getTime());
    expect(result.created_at.getTime()).toBeLessThanOrEqual(after.getTime());
    expect(result.updated_at.getTime()).toBeGreaterThanOrEqual(before.getTime());
    expect(result.updated_at.getTime()).toBeLessThanOrEqual(after.getTime());
  });
});