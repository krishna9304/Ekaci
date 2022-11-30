import React, { useContext } from "react";
import { StepperContext } from "../../contexts/StepperContext";

const Plot_Desc = () => {
  const { partData, setPartData } = useContext(StepperContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPartData({ ...partData, [name]: value });
  };
  return (
    <div className="flex flex-col">
      {/* Plot No */}
      <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
        Plot No
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
        <input
          onChange={handleChange}
          value={partData["plot_no"] || ""}
          name="plot_no"
          placeholder="Plot No"
          type="text"
          className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
        />
      </div>

      {/* Plot area */}
      <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
        Plot Area
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
        <input
          onChange={handleChange}
          value={partData["plot_area"] || ""}
          name="plot_area"
          placeholder="Plot Area"
          type="text"
          className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
        />
      </div>

      {/* Tehsil No */}
      <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
        Tehsil No
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
        <input
          onChange={handleChange}
          value={partData["tehsil_no"] || ""}
          name="tehsil_no"
          placeholder="Tehsil No"
          type="text"
          className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
        />
      </div>

      {/* Plot image */}
      <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
        Plot Image
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
        <input
          onChange={handleChange}
          value={partData["plot_image"] || ""}
          name="plot_image"
          placeholder="Plot Image"
          type="text"
          className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
        />
      </div>
    </div>
  );
};

export default Plot_Desc;
