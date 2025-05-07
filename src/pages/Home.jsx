import Categories from '@/components/courses/Categories';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { Copyright, Github, Linkedin, Twitter } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start md:px-10">
      <Card className="flex flex-col items-center justify-center w-full m-4 p-10 bg-gray-900">
        <CardTitle className="text-6xl text-white font-bold mb-4">
          Welcome to LEARNSPHERE
        </CardTitle>
        <CardDescription className="text-lg text-gray-300 mb-6">
          Discover courses, grow your skills, and become an expert.
        </CardDescription>
        <Button
          variant="secondary"
          onClick={() => navigate("/courses")}
          className="text-md"
        >
          Explore Courses
        </Button>
      </Card>
      <section className="w-full">
        <Categories />
      </section>
      <footer className="bg-gray-100 w-full mt-16 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="text-sm text-gray-600">
            <Copyright className='inline-block' /> {new Date().getFullYear()} LEARNSPHERE. All rights reserved.
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5 hover:text-gray-800 transition" />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="h-5 w-5 hover:text-blue-500 transition" />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-5 w-5 hover:text-blue-700 transition" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home