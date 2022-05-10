import axios from 'axios';

const baseUrl =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3030/api' : '/api';

export const httpService = axios.create({
  baseURL: baseUrl,
});
