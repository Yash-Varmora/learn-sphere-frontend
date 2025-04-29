import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
          <Route index element={<div>Dashboard Content</div>} />
          <Route path="dashboard" element={<div>Dashboard Content</div>} />
          <Route path="add-course" element={<CourseForm mode="add" />} />
          <Route path="edit-course/:id" element={<CourseForm mode="edit" />} />
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
