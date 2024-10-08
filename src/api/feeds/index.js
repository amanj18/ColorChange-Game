import { feeds } from '..';
import { urlTemplates } from 'api/urls';

export const feedsApi = feeds.injectEndpoints({
  endpoints: (builder) => {
    return {
      config: builder.query({
        query: () => {
          return {
            url: urlTemplates?.config,
            method: 'GET',
            addBuster: false
          };
        }
      }),
      athletes: builder.query({
        query: () => {
          return {
            url: urlTemplates?.athletes,
            method: 'GET',
            addBuster: false,
          };
        }
      }),
      status: builder.query({
        query: () => {
          return {
            url: urlTemplates?.getStatus,
            method: 'GET',
            addBuster: false,
          };
        }
      }),
      trans: builder.query({
        query: () => {
          return {
            url: urlTemplates?.trans,
            method: 'GET',
            addBuster: false,
          };
        }
      }),
    };
  }
});

export const { 
  useConfigQuery, 
  useAthletesQuery, 
  useStatusQuery , 
  useTransQuery,
} = feedsApi;
