import axios from 'axios';
import { genericSignout, LOCAL_STORAGE_KEY } from '@/lib/auth';
const unprotectedRoutes = [
  'auth/register',
  'auth/login',
  'auth/logout',
  'password-reset/request',
  'password-reset/validate',
  'password-reset/reset',
];

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Accept: 'application/json, */*',
  },
  // baseURL: import.meta.env.BASE_URL,
});

// Rquest interceptor for API calls
axiosInstance.interceptors.request.use(
  async (config) => {
    // get the authentication token from local storage if it exists
    const accessToken = await localStorage.getItem(
      LOCAL_STORAGE_KEY.ACCESS_TOKEN
    );
    const refreshToken = await localStorage.getItem(
      LOCAL_STORAGE_KEY.ACCESS_TOKEN
    );

    const isUnprotected = unprotectedRoutes.some((endpoint) =>
      config.url?.includes(endpoint)
    );

    if (isUnprotected) {
      return config;
    }

    if (!!accessToken && !!refreshToken) {
      config.headers.set('Authorization', `Bearer ${JSON.parse(accessToken)}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Rquest interceptor for API calls
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // const originalRequest = error.config;
    if (error.response.status === 401) {
      //signout
      genericSignout(); //signout and reset tokens
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
