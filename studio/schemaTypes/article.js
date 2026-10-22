import { defineArrayMember, defineField, defineType } from 'sanity';

export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', group: 'content', validation: (rule) => rule.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4,
      group: 'content',
      validation: (rule) => rule.required().max(240),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alternative text', type: 'string', validation: (rule) => rule.required() }),
        defineField({ name: 'caption', title: 'Caption', type: 'string' }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'topics',
      title: 'Topics',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'topic' }] })],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({ name: 'featured', title: 'Featured article', type: 'boolean', initialValue: false, group: 'content' }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      group: 'content',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            annotations: [
              {
                name: 'link',
                title: 'Link',
                type: 'object',
                fields: [
                  defineField({ name: 'href', title: 'URL', type: 'url', validation: (rule) => rule.uri({ scheme: ['http', 'https', 'mailto'] }) }),
                  defineField({ name: 'blank', title: 'Open in new tab', type: 'boolean', initialValue: false }),
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alternative text', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
          ],
        }),
        defineArrayMember({ type: 'code', name: 'codeBlock', title: 'Code block', options: { withFilename: true } }),
        defineArrayMember({ type: 'callout' }),
        defineArrayMember({
          type: 'object',
          name: 'divider',
          title: 'Divider',
          fields: [defineField({ name: 'style', type: 'string', hidden: true, initialValue: 'line' })],
          preview: { prepare: () => ({ title: 'Divider' }) },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'seo',
      title: 'Search and social metadata',
      type: 'object',
      group: 'seo',
      fields: [
        defineField({ name: 'title', title: 'Meta title', type: 'string', validation: (rule) => rule.max(60) }),
        defineField({ name: 'description', title: 'Meta description', type: 'text', rows: 3, validation: (rule) => rule.max(160) }),
        defineField({ name: 'image', title: 'Social image', type: 'image', options: { hotspot: true } }),
      ],
    }),
  ],
  orderings: [{ title: 'Publication date', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'excerpt', media: 'coverImage' },
  },
});
