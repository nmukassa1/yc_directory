import { defineQuery } from "next-sanity";



export const STARTUP_QUERY = defineQuery(
    `*[_type == "startup" && defined(slug.current) && !defined($search) || category match $search || author->name match $search || title match $search ] | order(_createdAt desc){
        _id,
        title,
        slug,
        _createdAt,
        author -> {_id, name, username, image, bio},
        views,
        description,
        category,
        image
    } `
)


/* 
NOTES:
GitHub Copilot
import { defineQuery } from "next-sanity";

This imports the defineQuery function from the next-sanity package, which is used to define queries for fetching data from Sanity.
export const STARTUP_QUERY = defineQuery(

This line exports a constant named STARTUP_QUERY which is defined using the defineQuery function.
The query string inside defineQuery:

*[_type == "startup" && defined(slug.current) && !defined($search) || category match $search || author->name match $search || title match $search ]
This part of the query selects documents of type startup where the slug.current field is defined.
It also includes documents where the category, author->name, or title fields match the $search parameter, if $search is defined.
| order(_createdAt desc)
This orders the results by the _createdAt field in descending order.
{ _id, title, slug, _createdAt, author -> {_id, name, username, image, bio}, views, description, category, image }
This specifies the fields to be returned in the query results:
_id: The document ID.
title: The title of the startup.
slug: The slug of the startup.
_createdAt: The creation date of the document.
author -> {_id, name, username, image, bio}: The author of the startup, including their ID, name, username, image, and bio.
views: The number of views.
description: The description of the startup.
category: The category of the startup.
image: The image associated with the startup.
*/