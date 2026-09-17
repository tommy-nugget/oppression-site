import { defineCollection, reference, z } from 'astro:content';

const concerts = defineCollection({
  type: 'content',
  schema: z.object({
    date: z.date(),
    city: z.string(),
    country: z.string(),
    venue: z.string(),
    eventName: z.string(),
    poster: z.string().optional(),
    ticketLink: z.string().url().optional(),
    lineup: z.string().optional(),
  }),
});

const reviews = defineCollection({
  type: 'content',
  schema: z.object({
    outlet: z.string(),
    language: z.string(),
    excerpt: z.string(),
    translationEn: z.string().optional(),
    link: z.string().url(),
    logo: z.string().optional(),
    logoLightBg: z.boolean().default(false),
  }),
});

const discography = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    releaseType: z.enum(['album', 'ep', 'single', 'split']),
    releaseDate: z.date(),
    cover: z.string().optional(),
    label: z.string().optional(),
    description: z.string().optional(),
    spotifyAlbumId: z.string().optional(),
    tracklist: z.array(z.object({ title: z.string(), duration: z.string(), spotifyId: z.string().optional() })).default([]),
    links: z.array(z.object({ name: z.string(), url: z.string().url() })).default([]),
    videos: z.array(z.object({ title: z.string(), url: z.string().url() })).default([]),
    featured: z.boolean().default(false),
  }),
});

const merch = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    category: z.enum(['music', 'apparel', 'patch', 'pin', 'other']),
    photo: z.string().optional(),
    description: z.string().optional(),
    price: z.string().optional(),
    shopLink: z.string().url(),
  }),
});

const members = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    instrument: z.string(),
    photo: z.string().optional(),
    livePhoto: z.string().optional(),
    bio: z.string().optional(),
  }),
});

const gallery = defineCollection({
  type: 'data',
  schema: z.object({
    photos: z.array(z.object({
      image: z.string(),
      category: z.enum(['live', 'backstage', 'atmosphere', 'promo', 'personal']),
      relatedConcert: reference('concerts').optional(),
      caption: z.string().optional(),
      credit: z.string().optional(),
      featured: z.boolean().default(false),
    })),
  }),
});

const site = defineCollection({
  type: 'data',
  schema: z.object({
    bioText: z.string(),
    bioPhoto: z.string().optional(),
    statement: z.string().optional(),
    bandEmail: z.string().email(),
    labelEmail: z.string().email().optional(),
    socialLinks: z.array(z.object({ name: z.string(), url: z.string().url() })).default([]),
    spotifyEmbedUrl: z.string().url().optional(),
  }),
});

export const collections = { concerts, reviews, discography, merch, members, gallery, site };
