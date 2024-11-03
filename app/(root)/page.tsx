import { auth } from "@/auth";
import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

interface HomeProps {
  searchParams: Promise<{ query?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const query = (await searchParams).query || '';
  const params = {search: query || null}
  // const posts = await client.fetch(STARTUPS_QUERY, params)
  const {data: posts} = await sanityFetch({query: STARTUPS_QUERY, params}) //Allows me to fetch posts in live time instead of caching it

  const session = await auth()
  console.log(session?.id);
  

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup
          <br />
          Connect With Entrepreneurs
        </h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, Get noticed in Virtual Competitions.
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for ${query}`: 'All Startups'}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ?(
            posts.map((post: StartupCardType, index: number) => (
              <StartupCard key={post?._id} post={post}/>
            ))
          ) :(
            <p className="no-results">No startups found</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}

/*
NOTES: 
Why use a Promise for searchParams? (Promise<{query?: string}>)
Accepting searchParams as a Promise allows the function to handle asynchronous operations directly within the function. This can be useful in scenarios where searchParams is fetched from an API or another asynchronous source. However, if searchParams is already resolved and available synchronously, you can simplify the function by accepting searchParams directly without a Promise.

When to Use Each Approach
With Promise:

Use this approach when searchParams is obtained asynchronously, such as from an API call or a database query.
This allows the function to handle the asynchronous nature of the data fetching.
Without Promise:

Use this approach when searchParams is already available synchronously, such as when it is passed directly from another part of your application.
This simplifies the function and avoids unnecessary asynchronous handling.
*/