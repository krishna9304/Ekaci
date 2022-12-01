import React, { useEffect, useState } from "react";
import Stepper from "../components/Stepper";
import StepperControl from "../components/StepperControl";
import { StepperContext } from "../contexts/StepperContext";
import Done from "../components/steps/Done";

import Background from "../assets/background_register.jpg";
import Crop_Details from "../components/steps/Crop_Details";
import Claim_Info from "../components/steps/Claim_info";
import Claim_Images from "../components/steps/Claim_Images";

export const cropImages = {
  img1: "",
  img2: "",
  img3: "",
  img4: "",
  img5: "",
};

export const cropDetails = {
  crop_type: "",
  crop_name: "",
  irrigation_methods: "",
  season: "",
};

const initialClaimData = {
  loss_percent: "",
  loss_type: "",
  date_of_loss: "",
  crop_details: cropDetails,
  crop_images: cropImages,
};

const Insurance_Claim = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState(initialClaimData);
  const [partData, setPartData] = useState({});

  const steps = ["Claim Info", "Claim Images", "Crop Details", "Done"];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Claim_Info />;
      case 2:
        return <Claim_Images />;
      case 3:
        return <Crop_Details />;
      case 4:
        return <Done />;
      default:
    }
  };

  const stepStr = (step) => {
    switch (step) {
      case 3:
        return "crop_details";
      case 2:
        return "crop_images";
      default:
        return "";
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;

    direction === "next" ? newStep++ : newStep--;
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
    setUserData({ ...userData, [stepStr(currentStep)]: partData });
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
        <h1 className="text-3xl font-bold  m-10 pt-10">Claim Your Insurance</h1>
        <div className="container horizontal mt-10 px-10">
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

export default Insurance_Claim;
