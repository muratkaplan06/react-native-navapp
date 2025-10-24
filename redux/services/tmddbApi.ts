import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const TMDB_V3_API_KEY = "87fa8e7fb6bbf36c760440ddcd7239a9";

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3" }),
  endpoints: (build) => ({
    // 1) request_token al
    getRequestToken: build.query<
      { success: boolean; expires_at: string; request_token: string },
      void
    >({
      query: () => ({
        url: "/authentication/token/new",
        params: { api_key: TMDB_V3_API_KEY },
      }),
    }),

    // 2) session oluştur
    createSession: build.mutation<
      { success: boolean; session_id: string },
      { request_token: string }
    >({
      query: ({ request_token }) => ({
        url: "/authentication/session/new",
        method: "POST",
        params: { api_key: TMDB_V3_API_KEY },
        headers: { "Content-Type": "application/json" },
        body: { request_token },
      }),
    }),

    // 3) kullanıcı bilgisi
    getAccount: build.query<any, { session_id: string }>({
      query: ({ session_id }) => ({
        url: "/account",
        params: { api_key: TMDB_V3_API_KEY, session_id },
      }),
    }),

    // logout
    deleteSession: build.mutation<{ success: boolean }, { session_id: string }>(
      {
        query: ({ session_id }) => ({
          url: "/authentication/session",
          method: "DELETE",
          params: { api_key: TMDB_V3_API_KEY },
          headers: { "Content-Type": "application/json" },
          body: { session_id },
        }),
      }
    ),
  }),
});

export const {
  useLazyGetRequestTokenQuery,
  useCreateSessionMutation,
  useLazyGetAccountQuery,
  useDeleteSessionMutation,
} = tmdbApi;
