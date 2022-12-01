import React, { useContext } from "react";
import { StepperContext } from "../../contexts/StepperContext";

const Crop_Details = () => {
  const { partData, setPartData } = useContext(StepperContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPartData({ ...partData, [name]: value });
  };
  return (
    <div className="flex flex-col">
      {/* Crop Type */}
      <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
        Crop Type
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
        <input
          onChange={handleChange}
          value={partData["crop_type"] || ""}
          name="crop_type"
          placeholder="Crop Type"
          type="text"
          className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
        />
      </div>

      {/* Crop Name */}
      <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
        Crop Name
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
        <input
          onChange={handleChange}
          value={partData["crop_name"] || ""}
          name="crop_name"
          placeholder="Crop Name"
          type="text"
          className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
        />
      </div>

      {/* Irrigation Methods */}
      <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
        Irrigation Method
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
        <input
          onChange={handleChange}
          value={partData["irrigation_method"] || ""}
          name="irrigation_method"
          placeholder="Irrigation Method"
          type="text"
          className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
        />
      </div>

      {/* Season */}
      <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
        Season
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
        <input
          onChange={handleChange}
          value={partData["season"] || ""}
          name="season"
          placeholder="Season"
          type="text"
          className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
        />
      </div>
    </div>
  );
};

export default Crop_Details;
