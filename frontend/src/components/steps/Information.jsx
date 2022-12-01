import React, { useContext } from "react";
import { StepperContext } from "../../contexts/StepperContext";

const Information = () => {
  const { userData, setUserData } = useContext(StepperContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  return (
    <div className="flex flex-col">
      {/* Company Name */}
      <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
        Company Name
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
        <input
          onChange={handleChange}
          value={userData["company_name"] || ""}
          name="company_name"
          placeholder="company_name"
          type="text"
          className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
        />
      </div>

      {/* Address */}
      <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
        Address
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
        <input
          onChange={handleChange}
          value={userData["address"] || ""}
          name="address"
          placeholder="Address"
          type="text"
          className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
        />
      </div>

      {/* Documents */}
      <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
        Documents
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
        <input
          onChange={handleChange}
          value={userData["documents"] || ""}
          name="documents"
          placeholder="Documents"
          type="text"
          className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
        />
      </div>

      {/* Admin ID */}
      <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
        Admin Employee ID
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
        <input
          onChange={handleChange}
          value={userData["admin_emp_id"] || ""}
          name="admin_emp_id"
          placeholder="Admin Employee ID"
          type="text"
          className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
        />
      </div>
    </div>
  );
};

export default Information;
