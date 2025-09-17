import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { companyStatsTable } from '../db/schema';
import { type CreateCompanyStatsInput } from '../schema';
import { getCompanyStats } from '../handlers/get_company_stats';

// Test data for company stats
const testStats: CreateCompanyStatsInput[] = [
  {
    metric_name: 'Projects Completed',
    metric_value: '500+',
    display_order: 1,
    active: true
  },
  {
    metric_name: 'Happy Clients',
    metric_value: '200+',
    display_order: 2,
    active: true
  },
  {
    metric_name: 'Years Experience',
    metric_value: '10+',
    display_order: 3,
    active: false
  },
  {
    metric_name: 'Team Members',
    metric_value: '50+',
    display_order: 4,
    active: true
  },
  {
    metric_name: 'Inactive Metric',
    metric_value: '999',
    display_order: 0,
    active: false
  }
];

describe('getCompanyStats', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should return all company stats when no filter is applied', async () => {
    // Insert test data
    await db.insert(companyStatsTable)
      .values(testStats)
      .execute();

    const results = await getCompanyStats();

    expect(results).toHaveLength(5);
    expect(results[0].metric_name).toEqual('Inactive Metric'); // display_order 0
    expect(results[1].metric_name).toEqual('Projects Completed'); // display_order 1
    expect(results[2].metric_name).toEqual('Happy Clients'); // display_order 2
    expect(results[3].metric_name).toEqual('Years Experience'); // display_order 3
    expect(results[4].metric_name).toEqual('Team Members'); // display_order 4
  });

  it('should return only active company stats when activeOnly is true', async () => {
    // Insert test data
    await db.insert(companyStatsTable)
      .values(testStats)
      .execute();

    const results = await getCompanyStats(true);

    expect(results).toHaveLength(3);
    
    // Verify all returned stats are active
    results.forEach(stat => {
      expect(stat.active).toBe(true);
    });

    // Verify correct ordering by display_order
    expect(results[0].metric_name).toEqual('Projects Completed'); // display_order 1
    expect(results[1].metric_name).toEqual('Happy Clients'); // display_order 2
    expect(results[2].metric_name).toEqual('Team Members'); // display_order 4
  });

  it('should return all stats including inactive when activeOnly is false', async () => {
    // Insert test data
    await db.insert(companyStatsTable)
      .values(testStats)
      .execute();

    const results = await getCompanyStats(false);

    expect(results).toHaveLength(5);
    
    // Should include both active and inactive stats
    const activeCount = results.filter(stat => stat.active).length;
    const inactiveCount = results.filter(stat => !stat.active).length;
    
    expect(activeCount).toBe(3);
    expect(inactiveCount).toBe(2);
  });

  it('should return stats ordered by display_order ascending', async () => {
    // Insert test data with mixed display orders
    const mixedOrderStats = [
      {
        metric_name: 'Last Metric',
        metric_value: '100',
        display_order: 10,
        active: true
      },
      {
        metric_name: 'First Metric',
        metric_value: '200',
        display_order: 1,
        active: true
      },
      {
        metric_name: 'Middle Metric',
        metric_value: '300',
        display_order: 5,
        active: true
      }
    ];

    await db.insert(companyStatsTable)
      .values(mixedOrderStats)
      .execute();

    const results = await getCompanyStats();

    expect(results).toHaveLength(3);
    expect(results[0].metric_name).toEqual('First Metric');
    expect(results[0].display_order).toBe(1);
    expect(results[1].metric_name).toEqual('Middle Metric');
    expect(results[1].display_order).toBe(5);
    expect(results[2].metric_name).toEqual('Last Metric');
    expect(results[2].display_order).toBe(10);
  });

  it('should return empty array when no stats exist', async () => {
    const results = await getCompanyStats();
    expect(results).toHaveLength(0);
  });

  it('should return empty array when no active stats exist but activeOnly is true', async () => {
    // Insert only inactive stats
    const inactiveStats = [
      {
        metric_name: 'Inactive Stat 1',
        metric_value: '100',
        display_order: 1,
        active: false
      },
      {
        metric_name: 'Inactive Stat 2',
        metric_value: '200',
        display_order: 2,
        active: false
      }
    ];

    await db.insert(companyStatsTable)
      .values(inactiveStats)
      .execute();

    const results = await getCompanyStats(true);
    expect(results).toHaveLength(0);
  });

  it('should include all required fields in returned stats', async () => {
    await db.insert(companyStatsTable)
      .values([testStats[0]])
      .execute();

    const results = await getCompanyStats();

    expect(results).toHaveLength(1);
    const stat = results[0];

    // Verify all required fields are present
    expect(stat.id).toBeDefined();
    expect(typeof stat.id).toBe('number');
    expect(stat.metric_name).toEqual('Projects Completed');
    expect(stat.metric_value).toEqual('500+');
    expect(stat.display_order).toBe(1);
    expect(stat.active).toBe(true);
    expect(stat.created_at).toBeInstanceOf(Date);
    expect(stat.updated_at).toBeInstanceOf(Date);
  });

  it('should handle mixed active/inactive stats correctly with activeOnly filter', async () => {
    const mixedStats = [
      {
        metric_name: 'Active First',
        metric_value: '100',
        display_order: 1,
        active: true
      },
      {
        metric_name: 'Inactive Second',
        metric_value: '200',
        display_order: 2,
        active: false
      },
      {
        metric_name: 'Active Third',
        metric_value: '300',
        display_order: 3,
        active: true
      },
      {
        metric_name: 'Inactive Fourth',
        metric_value: '400',
        display_order: 4,
        active: false
      }
    ];

    await db.insert(companyStatsTable)
      .values(mixedStats)
      .execute();

    // Test active only
    const activeResults = await getCompanyStats(true);
    expect(activeResults).toHaveLength(2);
    expect(activeResults[0].metric_name).toEqual('Active First');
    expect(activeResults[1].metric_name).toEqual('Active Third');

    // Test all stats
    const allResults = await getCompanyStats(false);
    expect(allResults).toHaveLength(4);
    expect(allResults[0].metric_name).toEqual('Active First');
    expect(allResults[1].metric_name).toEqual('Inactive Second');
    expect(allResults[2].metric_name).toEqual('Active Third');
    expect(allResults[3].metric_name).toEqual('Inactive Fourth');
  });
});