import React, { useEffect, useState } from "react";
import Stepper from "../components/Stepper";
import StepperControl from "../components/StepperControl";
import { StepperContext } from "../contexts/StepperContext";
import Done from "../components/steps/Done";

import Background from "../assets/background_register.jpg";
import Information from "../components/steps/Information";

const Insurance_Registeration = () => {
  const initialInsuranceData = {
    company_name: "",
    address: "",
    is_verified: "",
    documents: "",
    admin_emp_id: "",
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState(initialInsuranceData);
  const [partData, setPartData] = useState({});

  const steps = ["Information", "Done"];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Information />;
      case 2:
        return <Done />;
      default:
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;

    direction === "next" ? newStep++ : newStep--;
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
    setUserData({ ...userData, [displayStep(currentStep)]: partData });
  };

  useEffect(() => {
    console.log(userData);

    return () => {};
  }, [userData]);

  return (
    <div>
      <div className="">
        <img className=" h-96 w-full " src={Background} alt="background" />
      </div>
      <div className="md:w-4/5 shadow-2xl rounded-2xl pb-2 bg-white mx-auto items-center -translate-y-40">
        <h1 className="text-3xl font-bold  m-10 pt-10">
          Insurance Company Registration
        </h1>
        <div className="container horizontal mt-10">
          <Stepper steps={steps} currentStep={currentStep} />
          <div className="my-10 p-10">
            <StepperContext.Provider
              value={{ userData, setUserData, partData, setPartData }}
            >
              {displayStep(currentStep)}
            </StepperContext.Provider>
          </div>
        </div>
        {currentStep !== steps.length && (
          <StepperControl
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
          />
        )}
      </div>
    </div>
  );
};

export default Insurance_Registeration;
