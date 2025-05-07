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

export const markLectureAsCompleted = createAsyncThunk(
    "lectures/markAsCompleted",
    async (lectureId, thunkAPI) => {
        try {
            const response = await lectureService.markLectureAsCompleted(lectureId);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getCompletedLectures = createAsyncThunk(
    "lectures/getCompleted",
    async (_, thunkAPI) => {
        try {
            const response = await lectureService.getCompletedLectures(); 
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    lectures: [],
    completedLectures: [],
    currentPlayingLecture: {},
    loading: false,
    error: null,
};

export const lectureSlice = createSlice({
    name: "lectures",
    initialState,
    reducers: {
        setCurrentPlayingUrl: (state, action) => {
            state.currentPlayingLecture = {...action.payload}
        }
    },
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
            .addCase(markLectureAsCompleted.pending, (state) => {
                state.loading = true;
            })
            .addCase(markLectureAsCompleted.fulfilled, (state, action) => {
                state.loading = false;
                state.completedLectures = [
                    ...state.completedLectures,
                    action.payload,
                ];
            })
            .addCase(markLectureAsCompleted.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getCompletedLectures.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCompletedLectures.fulfilled, (state, action) => {
                state.loading = false;
                state.completedLectures = action.payload;
            })
            .addCase(getCompletedLectures.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})

export const { setCurrentPlayingUrl } = lectureSlice.actions;
export default lectureSlice.reducer;
