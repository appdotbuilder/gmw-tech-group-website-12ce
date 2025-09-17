import { db } from '../db';
import { serviceInquiriesTable } from '../db/schema';
import { type ServiceInquiry } from '../schema';
import { desc } from 'drizzle-orm';

export const getServiceInquiries = async (): Promise<ServiceInquiry[]> => {
  try {
    // Fetch all service inquiries ordered by most recent first
    const results = await db.select()
      .from(serviceInquiriesTable)
      .orderBy(desc(serviceInquiriesTable.created_at))
      .execute();

    // Return the results (no numeric conversions needed for this table)
    return results;
  } catch (error) {
    console.error('Failed to fetch service inquiries:', error);
    throw error;
  }
};