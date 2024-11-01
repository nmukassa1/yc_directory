import { UserIcon } from "lucide-react";
import { defineType } from "sanity";

export const author = defineType({
    name: 'author',
    title: 'Author',
    type: 'document',
    icon: UserIcon,
    fields: [
        {
            name: 'id',
            type: 'number'
        },
        {
            name: 'name',
            title: 'Name',
            type: 'string'
        },
        {
            name: 'username',
            title: 'Username',
            type: 'string'
        },
        {
            name: 'email',
            title: 'Email',
            type: 'string'
        },
        {
            name: 'image',
            title: 'Image',
            type: 'url'
        },
        {
            name: 'bio',
            title: 'Bio',
            type: 'text'
        },
    ],
    preview: {
        select: {
            title: 'name'
        }
    }
});