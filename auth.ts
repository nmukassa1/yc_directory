import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({
      user: { name, email, image }, // Contains basic user information such as name, email, and image.
      profile: { id, login, bio }, //Contains additional profile information from GitHub, including id, login, and bio.
    }) {
      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id,
        });

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id,
          name,
          username: login,
          email,
          image,
          bio: bio || "",
        });
      }

      return true;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
            id: profile?.id,
          });

        token.id = user?._id;
      }

      return token;
    },
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});

/*
NOTES:

useCdn: false: This option specifies that the client should not use the Content Delivery Network (CDN) for fetching data. Instead, it will fetch data directly from the Sanity API, ensuring that the most up-to-date data is retrieved

JWT:
The token, account, and profile parameters in the jwt callback function are provided by NextAuth during the JWT creation process. Here's where they come from:

token: This is the current JSON Web Token (JWT) being processed. It contains the existing token data, which can be modified or extended within the callback.

account: This contains information about the provider account (e.g., GitHub) used to sign in. It is available only during the initial sign-in process.

profile: This contains the profile information returned by the authentication provider (e.g., GitHub). It is also available only during the initial sign-in process.

*/