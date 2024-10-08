import { createApi, retry } from '@reduxjs/toolkit/query/react';
import createAxiosInstance from './axiosInstance';
import { urlTemplates } from './urls';
import config from 'utils/config';

// Create separate Axios instances for api and feeds
const apiAxiosInstance = createAxiosInstance(process.env.API_BASE_URL);
const feedsAxiosInstance = createAxiosInstance(process.env.FEEDS_BASE_URL);

const axiosBaseQuery =
  (axiosInstance) =>
    async ({ url, method, data, params, headers, ...rest }) => {
      try {
        const result = await axiosInstance({
          url,
          method,
          data,
          params,
          ...rest
        });
        return { data: result.data };
      } catch (error) {
        return {
          error: {
            ...error?.data
          }
        };
      }
    };

const baseQueryWithRetry = (axiosInstance) =>
  retry(axiosBaseQuery(axiosInstance), { maxRetries: 0 });

// Create separate base queries with retry for api and feeds
const apiBaseQueryWithRetry = baseQueryWithRetry(apiAxiosInstance);
const feedsBaseQueryWithRetry = baseQueryWithRetry(feedsAxiosInstance);

// Create separate API instances for api and feeds
export const api = createApi({
  reducerPath: 'apis',
  baseQuery: apiBaseQueryWithRetry,
  endpoints: (builder) => ({
    // Endpoint for fan login
    fanLogin: builder.mutation({
      query: (platformId) => ({
        url: urlTemplates?.fanLogin,
        method: 'POST',
        data: {platformId:config.platformId},
        params: { backdoor: 'horcrux' }
      }),
    }),
    // Endpoint for media login
    mediaLogin: builder.mutation({
      query: ({ platformId, businessName, mediaCode, emailId }) => ({
        url: urlTemplates?.mediaLogin,
        method: 'POST',
        data: { platformId, businessName, mediaCode, emailId },
        params: { backdoor: 'horcrux' }
      }),
    }),
    // Endpoint for federation login
    federationLogin: builder.mutation({
      query: ({ platformId, countryToken }) => ({
        url: urlTemplates?.federationLogin,
        method: 'POST',
        data: { platformId, countryToken },
        params: { backdoor: 'horcrux' }
      }),
    }),
    //submit vote
    submitVote: builder.mutation({
      query: ({ playerId, playerCategory }) => ({
        url: urlTemplates?.submitVote,
        method: 'POST',
        data: {
          playerId,
          playerCategory,
        },
        params: { backdoor: 'horcrux' }
      }),
    }),
    // Endpoint for getting votes
    getVotes: builder.query({
      query: (guid) => ({
        url: urlTemplates?.getVotes?.replace('{{guid}}', guid),
        method: 'GET',
        params: {
          optType: config.optType,
          backdoor: 'horcrux',
        },
      }),
    }),
    // Endpoint for getting results
    getResults: builder.query({
      query: (guid) => ({
        url: urlTemplates?.getResults?.replace('{{guid}}', guid),
        method: 'GET',
        params: { backdoor: 'horcrux'},
      }),
    }),
  }),
  // keepUnusedDataFor: 10000000000000,
  refetchOnReconnect: true
});

export const feeds = createApi({
  reducerPath: 'feeds',
  baseQuery: feedsBaseQueryWithRetry,
  endpoints: () => ({}),
  keepUnusedDataFor: 1000000000000,
  refetchOnReconnect: true
});

export const {
  useFanLoginMutation,
  useMediaLoginMutation,
  useFederationLoginMutation,
  useSubmitVoteMutation,
  useGetVotesQuery,
  useGetResultsQuery, } = api;

