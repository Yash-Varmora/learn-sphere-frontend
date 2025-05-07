import React, { useEffect } from "react";
import { getAllCategories } from "@/redux/slices/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card } from "../ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { categories } = useSelector((state) => state.course);

  const query = new URLSearchParams(location.search);
  const selectedCategoryId = query.get("categoryId");

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleCategoryClick = (categoryId) => {
    if (categoryId === selectedCategoryId) {
      navigate(`/courses?page=1`);
    } else {
      navigate(`/courses?page=1&categoryId=${categoryId}`);
    }
  };

  const handleShowAll = () => {
    navigate(`/courses?page=1`);
  };

  return (
    <div className="mb-6 md:mb-10 md:px-6">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-3 md:mb-6 text-center">
        Categories
      </h2>

      <div className="relative">
        <Carousel
          opts={{
            align: "start",
            loop: false,
            skipSnaps: false,
            dragFree: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4 my-2">
            <CarouselItem className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6">
              <Card
                className="cursor-pointer p-1 md:p-3 h-14 md:h-16 flex items-center justify-center flex-col rounded-lg transition duration-200 hover:shadow-md border border-gray-200"
                onClick={handleShowAll}
              >
                <h3 className="font-semibold text-center text-md md:text-base">
                  All Courses
                </h3>
              </Card>
            </CarouselItem>

            {categories &&
              categories.map((category) => (
                <CarouselItem
                  key={category.id}
                  className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
                >
                  <Card
                    className="cursor-pointer p-1 md:p-3 h-14 md:h-16 flex items-center justify-center flex-col rounded-lg transition duration-200 hover:shadow-md border border-gray-200"
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    <h3 className="font-semibold text-center text-sm md:text-base truncate w-full px-1">
                      {category.name}
                    </h3>
                  </Card>
                </CarouselItem>
              ))}
          </CarouselContent>

          <CarouselPrevious
            className="-left-4 h-6 w-6 md:h-8 md:w-8 bg-white shadow-md hover:bg-gray-100"
            icon={<ChevronLeft className="h-3 w-3 md:h-4 md:w-4" />}
          />
          <CarouselNext
            className="-right-4 h-6 w-6 md:h-8 md:w-8 bg-white shadow-md hover:bg-gray-100"
            icon={<ChevronRight className="h-3 w-3 md:h-4 md:w-4" />}
          />
        </Carousel>
      </div>
    </div>
  );
};

export default Categories;
