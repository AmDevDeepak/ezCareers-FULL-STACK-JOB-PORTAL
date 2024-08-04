import { useEffect, useState } from "react";
import { filterData } from "../utils/constants";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchedQueryHeroSection } from "@/redux/jobSlice";

const FilterCard = () => {
  const dispatch = useDispatch();
  const [selectedFilter, setSelectedFilter] = useState("");
  const handleFilterChange = (value) => {
    setSelectedFilter(value);
  };
  useEffect(() => {
    dispatch(setSearchedQueryHeroSection(selectedFilter));
  }, [selectedFilter]);
  return (
    <div className="w-full rounded-md border border-x-gray-300 px-5 py-4">
      <h1 className="text-3xl font-semibold mb-4">Filter Jobs</h1>

      <RadioGroup onValueChange={handleFilterChange} value={selectedFilter}>
        {filterData.map((data, i) => (
          <div key={i}>
            <h1 className="font-medium text-lg">{data.filterType}</h1>
            {data.list.map((item, idx) => {
              const randomId = `D${i} - ${idx}`;
              return (
                <div key={idx} className="flex items-center space-x-2 my-2">
                  <RadioGroupItem id={randomId} value={item} />
                  <Label htmlFor={randomId} className="text-slate-600">
                    {item}
                  </Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
