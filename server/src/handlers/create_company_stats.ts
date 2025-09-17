import { db } from '../db';
import { companyStatsTable } from '../db/schema';
import { type CreateCompanyStatsInput, type CompanyStats } from '../schema';

export const createCompanyStats = async (input: CreateCompanyStatsInput): Promise<CompanyStats> => {
  try {
    // Insert company stats record
    const result = await db.insert(companyStatsTable)
      .values({
        metric_name: input.metric_name,
        metric_value: input.metric_value,
        display_order: input.display_order,
        active: input.active // This will use the default value if not provided
      })
      .returning()
      .execute();

    // Return the created company stats record
    const companyStats = result[0];
    return companyStats;
  } catch (error) {
    console.error('Company stats creation failed:', error);
    throw error;
  }
};