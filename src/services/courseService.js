import api from "./api";

const courseService = {
  getCourses: async (page) => {
    const response = await api.get(`/courses?page=${page}`);
    return response.data;
  },  
  getCourseById: async (id) => {
    const response = await api.get(`/courses/${id}`);
    return response.data;
  },
  createCourse: async (courseData) => {
    const response = await api.post("/courses", courseData);
    return response.data;
  },
  updateCourse: async (id, courseData) => {
    const response = await api.put(`/courses/${id}`, courseData);
    return response.data;
  },
  deleteCourse: async (id) => {
    const response = await api.delete(`/courses/${id}`);
    return response.data;
  },
  getInstructorCourses: async () => {
    const response = await api.get("/courses/instructor/courses");
    return response.data;
    },
};

export default courseService;