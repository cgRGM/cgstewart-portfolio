import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'stack', 'isPublished', 'createdAt'],
  },
  access: {
    read: ({ req: { user } }) => {
      // Public can read published projects, authenticated users can read all
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
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'stack',
      type: 'text',
      required: true,
      maxLength: 300,
      admin: {
        description: 'Technologies used (comma-separated)',
        placeholder: 'React, TypeScript, Node.js, PostgreSQL',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'content',
      type: 'richText',
      required: false,
      admin: {
        description: 'Detailed project content',
      },
    },
    {
      name: 'links',
      type: 'group',
      label: 'Project Links',
      fields: [
        {
          name: 'websiteUrl',
          type: 'text',
          label: 'Website URL',
          admin: {
            placeholder: 'https://example.com',
          },
        },
        {
          name: 'githubUrl',
          type: 'text',
          label: 'GitHub URL',
          admin: {
            placeholder: 'https://github.com/username/repo',
          },
        },
      ],
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
