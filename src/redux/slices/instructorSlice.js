import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instructorService from "@/services/instructorService";

export const getInstructorOverview = createAsyncThunk("instructor/getInstructorOverview", async (_, thunkAPI) => {
    try {
        const response = await instructorService.getInstructorOverview();
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

const instructorSlice = createSlice({
    name: "instructor",
    initialState: {
        instructorData: null,
        loading: false,
        error:null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getInstructorOverview.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getInstructorOverview.fulfilled, (state, action) => {
            state.loading = false;
            state.instructorData = action.payload
        });
        builder.addCase(getInstructorOverview.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export default instructorSlice.reducer;