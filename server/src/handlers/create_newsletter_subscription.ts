import { db } from '../db';
import { newsletterSubscriptionsTable } from '../db/schema';
import { type CreateNewsletterSubscriptionInput, type NewsletterSubscription } from '../schema';

export const createNewsletterSubscription = async (input: CreateNewsletterSubscriptionInput): Promise<NewsletterSubscription> => {
  try {
    // Insert newsletter subscription record
    const result = await db.insert(newsletterSubscriptionsTable)
      .values({
        email: input.email,
        name: input.name,
        subscribed: true // Default value for new subscriptions
      })
      .returning()
      .execute();

    // Return the created subscription
    const subscription = result[0];
    return subscription;
  } catch (error) {
    console.error('Newsletter subscription creation failed:', error);
    throw error;
  }
};