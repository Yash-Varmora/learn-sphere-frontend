import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getUser, logout } from "@/redux/slices/authSlice";
import { becomeInstructor } from "@/redux/slices/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleBecomeInstructor = () => {
    try {
      dispatch(becomeInstructor());
      toast.success("Become instructor successful");
      dispatch(getUser());
      navigate("/instructor/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Become instructor failed");
    }
  };

  const handleLogout = () => {
    try {
      dispatch(logout());
      toast.success("Logout successful");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  };

  return (
    <div className="sticky top-0 flex justify-between items-center p-4 w-auto rounded-md bg-white shadow-md m-4 z-50">
      <Link to="/" className="text-2xl font-bold">
        LEARNSPHERE
      </Link>
      <div className="flex items-center gap-4 text-md">
        <Link to="/courses" className="text-muted-foreground hover:underline">
          Courses
        </Link>
        {user && <Link to="/dashboard" className="text-muted-foreground hover:underline">
          My Learning
        </Link>}
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            {user.isInstructor ? (
              <Link to="/instructor/dashboard">
                <Button variant="outline">Instructor Dashboard</Button>
              </Link>
            ) : (
              <Button variant="outline" onClick={handleBecomeInstructor}>
                Become Instructor
              </Button>
            )}
            <p className="text-md text-muted-foreground">
              Welcome, <span className="font-bold">{user.name}</span>
            </p>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>

            <Link to="/register">
              <Button variant="outline">Register</Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
