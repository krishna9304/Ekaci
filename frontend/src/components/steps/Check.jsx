import React, { useContext } from "react";
import { StepperContext } from "../../contexts/StepperContext";

const Check = () => {
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
      <h1 className="text-center text-2xl">
        Are you Sure you want too submit?
      </h1>
    </div>
  );
};

export default Check;
