import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: z.object({
    name: z.string(),
    category: z.enum(['still-water', 'sparkling-water', 'juice', 'ice-cubes', 'refill', 'food']),
    tagline: z.string(),
    description: z.string(),
    image: z.string().optional(),
    sizes: z.array(z.object({ volume: z.string(), price: z.number(), unit: z.string() })).default([]),
    inStock: z.boolean().default(true),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    description: z.string(),
    icon: z.string().optional(),
    features: z.array(z.string()).default([]),
    order: z.number().default(0),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/team' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    bio: z.string(),
    image: z.string().optional(),
    order: z.number().default(0),
  }),
});

const faqs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/faqs' }),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    category: z.string().default('general'),
    order: z.number().default(0),
  }),
});

const certifications = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/certifications' }),
  schema: z.object({
    name: z.string(),
    issuer: z.string(),
    description: z.string(),
    dateEarned: z.string().optional(),
    status: z.enum(['verified', 'pending']).default('pending'),
    order: z.number().default(0),
  }),
});

const values = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/values' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
    order: z.number().default(0),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Modi Hydroshop'),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { products, services, team, faqs, certifications, values, posts };
