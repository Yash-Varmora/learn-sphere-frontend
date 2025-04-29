import api from "./api";

const userService = {
    becomeInstructor: async () => {
        const response = await api.post("/user/become_instructor");
        return response.data;
    },
};

export default userService;
