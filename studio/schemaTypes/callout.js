import { defineField, defineType } from 'sanity';

export const callout = defineType({
  name: 'callout',
  title: 'Callout',
  type: 'object',
  fields: [
    defineField({
      name: 'tone',
      title: 'Tone',
      type: 'string',
      initialValue: 'decision',
      options: {
        layout: 'radio',
        list: [
          { title: 'Decision', value: 'decision' },
          { title: 'Trade-off', value: 'tradeoff' },
          { title: 'Pitfall', value: 'pitfall' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'body', title: 'Body', type: 'text', rows: 4, validation: (rule) => rule.required() }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'body' },
    prepare: ({ title, subtitle }) => ({ title: title || 'Callout', subtitle }),
  },
});
