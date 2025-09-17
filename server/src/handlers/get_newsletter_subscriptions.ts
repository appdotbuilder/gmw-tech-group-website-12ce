import { db } from '../db';
import { newsletterSubscriptionsTable } from '../db/schema';
import { type NewsletterSubscription } from '../schema';
import { desc } from 'drizzle-orm';

export const getNewsletterSubscriptions = async (): Promise<NewsletterSubscription[]> => {
  try {
    // Fetch all newsletter subscriptions, ordered by most recent first
    const results = await db.select()
      .from(newsletterSubscriptionsTable)
      .orderBy(desc(newsletterSubscriptionsTable.created_at))
      .execute();

    return results;
  } catch (error) {
    console.error('Failed to fetch newsletter subscriptions:', error);
    throw error;
  }
};