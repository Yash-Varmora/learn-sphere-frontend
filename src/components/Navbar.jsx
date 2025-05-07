import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getUser, logout } from "@/redux/slices/authSlice";
import { becomeInstructor } from "@/redux/slices/userSlice";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <nav className="sticky top-0 z-50 w-full bg-white shadow-md px-4 py-3 sm:px-6 lg:px-8">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          LEARNSPHERE
        </Link>

        <div className="lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        <div className="hidden lg:flex lg:items-center lg:gap-6">
          <Link
            to="/courses"
            className="text-muted-foreground hover:underline text-base"
          >
            Courses
          </Link>
          {user && (
            <Link
              to="/dashboard"
              className="text-muted-foreground hover:underline text-base"
            >
              My Learning
            </Link>
          )}
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
              <span className="text-sm text-muted-foreground">
                Welcome, <strong>{user.name}</strong>
              </span>
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

      {mobileMenuOpen && (
        <div className="lg:hidden mt-4 px-4 pb-4 flex flex-col gap-3">
          <Link
            to="/courses"
            onClick={() => setMobileMenuOpen(false)}
            className="text-muted-foreground text-base py-2"
          >
            Courses
          </Link>
          {user && (
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="text-muted-foreground text-base py-2"
            >
              My Learning
            </Link>
          )}
          {user ? (
            <>
              {user.isInstructor ? (
                <Link
                  to="/instructor/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button variant="outline" className="w-full text-left">
                    Instructor Dashboard
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => {
                    handleBecomeInstructor();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left"
                >
                  Become Instructor
                </Button>
              )}
              <span className="text-sm text-muted-foreground py-2">
                Welcome, <strong>{user.name}</strong>
              </span>
              <Button
                variant="outline"
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full text-left">
                  Login
                </Button>
              </Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full text-left">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
