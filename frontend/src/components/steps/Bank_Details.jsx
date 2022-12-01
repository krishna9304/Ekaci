import React, { useContext } from "react";
import { StepperContext } from "../../contexts/StepperContext";

const Bank_Details = () => {
  const { partData, setPartData } = useContext(StepperContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPartData({ ...partData, [name]: value });
  };
  return (
    <div className="flex flex-col">
      {/* Customer Name */}
      <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
        Customer Name
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
        <input
          onChange={handleChange}
          value={partData["customer_name"] || ""}
          name="customer_name"
          placeholder="Customer Name"
          type="text"
          className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
        />
      </div>

      {/* Branch Name */}
      <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
        Branch Name
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
        <input
          onChange={handleChange}
          value={partData["branch_name"] || ""}
          name="branch_name"
          placeholder="Branch Name"
          type="text"
          className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
        />
      </div>

      {/* Branch Address */}
      <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
        Branch Address
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
        <input
          onChange={handleChange}
          value={partData["branch_address"] || ""}
          name="branch_address"
          placeholder="Branch Address"
          type="text"
          className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
        />
      </div>

      {/* IFSC Code */}
      <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
        IFSC Code
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
        <input
          onChange={handleChange}
          value={partData["ifsc_code"] || ""}
          name="ifsc_code"
          placeholder="IFSC Code"
          type="text"
          className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
        />
      </div>

      {/* Account No */}
      <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
        Account No
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
        <input
          onChange={handleChange}
          value={partData["acc_no"] || ""}
          name="acc_no"
          placeholder="Account Number"
          type="text"
          className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
        />
      </div>
    </div>
  );
};

export default Bank_Details;
