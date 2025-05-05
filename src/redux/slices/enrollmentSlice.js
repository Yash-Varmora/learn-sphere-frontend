import enrollmentService from "@/services/enrollmentService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const enrollInCourse = createAsyncThunk(
    "enrollment/enrollInCourse",
    async (courseId , thunkAPI) => {
        try {
            const response = await enrollmentService.enrollInCourse(courseId);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const getEnrollmentByCourseId = createAsyncThunk(
    "enrollment/getEnrollmentByCourseId",
    async (courseId, thunkAPI) => {
        try {
            const response = await enrollmentService.getEnrollmentByCourseId(courseId);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)
export const getEnrollmentByUserId = createAsyncThunk(
    "enrollment/getEnrollmentByUserId",
    async (thunkAPI) => {
        try {
            const response = await enrollmentService.getEnrollmentByUserId();
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

const enrollmentSlice = createSlice({
    name: "enrollment",
    initialState: {
        enrollments: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(enrollInCourse.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(enrollInCourse.fulfilled, (state, action) => {
                state.loading = false;
                state.enrollments = [...state.enrollments, action.payload];
            })
            .addCase(enrollInCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getEnrollmentByCourseId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getEnrollmentByCourseId.fulfilled, (state,action) => {
                state.loading = false;
                state.courseEnrollments = action.payload;
            })
            .addCase(getEnrollmentByCourseId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getEnrollmentByUserId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getEnrollmentByUserId.fulfilled, (state, action) => {
                state.loading = false;
                state.enrollments = action.payload;
            })
            .addCase(getEnrollmentByUserId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
})

export default enrollmentSlice.reducer;