import api from "./api";

const authService = {
    login: async (data) => {    
        const response = await api.post("/auth/login", data);
        return response.data;
    },
    register: async (data) => {
        const response = await api.post("/user/register", data);
        return response.data;
    },
    logout: async () => {
        const response = await api.post("/auth/logout");
        return response.data;
    },
    getUser: async () => {
        const response = await api.get("/user/me");
        return response.data;
    },
    refreshToken: async () => {
        const response = await api.post("/auth/refresh_token");
        return response.data;
    },  
};
export default authService;



