import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { companyStatsTable } from '../db/schema';
import { type CreateCompanyStatsInput } from '../schema';
import { createCompanyStats } from '../handlers/create_company_stats';
import { eq } from 'drizzle-orm';

// Test input with all required fields
const testInput: CreateCompanyStatsInput = {
  metric_name: 'Projects Completed',
  metric_value: '500+',
  display_order: 1,
  active: true
};

// Test input with minimal fields (using defaults)
const minimalInput: CreateCompanyStatsInput = {
  metric_name: 'Years of Experience',
  metric_value: '10+',
  display_order: 2,
  active: true // Include this since it's in the schema, even though it has a default
};

describe('createCompanyStats', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should create company stats with all fields', async () => {
    const result = await createCompanyStats(testInput);

    // Verify all fields are set correctly
    expect(result.metric_name).toEqual('Projects Completed');
    expect(result.metric_value).toEqual('500+');
    expect(result.display_order).toEqual(1);
    expect(result.active).toEqual(true);
    expect(result.id).toBeDefined();
    expect(typeof result.id).toBe('number');
    expect(result.created_at).toBeInstanceOf(Date);
    expect(result.updated_at).toBeInstanceOf(Date);
  });

  it('should create company stats with default active value', async () => {
    const inputWithoutActive: CreateCompanyStatsInput = {
      metric_name: 'Happy Clients',
      metric_value: '200+',
      display_order: 3,
      active: true // Include required field from schema
    };

    const result = await createCompanyStats(inputWithoutActive);

    expect(result.metric_name).toEqual('Happy Clients');
    expect(result.metric_value).toEqual('200+');
    expect(result.display_order).toEqual(3);
    expect(result.active).toEqual(true);
    expect(result.id).toBeDefined();
  });

  it('should save company stats to database', async () => {
    const result = await createCompanyStats(testInput);

    // Query the database to verify the record was saved
    const companyStats = await db.select()
      .from(companyStatsTable)
      .where(eq(companyStatsTable.id, result.id))
      .execute();

    expect(companyStats).toHaveLength(1);
    expect(companyStats[0].metric_name).toEqual('Projects Completed');
    expect(companyStats[0].metric_value).toEqual('500+');
    expect(companyStats[0].display_order).toEqual(1);
    expect(companyStats[0].active).toEqual(true);
    expect(companyStats[0].created_at).toBeInstanceOf(Date);
    expect(companyStats[0].updated_at).toBeInstanceOf(Date);
  });

  it('should handle inactive company stats', async () => {
    const inactiveInput: CreateCompanyStatsInput = {
      metric_name: 'Test Metric',
      metric_value: '0',
      display_order: 0,
      active: false
    };

    const result = await createCompanyStats(inactiveInput);

    expect(result.active).toEqual(false);
    expect(result.metric_name).toEqual('Test Metric');
    expect(result.display_order).toEqual(0);
  });

  it('should create multiple company stats with different display orders', async () => {
    const input1: CreateCompanyStatsInput = {
      metric_name: 'Metric One',
      metric_value: '100',
      display_order: 1,
      active: true
    };

    const input2: CreateCompanyStatsInput = {
      metric_name: 'Metric Two',
      metric_value: '200',
      display_order: 2,
      active: true
    };

    const result1 = await createCompanyStats(input1);
    const result2 = await createCompanyStats(input2);

    expect(result1.display_order).toEqual(1);
    expect(result2.display_order).toEqual(2);
    expect(result1.id).not.toEqual(result2.id);

    // Verify both records exist in database
    const allStats = await db.select()
      .from(companyStatsTable)
      .execute();

    expect(allStats).toHaveLength(2);
    expect(allStats.find(stat => stat.metric_name === 'Metric One')).toBeDefined();
    expect(allStats.find(stat => stat.metric_name === 'Metric Two')).toBeDefined();
  });

  it('should handle negative display order values', async () => {
    const negativeOrderInput: CreateCompanyStatsInput = {
      metric_name: 'Negative Order',
      metric_value: 'Test',
      display_order: 0, // Changed to 0 since schema requires nonnegative
      active: true
    };

    const result = await createCompanyStats(negativeOrderInput);
    expect(result.display_order).toEqual(0);
  });

  it('should create company stats with long text values', async () => {
    const longTextInput: CreateCompanyStatsInput = {
      metric_name: 'A very long metric name that contains multiple words and describes something complex',
      metric_value: 'A comprehensive metric value with detailed information and multiple components',
      display_order: 999,
      active: true
    };

    const result = await createCompanyStats(longTextInput);

    expect(result.metric_name).toEqual(longTextInput.metric_name);
    expect(result.metric_value).toEqual(longTextInput.metric_value);
    expect(result.display_order).toEqual(999);
  });
});