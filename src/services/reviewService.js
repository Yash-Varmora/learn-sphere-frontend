import api from "./api";

const reviewService = {
    createReview: async (courseId, data) => {
        const response = await api.post(`reviews/${courseId}/review`, data)
        return response.data;
    },
    getReviews: async (courseId) =>{
        const response = await api.get(`reviews/${courseId}/review`)
        return response.data;
    },
    getAverageRating: async (courseId) => {
        const response = await api.get(`reviews/${courseId}/average_rating`)
        return response.data;
    }
}

export default reviewService