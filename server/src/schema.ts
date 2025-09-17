import { z } from 'zod';

// Contact form schema
export const contactFormSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().nullable(),
  company: z.string().nullable(),
  subject: z.string(),
  message: z.string(),
  created_at: z.coerce.date()
});

export type ContactForm = z.infer<typeof contactFormSchema>;

// Input schema for creating contact form submissions
export const createContactFormInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().nullable(),
  company: z.string().nullable(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

export type CreateContactFormInput = z.infer<typeof createContactFormInputSchema>;

// Blog post schema
export const blogPostSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string().nullable(),
  content: z.string(),
  author: z.string(),
  category: z.string(),
  tags: z.string().nullable(), // JSON string of tags array
  featured_image: z.string().nullable(),
  published: z.boolean(),
  published_at: z.coerce.date().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type BlogPost = z.infer<typeof blogPostSchema>;

// Input schema for creating blog posts
export const createBlogPostInputSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().nullable(),
  content: z.string().min(1, "Content is required"),
  author: z.string().min(1, "Author is required"),
  category: z.string().min(1, "Category is required"),
  tags: z.string().nullable(), // JSON string of tags array
  featured_image: z.string().nullable(),
  published: z.boolean().default(false)
});

export type CreateBlogPostInput = z.infer<typeof createBlogPostInputSchema>;

// Input schema for updating blog posts
export const updateBlogPostInputSchema = z.object({
  id: z.number(),
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  excerpt: z.string().nullable().optional(),
  content: z.string().min(1).optional(),
  author: z.string().min(1).optional(),
  category: z.string().min(1).optional(),
  tags: z.string().nullable().optional(),
  featured_image: z.string().nullable().optional(),
  published: z.boolean().optional()
});

export type UpdateBlogPostInput = z.infer<typeof updateBlogPostInputSchema>;

// Service inquiry schema
export const serviceInquirySchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().nullable(),
  company: z.string().nullable(),
  service_type: z.enum(['ai_ml', 'blockchain', 'iot', 'data_analytics', 'risk_planning', 'growth_strategy']),
  budget_range: z.string().nullable(),
  project_timeline: z.string().nullable(),
  description: z.string(),
  created_at: z.coerce.date()
});

export type ServiceInquiry = z.infer<typeof serviceInquirySchema>;

// Input schema for creating service inquiries
export const createServiceInquiryInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().nullable(),
  company: z.string().nullable(),
  service_type: z.enum(['ai_ml', 'blockchain', 'iot', 'data_analytics', 'risk_planning', 'growth_strategy']),
  budget_range: z.string().nullable(),
  project_timeline: z.string().nullable(),
  description: z.string().min(10, "Description must be at least 10 characters")
});

export type CreateServiceInquiryInput = z.infer<typeof createServiceInquiryInputSchema>;

// Newsletter subscription schema
export const newsletterSubscriptionSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string().nullable(),
  subscribed: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type NewsletterSubscription = z.infer<typeof newsletterSubscriptionSchema>;

// Input schema for newsletter subscriptions
export const createNewsletterSubscriptionInputSchema = z.object({
  email: z.string().email("Valid email is required"),
  name: z.string().nullable()
});

export type CreateNewsletterSubscriptionInput = z.infer<typeof createNewsletterSubscriptionInputSchema>;

// Company statistics schema (for homepage metrics)
export const companyStatsSchema = z.object({
  id: z.number(),
  metric_name: z.string(),
  metric_value: z.string(),
  display_order: z.number().int(),
  active: z.boolean(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type CompanyStats = z.infer<typeof companyStatsSchema>;

// Input schema for creating company stats
export const createCompanyStatsInputSchema = z.object({
  metric_name: z.string().min(1, "Metric name is required"),
  metric_value: z.string().min(1, "Metric value is required"),
  display_order: z.number().int().nonnegative(),
  active: z.boolean().default(true)
});

export type CreateCompanyStatsInput = z.infer<typeof createCompanyStatsInputSchema>;