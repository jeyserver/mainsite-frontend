import axios from 'axios';
import NProgress from 'nprogress';

const backend = axios.create({
  baseURL: `${process.env.SCHEMA}://${process.env.DOMAIN}`,
});

backend.interceptors.request.use((config) => {
  NProgress.start();
  return config;
});

backend.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response;
  },
  (err) => {
    NProgress.done();
    throw err;
  }
);
export default backend;
