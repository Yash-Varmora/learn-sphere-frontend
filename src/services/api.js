import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json",
    },
    withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then(token => {
                        originalRequest.headers['Authorization'] = 'Bearer ' + token;
                        return api(originalRequest);
                    })
                    .catch(err => Promise.reject(err));
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const response = await api.post("/auth/refresh_token");
                const { access_token } = response.data;
                isRefreshing = false;
                processQueue(null, access_token);
                return api(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                isRefreshing = false;
                if (originalRequest.url === "/user/me") {
                    window.location.href = '/login';
                    toast.error("Session expired, please login again");
                }
                return Promise.reject(refreshError);
            }
        }

        if (error.response.status === 401) {
            if (originalRequest.url === "/user/me") {
                window.location.href = '/login';
                toast.error("Session expired, please login again");
            }
            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
);

export default api;
