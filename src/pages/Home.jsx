import Categories from "@/components/courses/Categories";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Copyright, Github, Linkedin, Twitter } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start px-4 sm:px-6 lg:px-10">
      <Card className="flex flex-col items-center justify-center w-full max-w-4xl m-4 p-6 sm:p-10 bg-gray-900">
        <CardTitle className="text-3xl sm:text-4xl lg:text-6xl text-white font-bold mb-4 text-center">
          Welcome to LEARNSPHERE
        </CardTitle>
        <CardDescription className="text-base sm:text-lg text-gray-300 mb-6 text-center">
          Discover courses, grow your skills, and become an expert.
        </CardDescription>
        <Button
          variant="secondary"
          onClick={() => navigate("/courses")}
          className="text-sm sm:text-md px-4 py-2"
        >
          Explore Courses
        </Button>
      </Card>
      <section className="w-full max-w-6xl">
        <Categories />
      </section>
      <footer className="bg-gray-100 w-full mt-16 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4">
          <div className="text-sm text-gray-600 flex items-center gap-1">
            <Copyright className="h-4 w-4" /> {new Date().getFullYear()}{" "}
            LEARNSPHERE. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a
              href="https://github.com/"
              target="_blank"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5 hover:text-gray-800 transition" />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5 hover:text-blue-500 transition" />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5 hover:text-blue-700 transition" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
