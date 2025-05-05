import api from "./api";

const enrollmentService = {
    enrollInCourse: async (courseId) => {
        const response = await api.post(`/enrollment/${courseId}/enroll`);
        return response.data;
    },
    getEnrollmentByCourseId: async (courseId) => {
        const response = await api.get(`/enrollment/course/${courseId}`);
        return response.data;
    },
    getEnrollmentByUserId: async () => {
        const response = await api.get("/enrollment/user");
        return response.data;
    }
}

export default enrollmentService;