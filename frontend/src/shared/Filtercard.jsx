import { Button } from "@/components/ui/button";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { setfiltercards } from "@/redux/jobslice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";


function FilterCard() {
  const [filtervalues, setfiltervalue] = useState(["", "", ""]);
  const dispatch = useDispatch();

  const changehandler = (it, value) => {
    if (value === "Location") {
      setfiltervalue((prevarray) =>
        prevarray?.map((item, i) => (i == 0 ? it : item))
      );
    } else if (value === "Industry") {
      setfiltervalue((prevarray) =>
        prevarray?.map((item, i) => (i == 1 ? it : item))
      );
    } else {
      setfiltervalue((prevarray) =>
        prevarray?.map((item, i) => (i == 2 ? it : item))
      );
    }
  };

  useEffect(() => {
    dispatch(setfiltercards(filtervalues));
  }, [filtervalues]);

  const data = [
    {
      filtertype: "Location",
      array: ["Dehli NCR", "Noida", "USA", "Banglore", "Chennai"],
    },
    {
      filtertype: "Industry",
      array: [
        "Frontend Developer",
        "Backend Developer",
        "Graphic Designer",
        "Vedio Editor",
      ],
    },
    {
      filtertype: "Salary",
      array: ["Upto 10 LPA", "Upto 25 LPA", "Upto 40 LPA"],
    },
  ];



  
  
  return (
    <div className="w-full bg-white pt-1 pr-5">
      <h1 className="font-bold text-xl">Filter Jobs</h1>
      <hr className="mt-3" />

      {data.map((item, ind) => (
        <div key={ind}>
          <h1 className="font-bold mt-2">{item.filtertype}</h1>

          {item.array.map((it, index) => (
            <div className="" key={index}>
              <span className="flex items-center gap-2">
                <input
                  onClick={() => {
                    changehandler(it, item.filtertype);
                  }}
                  type="radio"
                  name={item.filtertype}
                  
                  className="cursor-pointer "
                />
                <label>{it}</label>
              </span>
            </div>
          ))}
        </div>
      ))}
      <button onClick={()=>{
        window.location.reload();
      }} className="bg-[#6A38C2] hover:bg-black p-2 rounded-lg my-4 text-white font-bold">Remove all Filters</button>
    </div>
  );
}

export default FilterCard;
