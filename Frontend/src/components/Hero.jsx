import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQueryHeroSection } from "@/redux/jobSlice";

const Hero = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const searchJobHandler = () => {
    dispatch(setSearchedQueryHeroSection(query));
    navigate("/explore");
  };

  return (
    <div className="text-center w-full">
      <div className="headings mx-auto w-[65%]">
        <h1 className="text-[2.5rem] font-bold mt-5 leading-none">
          Find Your <span className="text-[#f83002]">Dream</span> Job with
          Indian leading Job Portal.
        </h1>
        <h3 className="text-[1.7rem] text-zinc-700 font-[400] mt-2 mx-auto tracking-tight">
          Best Job opportunities in India. Search, apply, and get hired with
          ease.
        </h3>
      </div>
      <div className="w-[60%] mx-auto mt-8 flex items-center justify-center">
        <input
          onChange={(e) => setQuery(e.target.value)}
          type="search"
          placeholder="Search for jobs..."
          className="shadow-md bg-primary-foreground w-1/2 text-primary px-4 py-4 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <Button
          className="rounded-md ml-2 py-7 mt-1"
          onClick={searchJobHandler}
        >
          <Search />
        </Button>
      </div>
    </div>
  );
};

export default Hero;
