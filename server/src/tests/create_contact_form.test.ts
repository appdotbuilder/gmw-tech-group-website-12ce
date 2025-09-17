import { afterEach, beforeEach, describe, expect, it } from 'bun:test';
import { resetDB, createDB } from '../helpers';
import { db } from '../db';
import { contactFormsTable } from '../db/schema';
import { type CreateContactFormInput } from '../schema';
import { createContactForm } from '../handlers/create_contact_form';
import { eq } from 'drizzle-orm';

// Complete test input with all required fields
const testInput: CreateContactFormInput = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1-555-123-4567',
  company: 'Acme Corp',
  subject: 'Inquiry about services',
  message: 'I am interested in learning more about your AI/ML services and would like to schedule a consultation.'
};

// Minimal test input (only required fields)
const minimalInput: CreateContactFormInput = {
  name: 'Jane Smith',
  email: 'jane.smith@example.com',
  phone: null,
  company: null,
  subject: 'General inquiry',
  message: 'This is a test message that meets the minimum length requirement.'
};

describe('createContactForm', () => {
  beforeEach(createDB);
  afterEach(resetDB);

  it('should create a contact form submission with all fields', async () => {
    const result = await createContactForm(testInput);

    // Basic field validation
    expect(result.name).toEqual('John Doe');
    expect(result.email).toEqual('john.doe@example.com');
    expect(result.phone).toEqual('+1-555-123-4567');
    expect(result.company).toEqual('Acme Corp');
    expect(result.subject).toEqual('Inquiry about services');
    expect(result.message).toEqual(testInput.message);
    expect(result.id).toBeDefined();
    expect(typeof result.id).toBe('number');
    expect(result.created_at).toBeInstanceOf(Date);
  });

  it('should create a contact form submission with minimal fields', async () => {
    const result = await createContactForm(minimalInput);

    // Basic field validation
    expect(result.name).toEqual('Jane Smith');
    expect(result.email).toEqual('jane.smith@example.com');
    expect(result.phone).toBeNull();
    expect(result.company).toBeNull();
    expect(result.subject).toEqual('General inquiry');
    expect(result.message).toEqual(minimalInput.message);
    expect(result.id).toBeDefined();
    expect(typeof result.id).toBe('number');
    expect(result.created_at).toBeInstanceOf(Date);
  });

  it('should save contact form submission to database', async () => {
    const result = await createContactForm(testInput);

    // Query using proper drizzle syntax
    const submissions = await db.select()
      .from(contactFormsTable)
      .where(eq(contactFormsTable.id, result.id))
      .execute();

    expect(submissions).toHaveLength(1);
    const submission = submissions[0];
    expect(submission.name).toEqual('John Doe');
    expect(submission.email).toEqual('john.doe@example.com');
    expect(submission.phone).toEqual('+1-555-123-4567');
    expect(submission.company).toEqual('Acme Corp');
    expect(submission.subject).toEqual('Inquiry about services');
    expect(submission.message).toEqual(testInput.message);
    expect(submission.created_at).toBeInstanceOf(Date);
  });

  it('should handle multiple contact form submissions', async () => {
    // Create multiple submissions
    const result1 = await createContactForm(testInput);
    const result2 = await createContactForm(minimalInput);

    // Verify both are created with different IDs
    expect(result1.id).toBeDefined();
    expect(result2.id).toBeDefined();
    expect(result1.id).not.toEqual(result2.id);

    // Verify both exist in database
    const allSubmissions = await db.select()
      .from(contactFormsTable)
      .execute();

    expect(allSubmissions).toHaveLength(2);
    
    // Find submissions by name
    const johnSubmission = allSubmissions.find(s => s.name === 'John Doe');
    const janeSubmission = allSubmissions.find(s => s.name === 'Jane Smith');
    
    expect(johnSubmission).toBeDefined();
    expect(janeSubmission).toBeDefined();
    expect(johnSubmission!.company).toEqual('Acme Corp');
    expect(janeSubmission!.company).toBeNull();
  });

  it('should preserve exact timestamps', async () => {
    const beforeSubmission = new Date();
    const result = await createContactForm(testInput);
    const afterSubmission = new Date();

    // Verify timestamp is within reasonable range
    expect(result.created_at.getTime()).toBeGreaterThanOrEqual(beforeSubmission.getTime());
    expect(result.created_at.getTime()).toBeLessThanOrEqual(afterSubmission.getTime());
  });

  it('should handle special characters in input fields', async () => {
    const specialInput: CreateContactFormInput = {
      name: 'José María O\'Connor',
      email: 'jose.maria@münchen-tech.de',
      phone: '+49 (0) 123 456-789',
      company: 'München Tech GmbH & Co. KG',
      subject: 'Anfrage bezüglich KI/ML-Dienste',
      message: 'Hallo! Wir sind interessiert an Ihren AI/ML-Services. Können Sie uns ein Angebot für unsere "spezielle" Anforderungen senden?'
    };

    const result = await createContactForm(specialInput);

    expect(result.name).toEqual('José María O\'Connor');
    expect(result.email).toEqual('jose.maria@münchen-tech.de');
    expect(result.company).toEqual('München Tech GmbH & Co. KG');
    expect(result.subject).toEqual('Anfrage bezüglich KI/ML-Dienste');
    expect(result.message).toContain('"spezielle"');
  });
});