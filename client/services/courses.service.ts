import { api } from "@/lib/axios";

export const courseService = {
  getCourses: async () => {
    const response = await api.get("/courses");
    return response.data.data;
  },

  getCourse: async (courseId: string) => {
    const response = await api.get(`/courses/${courseId}`);
    return response.data.data;
  },
};
