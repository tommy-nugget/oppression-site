import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';
import fs from 'node:fs/promises';

function singleEntryLoader(name: string, path: string) {
  return {
    name,
    load: async ({ store, parseData }: any) => {
      const raw = JSON.parse(await fs.readFile(new URL(path, import.meta.url), 'utf-8'));
      const data = await parseData({ id: 'main', data: raw });
      store.clear();
      store.set({ id: 'main', data });
    },
  };
}

const concerts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/concerts' }),
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
  loader: glob({ pattern: '**/*.md', base: './src/content/reviews' }),
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
  loader: glob({ pattern: '**/*.md', base: './src/content/discography' }),
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
  loader: glob({ pattern: '**/*.md', base: './src/content/merch' }),
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
  loader: glob({ pattern: '**/*.md', base: './src/content/members' }),
  schema: z.object({
    name: z.string(),
    instrument: z.string(),
    photo: z.string().optional(),
    livePhoto: z.string().optional(),
    bio: z.string().optional(),
  }),
});

const gallery = defineCollection({
  loader: singleEntryLoader('gallery', './content/gallery/main.json'),
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
  loader: singleEntryLoader('site', './content/site/main.json'),
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
