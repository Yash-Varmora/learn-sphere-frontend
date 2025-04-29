import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../../services/userService";

export const becomeInstructor = createAsyncThunk("user/becomeInstructor", async (_, thunkAPI) => {
    try {
        const response = await userService.becomeInstructor();
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

const initialState = {
    isLoading: false,
    error: null,
};  

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(becomeInstructor.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(becomeInstructor.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(becomeInstructor.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
}); 

export default userSlice.reducer;