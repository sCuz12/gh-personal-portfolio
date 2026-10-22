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
      initialValue: 'note',
      options: {
        layout: 'radio',
        list: [
          { title: 'Note', value: 'note' },
          { title: 'Information', value: 'info' },
          { title: 'Warning', value: 'warning' },
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
