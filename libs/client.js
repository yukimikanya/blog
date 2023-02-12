import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'yukiworks',
  apiKey: process.env.API_KEY,
});