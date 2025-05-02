import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import lectureService from "@/services/lectureService";

export const getLecturesBySession = createAsyncThunk(
    "lectures/getBySession",
    async (sessionId, thunkAPI) => {
        try {
            const response = await lectureService.getLecturesBySession(sessionId);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getLectureById = createAsyncThunk(
    "lectures/getById",
    async (lectureId, thunkAPI) => {
        try {
            const response = await lectureService.getLectureById(lectureId);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const createLecture = createAsyncThunk(
    "lectures/create",
    async ({ sessionId, data }, thunkAPI) => {
        try {
            const response = await lectureService.createLecture(sessionId, data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const updateLecture = createAsyncThunk(
    "lectures/update",
    async ({ lectureId, data }, thunkAPI) => {
        try {
            const response = await lectureService.updateLecture(lectureId, data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
export const deleteLecture = createAsyncThunk(
    "lectures/delete",
    async (lectureId, thunkAPI) => {
        try {
            await lectureService.deleteLecture(lectureId);
            return lectureId;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
const initialState = {
    lectures: [],
    loading: false,
    error: null,
};

export const lectureSlice = createSlice({
    name: "lectures",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getLecturesBySession.pending, (state) => {
                state.loading = true;
            })
            .addCase(getLecturesBySession.fulfilled, (state, action) => {
                state.loading = false;
                state.lectures = action.payload;
            })
            .addCase(getLecturesBySession.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getLectureById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getLectureById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentLecture = action.payload;
            })
            .addCase(getLectureById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createLecture.pending, (state) => {
                state.loading = true;
            })
            .addCase(createLecture.fulfilled, (state, action) => {
                state.loading = false;
                state.lectures = [...state.lectures, action.payload];
            })
            .addCase(createLecture.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateLecture.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateLecture.fulfilled, (state, action) => {
                state.loading = false;
                state.lectures = state.lectures.map((lecture) =>
                    lecture.id === action.payload.id ? action.payload : lecture
                );
            })
            .addCase(updateLecture.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteLecture.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteLecture.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload)
                state.lectures = state.lectures.filter(
                    (lecture) => lecture.id !== action.payload
                );
                console.log(state.lectures)
            })
            .addCase(deleteLecture.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export default lectureSlice.reducer;