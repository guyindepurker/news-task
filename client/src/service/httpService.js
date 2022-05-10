import axios from 'axios';

const baseUrl =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3030/api' : '/api';

console.log({ node: process.env.NODE_ENV });

export const httpService = axios.create({
  baseURL: baseUrl,
});
