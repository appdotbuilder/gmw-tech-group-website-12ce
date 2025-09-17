import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { contactFormsTable } from '../db/schema';
import { getContactForms } from '../handlers/get_contact_forms';

describe('getContactForms', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should return empty array when no contact forms exist', async () => {
    const result = await getContactForms();
    
    expect(result).toEqual([]);
    expect(Array.isArray(result)).toBe(true);
  });

  it('should return all contact forms', async () => {
    // Create test contact forms
    const testForms = [
      {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1-555-0123',
        company: 'Acme Corp',
        subject: 'Business Inquiry',
        message: 'I would like to discuss a potential partnership opportunity.'
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: null,
        company: null,
        subject: 'Technical Support',
        message: 'I need help with implementing your AI solution in our system.'
      }
    ];

    await db.insert(contactFormsTable)
      .values(testForms)
      .execute();

    const result = await getContactForms();

    expect(result).toHaveLength(2);
    
    // Verify all fields are present and correctly typed
    result.forEach(form => {
      expect(form.id).toBeDefined();
      expect(typeof form.id).toBe('number');
      expect(typeof form.name).toBe('string');
      expect(typeof form.email).toBe('string');
      expect(typeof form.subject).toBe('string');
      expect(typeof form.message).toBe('string');
      expect(form.created_at).toBeInstanceOf(Date);
      
      // Nullable fields should be either string or null
      if (form.phone !== null) {
        expect(typeof form.phone).toBe('string');
      }
      if (form.company !== null) {
        expect(typeof form.company).toBe('string');
      }
    });
  });

  it('should return contact forms ordered by most recent first', async () => {
    // Create test forms with specific timing
    const firstForm = {
      name: 'First User',
      email: 'first@example.com',
      phone: null,
      company: null,
      subject: 'First Subject',
      message: 'This is the first form submission.'
    };

    const secondForm = {
      name: 'Second User',
      email: 'second@example.com',
      phone: '+1-555-9999',
      company: 'Second Company',
      subject: 'Second Subject',
      message: 'This is the second form submission.'
    };

    // Insert first form
    await db.insert(contactFormsTable)
      .values([firstForm])
      .execute();

    // Small delay to ensure different timestamps
    await new Promise(resolve => setTimeout(resolve, 10));

    // Insert second form
    await db.insert(contactFormsTable)
      .values([secondForm])
      .execute();

    const result = await getContactForms();

    expect(result).toHaveLength(2);
    
    // Most recent should be first (Second User)
    expect(result[0].name).toEqual('Second User');
    expect(result[0].email).toEqual('second@example.com');
    expect(result[0].company).toEqual('Second Company');
    
    // Older should be second (First User)
    expect(result[1].name).toEqual('First User');
    expect(result[1].email).toEqual('first@example.com');
    expect(result[1].company).toBeNull();
    
    // Verify ordering by timestamp
    expect(result[0].created_at > result[1].created_at).toBe(true);
  });

  it('should handle contact forms with all nullable fields as null', async () => {
    const minimalForm = {
      name: 'Minimal User',
      email: 'minimal@example.com',
      phone: null,
      company: null,
      subject: 'Minimal Subject',
      message: 'This form has minimal required fields only.'
    };

    await db.insert(contactFormsTable)
      .values([minimalForm])
      .execute();

    const result = await getContactForms();

    expect(result).toHaveLength(1);
    expect(result[0].name).toEqual('Minimal User');
    expect(result[0].email).toEqual('minimal@example.com');
    expect(result[0].phone).toBeNull();
    expect(result[0].company).toBeNull();
    expect(result[0].subject).toEqual('Minimal Subject');
    expect(result[0].message).toEqual('This form has minimal required fields only.');
    expect(result[0].created_at).toBeInstanceOf(Date);
  });

  it('should handle large number of contact forms', async () => {
    // Create multiple forms to test performance and ordering
    const forms = Array.from({ length: 10 }, (_, i) => ({
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      phone: i % 3 === 0 ? `+1-555-${String(i).padStart(4, '0')}` : null,
      company: i % 2 === 0 ? `Company ${i + 1}` : null,
      subject: `Subject ${i + 1}`,
      message: `This is message number ${i + 1} for testing purposes.`
    }));

    await db.insert(contactFormsTable)
      .values(forms)
      .execute();

    const result = await getContactForms();

    expect(result).toHaveLength(10);
    
    // Verify they are ordered by most recent first
    for (let i = 0; i < result.length - 1; i++) {
      expect(result[i].created_at >= result[i + 1].created_at).toBe(true);
    }
    
    // Verify all data is correctly returned
    expect(result.map(f => f.name)).toContain('User 1');
    expect(result.map(f => f.name)).toContain('User 10');
    expect(result.map(f => f.email)).toContain('user1@example.com');
    expect(result.map(f => f.email)).toContain('user10@example.com');
  });
});