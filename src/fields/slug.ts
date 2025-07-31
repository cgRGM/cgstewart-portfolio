import type { Field } from 'payload'
import { formatSlug } from '../utilities/format-slug'

export const slugField = (fieldToUse: string = 'title', overrides: Partial<Field> = {}): Field => {
  return {
    name: 'slug',
    label: 'Slug',
    type: 'text',
    index: true,
    admin: {
      position: 'sidebar',
    },
    hooks: {
      beforeValidate: [formatSlug(fieldToUse)],
    },
    ...overrides,
  } as Field
}
