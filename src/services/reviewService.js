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
    addReviewComment: async (reviewId,data) => {
        const response = await api.post(`reviews/${reviewId}/comment`,data)
        return response.data;
    }
}

export default reviewService