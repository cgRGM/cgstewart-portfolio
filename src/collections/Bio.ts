import type { CollectionConfig } from 'payload'

export const Bio: CollectionConfig = {
  slug: 'bio',
  admin: {
    useAsTitle: 'about',
    description: 'Single bio instance for the author',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'about',
      type: 'textarea',
      required: true,
    },
    {
      name: 'socialMedia',
      type: 'group',
      label: 'Social Media Links',
      fields: [
        {
          name: 'xUrl',
          type: 'text',
          label: 'X.com (Twitter) URL',
          admin: {
            placeholder: 'https://x.com/username',
          },
        },
        {
          name: 'linkedinUrl',
          type: 'text',
          label: 'LinkedIn URL',
          admin: {
            placeholder: 'https://linkedin.com/in/username',
          },
        },
        {
          name: 'githubUrl',
          type: 'text',
          label: 'GitHub URL',
          admin: {
            placeholder: 'https://github.com/username',
          },
        },
        {
          name: 'youtubeUrl',
          type: 'text',
          label: 'YouTube URL',
          admin: {
            placeholder: 'https://youtube.com/@username',
          },
        },
        {
          name: 'twitchUrl',
          type: 'text',
          label: 'Twitch URL',
          admin: {
            placeholder: 'https://twitch.tv/username',
          },
        },
      ],
    },
    {
      name: 'resume',
      type: 'upload',
      relationTo: 'media',
      required: false,
      admin: {
        description: 'Upload your resume (PDF recommended)',
      },
    },
  ],
  hooks: {
    beforeValidate: [
      async ({ req, operation }) => {
        // Ensure only one bio instance exists
        if (operation === 'create') {
          const existingBio = await req.payload.find({
            collection: 'bio',
            limit: 1,
          })

          if (existingBio.totalDocs > 0) {
            throw new Error('Only one Bio instance is allowed')
          }
        }
      },
    ],
  },
}
