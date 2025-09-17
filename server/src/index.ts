import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';
import { z } from 'zod';

// Import schemas
import {
  createContactFormInputSchema,
  createBlogPostInputSchema,
  updateBlogPostInputSchema,
  createServiceInquiryInputSchema,
  createNewsletterSubscriptionInputSchema,
  createCompanyStatsInputSchema
} from './schema';

// Import handlers
import { createContactForm } from './handlers/create_contact_form';
import { getContactForms } from './handlers/get_contact_forms';
import { createBlogPost } from './handlers/create_blog_post';
import { getBlogPosts } from './handlers/get_blog_posts';
import { getBlogPostBySlug } from './handlers/get_blog_post_by_slug';
import { updateBlogPost } from './handlers/update_blog_post';
import { createServiceInquiry } from './handlers/create_service_inquiry';
import { getServiceInquiries } from './handlers/get_service_inquiries';
import { createNewsletterSubscription } from './handlers/create_newsletter_subscription';
import { getNewsletterSubscriptions } from './handlers/get_newsletter_subscriptions';
import { createCompanyStats } from './handlers/create_company_stats';
import { getCompanyStats } from './handlers/get_company_stats';
import { seedSampleData } from './handlers/seed_sample_data';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  // Health check
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),

  // Contact form routes
  createContactForm: publicProcedure
    .input(createContactFormInputSchema)
    .mutation(({ input }) => createContactForm(input)),

  getContactForms: publicProcedure
    .query(() => getContactForms()),

  // Blog post routes
  createBlogPost: publicProcedure
    .input(createBlogPostInputSchema)
    .mutation(({ input }) => createBlogPost(input)),

  getBlogPosts: publicProcedure
    .input(z.object({ published: z.boolean().optional() }))
    .query(({ input }) => getBlogPosts(input.published)),

  getBlogPostBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ input }) => getBlogPostBySlug(input.slug)),

  updateBlogPost: publicProcedure
    .input(updateBlogPostInputSchema)
    .mutation(({ input }) => updateBlogPost(input)),

  // Service inquiry routes
  createServiceInquiry: publicProcedure
    .input(createServiceInquiryInputSchema)
    .mutation(({ input }) => createServiceInquiry(input)),

  getServiceInquiries: publicProcedure
    .query(() => getServiceInquiries()),

  // Newsletter subscription routes
  createNewsletterSubscription: publicProcedure
    .input(createNewsletterSubscriptionInputSchema)
    .mutation(({ input }) => createNewsletterSubscription(input)),

  getNewsletterSubscriptions: publicProcedure
    .query(() => getNewsletterSubscriptions()),

  // Company stats routes
  createCompanyStats: publicProcedure
    .input(createCompanyStatsInputSchema)
    .mutation(({ input }) => createCompanyStats(input)),

  getCompanyStats: publicProcedure
    .input(z.object({ activeOnly: z.boolean().optional() }))
    .query(({ input }) => getCompanyStats(input.activeOnly)),

  // Utility routes
  seedSampleData: publicProcedure
    .mutation(() => seedSampleData()),
});

export type AppRouter = typeof appRouter;

async function start() {
  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors()(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  server.listen(port);
  console.log(`GMW Tech Group TRPC server listening at port: ${port}`);
}

start();