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

export const addReviewComment = createAsyncThunk(
    "reviews/addComment",
    async ({ reviewId, data }, thunkAPI) => {
        try {
            const response = await reviewService.addReviewComment(reviewId, data);
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || error.message);
        }
    }
);

const reviewSlice = createSlice({
    name: "reviews",
    initialState: {
        reviews: [],
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

            .addCase(addReviewComment.pending, (state) => {
                state.loading = true;
            })
            .addCase(addReviewComment.fulfilled, (state, action) => {
                state.loading = false;
                const comment = action.payload;
                const review = state.reviews.find((r) => r.id === comment.reviewId);
                if (review) {
                    review.comments.push(comment);
                }
            })
            .addCase(addReviewComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default reviewSlice.reducer;
