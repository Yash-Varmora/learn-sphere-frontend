import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import courseService from "@/services/courseService";

export const getCourses = createAsyncThunk(
    "courses/get",
    async ({page = 1, categoryId}, thunkAPI) => {
        try {
            const response = await courseService.getCourses(page,categoryId);
            return response.data;
        } catch (error) {
            console.log(error)
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getCourseById = createAsyncThunk(
    "courses/getById",
    async (id, thunkAPI) => {
        try {
            const response = await courseService.getCourseById(id);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const createCourse = createAsyncThunk(
    "courses/create",
    async (courseData, thunkAPI) => {
        try {
            const response = await courseService.createCourse(courseData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updateCourse = createAsyncThunk(
    "courses/update",
    async (courseData, thunkAPI) => {
        try {
            const { id, ...data } = courseData;
            const response = await courseService.updateCourse(id, data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getInstructorCourses = createAsyncThunk(
    "courses/instructor",
    async (_, thunkAPI) => {
        try {
            const response = await courseService.getInstructorCourses();
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const deleteCourse = createAsyncThunk(
    "courses/delete",
    async (id, thunkAPI) => {
        try {
            await courseService.deleteCourse(id);
            return id;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getAllCategories = createAsyncThunk(
    "courses/categories",
    async (_, thunkAPI) => {
        try {
            const response = await courseService.getAllCategories();
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    courses: [],
    course: null,
    categories: [],
    loading: false,
    error: null,
};

export const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCourses.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCourses.fulfilled, (state, action) => {
                state.loading = false;
                state.courses = action.payload;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.page;
            })
            .addCase(getCourses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        builder
            .addCase(getCourseById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCourseById.fulfilled, (state, action) => {
                state.loading = false;
                state.course = action.payload;
            })
            .addCase(getCourseById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        builder
            .addCase(createCourse.pending, (state) => {
                state.loading = true;
            })
            .addCase(createCourse.fulfilled, (state, action) => {
                state.loading = false;
                state.courses.push(action.payload);
            })
            .addCase(createCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        builder
            .addCase(updateCourse.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCourse.fulfilled, (state, action) => {
                state.loading = false;
                state.courses = state.courses.map((course) =>
                    course.id === action.payload.id ? action.payload : course
                );
            })
            .addCase(updateCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        builder
            .addCase(getInstructorCourses.pending, (state) => {
                state.loading = true;
            })
            .addCase(getInstructorCourses.fulfilled, (state, action) => {
                state.loading = false;
                state.courses = action.payload;
            })
            .addCase(getInstructorCourses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        builder
            .addCase(deleteCourse.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteCourse.fulfilled, (state, action) => {
                state.loading = false;
                state.courses = state.courses.filter(
                    (course) => course.id !== action.payload
                );
            })
            .addCase(deleteCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        builder
            .addCase(getAllCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});

export default courseSlice.reducer;
