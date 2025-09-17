import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { newsletterSubscriptionsTable } from '../db/schema';
import { type CreateNewsletterSubscriptionInput } from '../schema';
import { getNewsletterSubscriptions } from '../handlers/get_newsletter_subscriptions';

// Test data for newsletter subscriptions
const testSubscription1: CreateNewsletterSubscriptionInput = {
  email: 'john.doe@example.com',
  name: 'John Doe'
};

const testSubscription2: CreateNewsletterSubscriptionInput = {
  email: 'jane.smith@example.com',
  name: 'Jane Smith'
};

const testSubscription3: CreateNewsletterSubscriptionInput = {
  email: 'anonymous@example.com',
  name: null // Test nullable name
};

describe('getNewsletterSubscriptions', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should return empty array when no subscriptions exist', async () => {
    const result = await getNewsletterSubscriptions();

    expect(result).toEqual([]);
  });

  it('should return all newsletter subscriptions', async () => {
    // Create test subscriptions
    await db.insert(newsletterSubscriptionsTable)
      .values([
        {
          email: testSubscription1.email,
          name: testSubscription1.name
        },
        {
          email: testSubscription2.email,
          name: testSubscription2.name
        },
        {
          email: testSubscription3.email,
          name: testSubscription3.name
        }
      ])
      .execute();

    const result = await getNewsletterSubscriptions();

    expect(result).toHaveLength(3);
    
    // Verify all expected emails are present
    const emails = result.map(sub => sub.email);
    expect(emails).toContain('john.doe@example.com');
    expect(emails).toContain('jane.smith@example.com');
    expect(emails).toContain('anonymous@example.com');
  });

  it('should return subscriptions with correct structure', async () => {
    // Create a test subscription
    await db.insert(newsletterSubscriptionsTable)
      .values({
        email: testSubscription1.email,
        name: testSubscription1.name
      })
      .execute();

    const result = await getNewsletterSubscriptions();

    expect(result).toHaveLength(1);
    const subscription = result[0];

    // Verify all required fields are present
    expect(subscription.id).toBeDefined();
    expect(typeof subscription.id).toBe('number');
    expect(subscription.email).toEqual('john.doe@example.com');
    expect(subscription.name).toEqual('John Doe');
    expect(subscription.subscribed).toEqual(true); // Default value
    expect(subscription.created_at).toBeInstanceOf(Date);
    expect(subscription.updated_at).toBeInstanceOf(Date);
  });

  it('should handle null name values correctly', async () => {
    // Create subscription with null name
    await db.insert(newsletterSubscriptionsTable)
      .values({
        email: testSubscription3.email,
        name: testSubscription3.name
      })
      .execute();

    const result = await getNewsletterSubscriptions();

    expect(result).toHaveLength(1);
    const subscription = result[0];

    expect(subscription.email).toEqual('anonymous@example.com');
    expect(subscription.name).toBeNull();
  });

  it('should return subscriptions ordered by created_at descending', async () => {
    // Create subscriptions with a small delay to ensure different timestamps
    await db.insert(newsletterSubscriptionsTable)
      .values({
        email: 'first@example.com',
        name: 'First User'
      })
      .execute();

    // Small delay to ensure different timestamps
    await new Promise(resolve => setTimeout(resolve, 10));

    await db.insert(newsletterSubscriptionsTable)
      .values({
        email: 'second@example.com',
        name: 'Second User'
      })
      .execute();

    await new Promise(resolve => setTimeout(resolve, 10));

    await db.insert(newsletterSubscriptionsTable)
      .values({
        email: 'third@example.com',
        name: 'Third User'
      })
      .execute();

    const result = await getNewsletterSubscriptions();

    expect(result).toHaveLength(3);
    
    // Verify ordering - most recent first
    expect(result[0].email).toEqual('third@example.com');
    expect(result[1].email).toEqual('second@example.com');
    expect(result[2].email).toEqual('first@example.com');

    // Verify timestamps are in descending order
    expect(result[0].created_at >= result[1].created_at).toBe(true);
    expect(result[1].created_at >= result[2].created_at).toBe(true);
  });

  it('should return both subscribed and unsubscribed records', async () => {
    // Create both subscribed and unsubscribed entries
    await db.insert(newsletterSubscriptionsTable)
      .values([
        {
          email: 'subscribed@example.com',
          name: 'Subscribed User',
          subscribed: true
        },
        {
          email: 'unsubscribed@example.com',
          name: 'Unsubscribed User',
          subscribed: false
        }
      ])
      .execute();

    const result = await getNewsletterSubscriptions();

    expect(result).toHaveLength(2);
    
    const subscribedRecord = result.find(sub => sub.email === 'subscribed@example.com');
    const unsubscribedRecord = result.find(sub => sub.email === 'unsubscribed@example.com');

    expect(subscribedRecord).toBeDefined();
    expect(subscribedRecord!.subscribed).toBe(true);
    
    expect(unsubscribedRecord).toBeDefined();
    expect(unsubscribedRecord!.subscribed).toBe(false);
  });
});