import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reviewService from "../../services/reviewService";

export const createReview = createAsyncThunk(
    "reviews/create",
    async ({ courseId, data }, thunkAPI) => {
        try {
            const response = await reviewService.createReview(courseId, data);
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getReviews = createAsyncThunk(
    "reviews/getAll",
    async (courseId, thunkAPI) => {
        try {
            const response = await reviewService.getReviews(courseId);
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const getAverageRating = createAsyncThunk(
    "reviews/getAverage",
    async (courseId, thunkAPI) => {
        try {
            const response = await reviewService.getAverageRating(courseId);
            return { courseId, avgRating: response.data.averageRating }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
)

const reviewSlice = createSlice({
    name: "reviews",
    initialState: {
        reviews: [],
        averageRatings: {},
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createReview.pending, (state) => {
                state.loading = true;
            })
            .addCase(createReview.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = [action.payload, ...state.reviews]
            })
            .addCase(createReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getReviews.pending, (state) => {
                state.loading = true;
            })
            .addCase(getReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload;
            })
            .addCase(getReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getAverageRating.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAverageRating.fulfilled, (state, action) => {
                state.loading = false;
                state.averageRatings[action.payload.courseId] = action.payload.avgRating;
            })
            .addCase(getAverageRating.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default reviewSlice.reducer;
