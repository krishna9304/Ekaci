import React, { useContext } from "react";
import { StepperContext } from "../../contexts/StepperContext";

const Account = () => {
  const { userData, setUserData } = useContext(StepperContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  return (
    <div className="flex flex-col">
      {/* Farmer ID */}
      <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
        Farmer ID
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
        <input
          onChange={handleChange}
          value={userData["farmer_id"] || ""}
          name="farmer_id"
          placeholder="FarmerID"
          type="text"
          className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
        />
      </div>

      {/* First Name */}
      <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
        First Name
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
        <input
          onChange={handleChange}
          value={userData["first_name"] || ""}
          name="first_name"
          placeholder="First Name"
          type="text"
          className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
        />
      </div>

      {/* Middle Name */}
      <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
        Middle Name
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
        <input
          onChange={handleChange}
          value={userData["middle_name"] || ""}
          name="middle_name"
          placeholder="Middle Name"
          type="text"
          className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
        />
      </div>

      {/* Last Name */}
      <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
        Last Name
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
        <input
          onChange={handleChange}
          value={userData["last_name"] || ""}
          name="last_name"
          placeholder="Last Name"
          type="text"
          className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
        />
      </div>

      {/* Post Office */}
      <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
        Post Office
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
        <input
          onChange={handleChange}
          value={userData["post_office"] || ""}
          name="post_office"
          placeholder="Post Office"
          type="text"
          className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
        />
      </div>

      {/* Police Station */}
      <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
        Police Station
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
        <input
          onChange={handleChange}
          value={userData["police_station"] || ""}
          name="police_station"
          placeholder="Police Station"
          type="text"
          className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
        />
      </div>

      {/* District */}
      <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
        District
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
        <input
          onChange={handleChange}
          value={userData["district"] || ""}
          name="district"
          placeholder="District"
          type="text"
          className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
        />
      </div>

      {/* PinCode */}
      <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
        Pincode
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
        <input
          onChange={handleChange}
          value={userData["pincode"] || ""}
          name="pincode"
          placeholder="Pin Code"
          type="text"
          className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
        />
      </div>

      {/* State */}
      <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
        State
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
        <input
          onChange={handleChange}
          value={userData["state"] || ""}
          name="state"
          placeholder="State"
          type="text"
          className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
        />
      </div>

      {/* Farmer Type */}
      <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
        Farmer type
      </div>
      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
        <select
          id="farmer_type"
          name="farmer_type"
          value={userData["farmer_type"] || ""}
          onChange={handleChange}
          className="p-1 px-2  outline-none w-full text-gray-800"
        >
          <option value="user">Farmer Type</option>
          <option value="small">Small</option>
          <option value="marginal">Marginal</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Farmer Category */}
      <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
        Farmer Category
      </div>

      <div className="bg-white my-2 p-1 flex border border-gray-200 rounded ">
        <select
          id="farmer_category"
          name="farmer_category"
          value={userData["farmer_category"] || ""}
          onChange={handleChange}
          className="p-1 px-2  outline-none w-full text-gray-800"
        >
          <option value="user">Farmer Category</option>
          <option value="farmer">Owner</option>
          <option value="insurance">Tenant</option>
          <option value="government">Shared cropping</option>
        </select>
      </div>
    </div>
  );
};

export default Account;
