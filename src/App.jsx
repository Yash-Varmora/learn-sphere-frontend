import React from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProtectedRoute from "./utils/ProtectedRoute";
import AuthProtect from "./utils/AuthProtect";
import { useDispatch } from "react-redux";
import { getUser } from "./redux/slices/authSlice";
import { useEffect } from "react";
import Dashboard from "./components/instructorDashboard/Dashboard";
import ProtectInstructor from "./utils/ProtectInstructor";
import CourseForm from "./components/instructorDashboard/CourseForm";
import CourseList from "./components/instructorDashboard/CourseList";
import Courses from "./pages/Courses";
import SessionForm from "./components/instructorDashboard/SessionForm";
import CourseSessionList from "./components/instructorDashboard/CourseSessionList";
import LectureForm from "./components/instructorDashboard/LectureForm";
import CourseDetail from "./components/courses/CourseDetail";
import StudentDashboard from "./components/studentDashboard/StudentDashboard";
import InstructorDashboard from "./components/instructorDashboard/InstructorDashboard";

const AppContent = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const showNavbar = !location.pathname.startsWith("/instructor");

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <StudentDashboard/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/instructor"
          element={
            <ProtectedRoute>
              <ProtectInstructor>
                <Dashboard />
              </ProtectInstructor>
            </ProtectedRoute>
          }
        >
          <Route index element={<InstructorDashboard />} />
          <Route path="dashboard" element={<InstructorDashboard />} />
          <Route path="add-course" element={<CourseForm mode="add" />} />
          <Route path="edit-course/:id" element={<CourseForm mode="edit" />} />
          <Route path="course/:courseId/add-session" element={<SessionForm mode="add" />} />
          <Route path="course/:courseId/edit-session/:sessionId" element={<SessionForm mode="edit" />} />
          <Route path="course/:courseId/sessions/:sessionId/add-lecture" element={<LectureForm mode="add" />} />
          <Route path="course/:courseId/sessions/:sessionId/edit-lecture/:lectureId" element={<LectureForm mode="edit" />} />
          <Route path="course/:courseId/sessions" element={<CourseSessionList />} />
          <Route path="manage-courses" element={<CourseList />} />
        </Route>

        <Route
          path="/login"
          element={
            <AuthProtect>
              <Login />
            </AuthProtect>
          }
        />
        <Route
          path="/register"
          element={
            <AuthProtect>
              <Register />
            </AuthProtect>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
