import { defineType } from "sanity";

export const startup = defineType({
    name: 'startup',
    title: 'startup',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
            name: 'slug',
            type: 'slug',
            options: {
                source: 'title'
            }
        },
        {
            name: 'author',
            title: 'Author',
            type: 'reference', 
            to: {type: 'author'}
        },
        {
            name: 'views',
            title: 'Views',
            type: 'number'
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text'
        },
        {
            name: 'category',
            title: 'Category',
            type: 'text',
            validation: (Rule) => Rule.min(1).max(20).required().error('Please enter a category')
        },
        {
            name: 'image',
            title: 'Image',
            type: 'url',
            validation: (Rule) => Rule.required()
        },
        {
            name: 'pitch',
            title: 'Pitch',
            type: 'markdown'
        },
    ],
});