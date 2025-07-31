import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

export const Videos: CollectionConfig = {
  auth: true,
  slug: 'videos',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'isPublished', 'createdAt'],
  },
  access: {
    read: ({ req: { user } }) => {
      // Public can read published videos, authenticated users can read all
      if (user) {
        return true
      }
      return {
        isPublished: {
          equals: true,
        },
      }
    },
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      maxLength: 200,
    },
    {
      name: 'videoUrl',
      type: 'text',
      required: true,
      validate: (val) => {
        if (!val) return 'Video URL is required'
        try {
          const url = new URL(val)
          const validDomains = [
            // YouTube domains
            'youtube.com',
            'youtu.be',
            'm.youtube.com',
            'music.youtube.com',
            'gaming.youtube.com',
            'tv.youtube.com',
            // Vimeo domains
            'vimeo.com',
            'player.vimeo.com',
            // Twitch domains
            'twitch.tv',
            'm.twitch.tv',
            // Other platforms
            'dailymotion.com',
            'wistia.com',
          ]
          
          // Remove www. prefix if present for comparison
          const hostname = url.hostname.replace(/^www\./, '')
          
          const isValidDomain = validDomains.some(
            (domain) => hostname === domain || hostname === domain.replace(/^www\./, ''),
          )
          return isValidDomain || 'Please enter a valid video platform URL (YouTube, Vimeo, Twitch, etc.)'
        } catch {
          return 'Please enter a valid URL'
        }
      },
      admin: {
        description: 'YouTube, Vimeo, or other video platform URL',
        placeholder: 'https://youtube.com/watch?v=...',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  defaultSort: '-createdAt',
}
