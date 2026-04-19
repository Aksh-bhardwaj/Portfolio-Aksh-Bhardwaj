import axios from 'axios';
import { getAccessToken, clearTokens, getRefreshToken, setTokens } from './authStorage';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/',
});

api.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (res) => res,
    async (error) => {
        const original = error.config;
        if (error.response?.status === 401 && !original._retry && getRefreshToken()) {
            original._retry = true;
            try {
                const { data } = await axios.post(
                    `${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/'}auth/refresh/`,
                    { refresh: getRefreshToken() }
                );
                setTokens(data.access, data.refresh || getRefreshToken());
                original.headers.Authorization = `Bearer ${data.access}`;
                return api(original);
            } catch {
                clearTokens();
            }
        }
        return Promise.reject(error);
    }
);

export default api;
