import { db } from '../db';
import { serviceInquiriesTable } from '../db/schema';
import { type CreateServiceInquiryInput, type ServiceInquiry } from '../schema';

export const createServiceInquiry = async (input: CreateServiceInquiryInput): Promise<ServiceInquiry> => {
  try {
    // Insert service inquiry record
    const result = await db.insert(serviceInquiriesTable)
      .values({
        name: input.name,
        email: input.email,
        phone: input.phone,
        company: input.company,
        service_type: input.service_type,
        budget_range: input.budget_range,
        project_timeline: input.project_timeline,
        description: input.description
      })
      .returning()
      .execute();

    return result[0];
  } catch (error) {
    console.error('Service inquiry creation failed:', error);
    throw error;
  }
};