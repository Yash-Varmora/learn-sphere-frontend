import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import sessionService from "@/services/sessionService";

export const getSessionsByCourse = createAsyncThunk(
    "sessions/getByCourse",
    async (courseId, thunkAPI) => {
        try {
            const response = await sessionService.getSessionsByCourse(courseId);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const getSessionById = createAsyncThunk(
    "sessions/getById",
    async (sessionId, thunkAPI) => {
        try {
            const response = await sessionService.getSessionById(sessionId);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const createSession = createAsyncThunk(
    "sessions/create",
    async ({ courseId, data }, thunkAPI) => {
        try {
            const response = await sessionService.createSession(courseId, data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const updateSession = createAsyncThunk(
    "sessions/update",
    async ({ sessionId, data }, thunkAPI) => {
        try {
            const response = await sessionService.updateSession(sessionId, data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const deleteSession = createAsyncThunk(
    "sessions/delete",
    async (sessionId, thunkAPI) => {
        try {
            await sessionService.deleteSession(sessionId);
            return sessionId;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const completedSession = createAsyncThunk(
    "sessions/completed",
    async (courseId, thunkAPI) => {
        try {
            const response = await sessionService.completedSessionByCourse(courseId);
            return { courseId, sessions: response.data };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

const initialState = {
    sessions: [],
    completedSessions: {},
    loading: false,
    error: null,
};

export const sessionSlice = createSlice({
    name: "sessions",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSessionsByCourse.pending, (state) => {
                state.loading = true;
            }
            )
            .addCase(getSessionsByCourse.fulfilled, (state, action) => {
                state.loading = false;
                state.sessions = action.payload;
            })
            .addCase(getSessionsByCourse.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getSessionById.pending, (state) => {
                state.loading = true;

            })
            .addCase(getSessionById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentSession = action.payload;
            })
            .addCase(getSessionById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createSession.pending, (state) => {
                state.loading = true;

            })
            .addCase(createSession.fulfilled, (state, action) => {
                state.loading = false;
                state.sessions.push(action.payload);
            })
            .addCase(createSession.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateSession.pending, (state) => {
                state.loading = true;

            })
            .addCase(updateSession.fulfilled, (state, action) => {
                state.loading = false;
                state.sessions = state.sessions.map(
                    (session) => session.id === action.payload.id ? action.payload : session
                );
            })
            .addCase(updateSession.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteSession.pending, (state) => {
                state.loading = true;

            })
            .addCase(deleteSession.fulfilled, (state, action) => {
                state.loading = false;
                state.sessions = state.sessions.filter(
                    (session) => session.id !== action.payload
                );
            })
            .addCase(deleteSession.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(completedSession.pending, (state) => {
                state.loading = true
            })
            .addCase(completedSession.fulfilled, (state, action) => {
                state.loading = false;
                const { courseId, sessions } = action.payload;
                state.completedSessions = {
                    ...state.completedSessions,
                    [courseId]: sessions,
                };
            })
            .addCase(completedSession.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    }
})

export default sessionSlice.reducer;