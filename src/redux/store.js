import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import courseReducer from "./slices/courseSlice";
import sessionReducer from "./slices/sessionSlice";
import lectureReducer from "./slices/lectureSlice";
import enrollmentReducer from "./slices/enrollmentSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        course: courseReducer,
        session: sessionReducer,
        lecture: lectureReducer,
        enrollment: enrollmentReducer,
    },
});

export default store;