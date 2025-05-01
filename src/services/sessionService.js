import api from "./api";

const sessionService = {
    getSessionsByCourse: async (courseId) => {
        const response = await api.get(`/sessions/course/${courseId}`);
        return response.data;
    },
    getSessionById: async (sessionId) => {
        const response = await api.get(`/sessions/${sessionId}`);
        return response.data;
    },
    createSession: async (courseId, sessionData) => {
        const response = await api.post(`/sessions/${courseId}`, sessionData);
        return response.data;
    },
    updateSession: async (sessionId, sessionData) => {
        const response = await api.put(`/sessions/${sessionId}`, sessionData);
        return response.data;
    },
    deleteSession: async (sessionId) => {
        const response = await api.delete(`/sessions/${sessionId}`);
        return response.data;
    },
}

export default sessionService;