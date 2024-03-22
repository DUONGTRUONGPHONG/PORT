import CredentialsProvider from "next-auth/providers/credentials";
import { NuxtAuthHandler } from "#auth";
import { GeneralUser, User } from "~/server/models/v2/user";
import { utils } from "~/utils/utilities";
/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(refreshToken: {
  accessToken: string;
  accessTokenExpires: string;
  refreshToken: string;
}) {
  try {
    console.warn("trying to post to refresh token");
    const refreshedTokens = await $fetch<{
      data: {
        access_token: string;
        expires: number;
        refresh_token: string;
      };
    } | null>(`${useRuntimeConfig().public.apiUrl}/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        refresh_token: refreshToken.refreshToken,
        mode: "json",
      },
    });
    if (!refreshedTokens || !refreshedTokens.data) {
      console.warn("No refreshed tokens");
      throw refreshedTokens;
    }
    console.warn("Refreshed tokens successfully");
    return {
      ...refreshToken,
      accessToken: refreshedTokens.data.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.data.expires,
      refreshToken: refreshedTokens.data.refresh_token,
    };
  } catch (error) {
    console.warn("Error refreshing token", error);
    return {
      ...refreshToken,
      error: "RefreshAccessTokenError",
    };
  }
}

export default NuxtAuthHandler({
  // secret needed to run nuxt-auth in production mode (used to encrypt data)
  secret: useRuntimeConfig().authSecret,
  pages: {
    signIn: "/login",
  },
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    CredentialsProvider.default({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        try {
          const payload = {
            nameOrEmail: credentials.username,
            password: credentials.password,
          };

          const userTokens = await $fetch<{ item: { token: string } } | null>(
            `${useRuntimeConfig().public.apiUrl}/auth/login`,
            {
              method: "POST",
              body: payload,
              headers: {
                site: useRuntimeConfig().public.site,
              },
            }
          );

          const userDetails = await $fetch<{item:GeneralUser | null}>(
            `${useRuntimeConfig().public.apiUrl}/com/client/user/current-user`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userTokens?.item.token}`,
              },
            }
          );

          if (
            !userTokens ||
            !userTokens.item ||
            !userDetails ||
            !userDetails.item
          ) {
            throw createError({
              statusCode: 500,
              statusMessage: "Next auth failed",
            });
          }
          const user = {
            id: userDetails.item.user.id,
            siteId: userDetails.item.user.siteId,
            name: userDetails.item.user.name,
            accessToken: userTokens.item.token,
            refreshToken: "",
          };

          return user;
        } catch (error) {
          console.warn("Error logging in", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        if(utils.isDev()) console.log("JWT callback", { token, user, account });
        return {
          ...token,
          ...user,
        };
      }
      // Handle token refresh before it expires of 15 minutes

      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        ...token,
      };
      return session;
    },
    async redirect({ url, baseUrl }) {
      return '/';
    },
  },
});
