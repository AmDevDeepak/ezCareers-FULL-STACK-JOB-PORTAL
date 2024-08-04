import React from "react";
import { categories } from "../utils/constants.js";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button.jsx";
import { setSearchedQueryHeroSection } from "@/redux/jobSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = (query) => {
    dispatch(setSearchedQueryHeroSection(query));
    navigate("/explore");
  };
  return (
    <div className="w-full">
      <Carousel className="w-full max-w-xl mx-auto my-16">
        <CarouselContent>
          {categories.map((category) => (
            <div key={category.id}>
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Button
                  variant="secondary"
                  className="rounded-full"
                  onClick={() => searchJobHandler(category.value)}
                >
                  {category.value}
                </Button>
              </CarouselItem>
            </div>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Categories;
