import api from "./api";

const lectureService = {
    getLecturesBySession: async (sessionId) => {
        const response = await api.get(`/lectures/session/${sessionId}`);
        return response.data;
    },
    getLectureById: async (lectureId) => {
        const response = await api.get(`/lectures/${lectureId}`);
        return response.data;
    },
    createLecture: async (sessionId, lectureData) => {
        const response = await api.post(`/lectures/${sessionId}`, lectureData);
        return response.data;
    },
    updateLecture: async (lectureId, lectureData) => {
        const response = await api.put(`/lectures/${lectureId}`, lectureData);
        return response.data;
    },
    deleteLecture: async (lectureId) => {
        const response = await api.delete(`/lectures/${lectureId}`);
        return response.data;
    },
    markLectureAsCompleted: async (lectureId) => { 
        const response = await api.post(`/lectures/${lectureId}/completed`);
        return response.data;
    },
    getCompletedLectures: async () => {
        const response = await api.get("/lectures/completed");
        return response.data;
    }
}

export default lectureService;