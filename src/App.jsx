  import React from "react";
  import { BrowserRouter, Routes, Route } from "react-router-dom";
  import Login from "./components/auth/Login";
  import Register from "./components/auth/Register";
  import Navbar from "./components/Navbar";
  import Home from "./pages/Home";
  import Profile from "./pages/Profile";
  import ProtectedRoute from "./utils/ProtectedRoute";
  import AuthProtect from "./utils/AuthProtect";
import { useDispatch } from "react-redux";
import { getUser } from "./redux/slices/authSlice";
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch();

   useEffect(() => {
     dispatch(getUser());
   }, [dispatch]);
  
  

    return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

          <Route path="/login" element={<AuthProtect><Login /></AuthProtect>} />
          <Route path="/register" element={<AuthProtect><Register /></AuthProtect>} />
        </Routes>
      </BrowserRouter>
    );
  };

  export default App;
