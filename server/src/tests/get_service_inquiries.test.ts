import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { serviceInquiriesTable } from '../db/schema';
import { getServiceInquiries } from '../handlers/get_service_inquiries';

const testInquiry1 = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1-555-0123',
  company: 'Tech Corp',
  service_type: 'ai_ml' as const,
  budget_range: '$50,000 - $100,000',
  project_timeline: '3-6 months',
  description: 'We need AI/ML solutions for our customer analytics platform'
};

const testInquiry2 = {
  name: 'Jane Smith',
  email: 'jane.smith@startup.com',
  phone: null,
  company: 'Blockchain Startup',
  service_type: 'blockchain' as const,
  budget_range: '$25,000 - $50,000',
  project_timeline: '2-4 months',
  description: 'Looking for blockchain consulting for our tokenization project'
};

const testInquiry3 = {
  name: 'Bob Wilson',
  email: 'bob@iot-solutions.com',
  phone: '+1-555-0789',
  company: null,
  service_type: 'iot' as const,
  budget_range: null,
  project_timeline: null,
  description: 'IoT implementation for smart building management system'
};

describe('getServiceInquiries', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should return empty array when no service inquiries exist', async () => {
    const result = await getServiceInquiries();

    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
  });

  it('should return all service inquiries ordered by most recent first', async () => {
    // Create test inquiries in sequence
    const inquiry1 = await db.insert(serviceInquiriesTable)
      .values(testInquiry1)
      .returning()
      .execute();

    // Small delay to ensure different timestamps
    await new Promise(resolve => setTimeout(resolve, 10));

    const inquiry2 = await db.insert(serviceInquiriesTable)
      .values(testInquiry2)
      .returning()
      .execute();

    await new Promise(resolve => setTimeout(resolve, 10));

    const inquiry3 = await db.insert(serviceInquiriesTable)
      .values(testInquiry3)
      .returning()
      .execute();

    const result = await getServiceInquiries();

    expect(result).toHaveLength(3);
    
    // Verify most recent first ordering
    expect(result[0].id).toEqual(inquiry3[0].id);
    expect(result[1].id).toEqual(inquiry2[0].id);
    expect(result[2].id).toEqual(inquiry1[0].id);
  });

  it('should return service inquiries with all fields correctly populated', async () => {
    await db.insert(serviceInquiriesTable)
      .values(testInquiry1)
      .returning()
      .execute();

    const result = await getServiceInquiries();

    expect(result).toHaveLength(1);
    
    const inquiry = result[0];
    expect(inquiry.name).toEqual('John Doe');
    expect(inquiry.email).toEqual('john.doe@example.com');
    expect(inquiry.phone).toEqual('+1-555-0123');
    expect(inquiry.company).toEqual('Tech Corp');
    expect(inquiry.service_type).toEqual('ai_ml');
    expect(inquiry.budget_range).toEqual('$50,000 - $100,000');
    expect(inquiry.project_timeline).toEqual('3-6 months');
    expect(inquiry.description).toEqual('We need AI/ML solutions for our customer analytics platform');
    expect(inquiry.id).toBeDefined();
    expect(inquiry.created_at).toBeInstanceOf(Date);
  });

  it('should handle service inquiries with nullable fields correctly', async () => {
    await db.insert(serviceInquiriesTable)
      .values(testInquiry3)
      .returning()
      .execute();

    const result = await getServiceInquiries();

    expect(result).toHaveLength(1);
    
    const inquiry = result[0];
    expect(inquiry.name).toEqual('Bob Wilson');
    expect(inquiry.email).toEqual('bob@iot-solutions.com');
    expect(inquiry.phone).toEqual('+1-555-0789');
    expect(inquiry.company).toBeNull();
    expect(inquiry.service_type).toEqual('iot');
    expect(inquiry.budget_range).toBeNull();
    expect(inquiry.project_timeline).toBeNull();
    expect(inquiry.description).toEqual('IoT implementation for smart building management system');
  });

  it('should handle different service types correctly', async () => {
    const serviceTypes = ['ai_ml', 'blockchain', 'iot', 'data_analytics', 'risk_planning', 'growth_strategy'] as const;
    
    // Create inquiries for different service types
    for (const serviceType of serviceTypes) {
      await db.insert(serviceInquiriesTable)
        .values({
          name: `Test User ${serviceType}`,
          email: `test.${serviceType}@example.com`,
          phone: null,
          company: null,
          service_type: serviceType,
          budget_range: null,
          project_timeline: null,
          description: `Description for ${serviceType} service inquiry`
        })
        .execute();
    }

    const result = await getServiceInquiries();

    expect(result).toHaveLength(6);
    
    // Verify all service types are represented
    const returnedServiceTypes = result.map(inquiry => inquiry.service_type);
    expect(returnedServiceTypes).toContain('ai_ml');
    expect(returnedServiceTypes).toContain('blockchain');
    expect(returnedServiceTypes).toContain('iot');
    expect(returnedServiceTypes).toContain('data_analytics');
    expect(returnedServiceTypes).toContain('risk_planning');
    expect(returnedServiceTypes).toContain('growth_strategy');
  });

  it('should maintain consistent date ordering across multiple inquiries', async () => {
    // Create multiple inquiries
    const inquiries = [];
    for (let i = 0; i < 5; i++) {
      const inquiry = await db.insert(serviceInquiriesTable)
        .values({
          name: `User ${i}`,
          email: `user${i}@example.com`,
          phone: null,
          company: null,
          service_type: 'ai_ml',
          budget_range: null,
          project_timeline: null,
          description: `Test inquiry ${i}`
        })
        .returning()
        .execute();
      
      inquiries.push(inquiry[0]);
      
      // Small delay to ensure different timestamps
      await new Promise(resolve => setTimeout(resolve, 5));
    }

    const result = await getServiceInquiries();

    expect(result).toHaveLength(5);
    
    // Verify ordering - should be newest first
    for (let i = 0; i < result.length - 1; i++) {
      expect(result[i].created_at >= result[i + 1].created_at).toBe(true);
    }
  });
});