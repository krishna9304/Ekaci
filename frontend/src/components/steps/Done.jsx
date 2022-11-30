import React, { useContext } from "react";
import { StepperContext } from "../../contexts/StepperContext";

const Done = () => {
  const { userData, setUserData } = useContext(StepperContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-white p-2 bg-green-600 rounded-full px-3 mb-10 font-bold text-xl">
        {" "}
        &#10003;
      </h1>
      <h1 className="text-center text-2xl">Successfully Submitted</h1>
      <button className="border border-green-600 p-2 rounded-xl w-1/4 mt-5">
        Go to the Dashboard
      </button>
    </div>
  );
};

export default Done;
