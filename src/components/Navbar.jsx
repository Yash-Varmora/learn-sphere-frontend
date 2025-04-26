import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { logout } from "@/redux/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

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
    <div className="flex justify-between items-center p-4  max-w-7xl mx-auto">
      <Link to="/" className="text-2xl font-bold">
        LEARNSPHERE
      </Link>
      {user && (
        <div className="flex items-center gap-4">
          <Link to="/profile">
            <Button variant="outline">Profile</Button>
          </Link>
        </div>
      )}
      <div className="flex items-center gap-4">
        {user ? (
          <>
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
