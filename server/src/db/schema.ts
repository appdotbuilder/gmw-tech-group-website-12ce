import { serial, text, pgTable, timestamp, boolean, integer, pgEnum } from 'drizzle-orm/pg-core';

// Enum for service types
export const serviceTypeEnum = pgEnum('service_type', [
  'ai_ml',
  'blockchain', 
  'iot',
  'data_analytics',
  'risk_planning',
  'growth_strategy'
]);

// Contact form submissions table
export const contactFormsTable = pgTable('contact_forms', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'), // Nullable by default
  company: text('company'), // Nullable by default
  subject: text('subject').notNull(),
  message: text('message').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

// Blog posts table
export const blogPostsTable = pgTable('blog_posts', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull(),
  excerpt: text('excerpt'), // Nullable by default
  content: text('content').notNull(),
  author: text('author').notNull(),
  category: text('category').notNull(),
  tags: text('tags'), // JSON string of tags array, nullable
  featured_image: text('featured_image'), // Nullable by default
  published: boolean('published').default(false).notNull(),
  published_at: timestamp('published_at'), // Nullable by default
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Service inquiries table
export const serviceInquiriesTable = pgTable('service_inquiries', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'), // Nullable by default
  company: text('company'), // Nullable by default
  service_type: serviceTypeEnum('service_type').notNull(),
  budget_range: text('budget_range'), // Nullable by default
  project_timeline: text('project_timeline'), // Nullable by default
  description: text('description').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

// Newsletter subscriptions table
export const newsletterSubscriptionsTable = pgTable('newsletter_subscriptions', {
  id: serial('id').primaryKey(),
  email: text('email').notNull(),
  name: text('name'), // Nullable by default
  subscribed: boolean('subscribed').default(true).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Company statistics table (for homepage metrics)
export const companyStatsTable = pgTable('company_stats', {
  id: serial('id').primaryKey(),
  metric_name: text('metric_name').notNull(),
  metric_value: text('metric_value').notNull(),
  display_order: integer('display_order').notNull(),
  active: boolean('active').default(true).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// TypeScript types for the table schemas
export type ContactForm = typeof contactFormsTable.$inferSelect;
export type NewContactForm = typeof contactFormsTable.$inferInsert;

export type BlogPost = typeof blogPostsTable.$inferSelect;
export type NewBlogPost = typeof blogPostsTable.$inferInsert;

export type ServiceInquiry = typeof serviceInquiriesTable.$inferSelect;
export type NewServiceInquiry = typeof serviceInquiriesTable.$inferInsert;

export type NewsletterSubscription = typeof newsletterSubscriptionsTable.$inferSelect;
export type NewNewsletterSubscription = typeof newsletterSubscriptionsTable.$inferInsert;

export type CompanyStats = typeof companyStatsTable.$inferSelect;
export type NewCompanyStats = typeof companyStatsTable.$inferInsert;

// Export all tables for proper query building
export const tables = {
  contactForms: contactFormsTable,
  blogPosts: blogPostsTable,
  serviceInquiries: serviceInquiriesTable,
  newsletterSubscriptions: newsletterSubscriptionsTable,
  companyStats: companyStatsTable,
};