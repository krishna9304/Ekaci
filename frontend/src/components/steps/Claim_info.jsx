import React, { useContext } from "react";
import { StepperContext } from "../../contexts/StepperContext";

const Claim_Info = () => {
  const { partData, setPartData } = useContext(StepperContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPartData({ ...partData, [name]: value });
  };
  return (
    <div className="flex flex-col">
      {/* Insurance_id */}
      {/* <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
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
      </div> */}
      {/* drop down auto fill all farmer's insurances */}
      {/* loss_percent */}
      <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
        Loss Percentage
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
        <input
          onChange={handleChange}
          value={partData["loss_percent"] || ""}
          name="loss_percent"
          placeholder="Loss Percentage"
          type="text"
          className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
        />
      </div>
      {/* loss type */}
      <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
        Loss Type
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
        <input
          onChange={handleChange}
          value={partData["loss_type"] || ""}
          name="loss_type"
          placeholder="Loss Type"
          type="text"
          className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
        />
      </div>
      {/* date of loss */}
      <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
        Date of Loss
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
        <input
          onChange={handleChange}
          value={partData["date_of_loss"] || ""}
          name="date_of_loss"
          placeholder="Date of Loss"
          type="date"
          className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
        />
      </div>
    </div>
  );
};

export default Claim_Info;
