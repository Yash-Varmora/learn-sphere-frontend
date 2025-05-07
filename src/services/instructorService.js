import api from "./api";

const instructorService = {
    getInstructorOverview: async () => {
        const response = await api.get("instructor/overview?limit=5")
        return response.data;
    }
}

export default instructorService