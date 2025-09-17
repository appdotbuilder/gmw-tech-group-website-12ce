import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { serviceInquiriesTable } from '../db/schema';
import { type CreateServiceInquiryInput } from '../schema';
import { createServiceInquiry } from '../handlers/create_service_inquiry';
import { eq } from 'drizzle-orm';

// Test input with all required fields
const testInput: CreateServiceInquiryInput = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1-555-0123',
  company: 'Tech Corp',
  service_type: 'ai_ml',
  budget_range: '$10k-$50k',
  project_timeline: '3-6 months',
  description: 'We need AI/ML consulting services for our customer analytics platform'
};

// Test input with minimal required fields
const minimalInput: CreateServiceInquiryInput = {
  name: 'Jane Smith',
  email: 'jane.smith@example.com',
  phone: null,
  company: null,
  service_type: 'blockchain',
  budget_range: null,
  project_timeline: null,
  description: 'Interested in blockchain integration for supply chain tracking'
};

describe('createServiceInquiry', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should create a service inquiry with all fields', async () => {
    const result = await createServiceInquiry(testInput);

    // Basic field validation
    expect(result.name).toEqual('John Doe');
    expect(result.email).toEqual('john.doe@example.com');
    expect(result.phone).toEqual('+1-555-0123');
    expect(result.company).toEqual('Tech Corp');
    expect(result.service_type).toEqual('ai_ml');
    expect(result.budget_range).toEqual('$10k-$50k');
    expect(result.project_timeline).toEqual('3-6 months');
    expect(result.description).toEqual(testInput.description);
    expect(result.id).toBeDefined();
    expect(result.created_at).toBeInstanceOf(Date);
  });

  it('should create a service inquiry with minimal fields', async () => {
    const result = await createServiceInquiry(minimalInput);

    // Required fields
    expect(result.name).toEqual('Jane Smith');
    expect(result.email).toEqual('jane.smith@example.com');
    expect(result.service_type).toEqual('blockchain');
    expect(result.description).toEqual(minimalInput.description);
    expect(result.id).toBeDefined();
    expect(result.created_at).toBeInstanceOf(Date);

    // Optional/nullable fields
    expect(result.phone).toBeNull();
    expect(result.company).toBeNull();
    expect(result.budget_range).toBeNull();
    expect(result.project_timeline).toBeNull();
  });

  it('should save service inquiry to database', async () => {
    const result = await createServiceInquiry(testInput);

    // Query using proper drizzle syntax
    const inquiries = await db.select()
      .from(serviceInquiriesTable)
      .where(eq(serviceInquiriesTable.id, result.id))
      .execute();

    expect(inquiries).toHaveLength(1);
    expect(inquiries[0].name).toEqual('John Doe');
    expect(inquiries[0].email).toEqual('john.doe@example.com');
    expect(inquiries[0].service_type).toEqual('ai_ml');
    expect(inquiries[0].description).toEqual(testInput.description);
    expect(inquiries[0].created_at).toBeInstanceOf(Date);
  });

  it('should handle different service types', async () => {
    const serviceTypes = ['ai_ml', 'blockchain', 'iot', 'data_analytics', 'risk_planning', 'growth_strategy'] as const;
    
    const results = [];
    
    for (const serviceType of serviceTypes) {
      const input: CreateServiceInquiryInput = {
        ...minimalInput,
        name: `Test User ${serviceType}`,
        email: `test.${serviceType}@example.com`,
        service_type: serviceType,
        description: `Inquiry for ${serviceType} services`
      };
      
      const result = await createServiceInquiry(input);
      results.push(result);
      
      expect(result.service_type).toEqual(serviceType);
      expect(result.name).toEqual(`Test User ${serviceType}`);
      expect(result.email).toEqual(`test.${serviceType}@example.com`);
    }

    // Verify all inquiries were saved
    const allInquiries = await db.select()
      .from(serviceInquiriesTable)
      .execute();

    expect(allInquiries).toHaveLength(serviceTypes.length);
    
    // Check that each service type was saved correctly
    serviceTypes.forEach(serviceType => {
      const inquiry = allInquiries.find(i => i.service_type === serviceType);
      expect(inquiry).toBeDefined();
      expect(inquiry!.name).toEqual(`Test User ${serviceType}`);
    });
  });

  it('should preserve exact input data', async () => {
    const specialCharsInput: CreateServiceInquiryInput = {
      name: 'María José O\'Connor-Smith',
      email: 'maria.jose@company-name.co.uk',
      phone: '+44 (0) 20 1234 5678',
      company: 'O\'Connor & Associates Ltd.',
      service_type: 'data_analytics',
      budget_range: '£50,000 - £100,000',
      project_timeline: 'Q1 2024 (Jan-Mar)',
      description: 'We need data analytics consulting for our e-commerce platform. The project involves analyzing customer behavior patterns and implementing ML-based recommendation systems.'
    };

    const result = await createServiceInquiry(specialCharsInput);

    // Verify special characters and formatting are preserved
    expect(result.name).toEqual('María José O\'Connor-Smith');
    expect(result.email).toEqual('maria.jose@company-name.co.uk');
    expect(result.phone).toEqual('+44 (0) 20 1234 5678');
    expect(result.company).toEqual('O\'Connor & Associates Ltd.');
    expect(result.budget_range).toEqual('£50,000 - £100,000');
    expect(result.project_timeline).toEqual('Q1 2024 (Jan-Mar)');
    expect(result.description).toEqual(specialCharsInput.description);
  });
});