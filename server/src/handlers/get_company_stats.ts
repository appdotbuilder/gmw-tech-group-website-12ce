import { db } from '../db';
import { companyStatsTable } from '../db/schema';
import { type CompanyStats } from '../schema';
import { eq, asc } from 'drizzle-orm';

export const getCompanyStats = async (activeOnly?: boolean): Promise<CompanyStats[]> => {
  try {
    // Build the query step by step to avoid type issues
    const baseQuery = db.select().from(companyStatsTable);

    // Apply filters and ordering
    const finalQuery = activeOnly 
      ? baseQuery.where(eq(companyStatsTable.active, true)).orderBy(asc(companyStatsTable.display_order))
      : baseQuery.orderBy(asc(companyStatsTable.display_order));

    const results = await finalQuery.execute();

    // Return results - no numeric conversions needed since all fields are already correct types
    return results;
  } catch (error) {
    console.error('Failed to fetch company stats:', error);
    throw error;
  }
};