import React, { useEffect, useState } from "react";
import Stepper from "../components/Stepper";
import StepperControl from "../components/StepperControl";
import { StepperContext } from "../contexts/StepperContext";
import Done from "../components/steps/Done";
import { useCookies } from "react-cookie";

import Background from "../assets/background_register.jpg";
import Information from "../components/steps/Information";
import Check from "../components/steps/Check";
import axios from "axios";
import config from "../config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Insurance_Registeration = () => {
  const initialInsuranceData = {
    company_name: "",
    address: "",
    documents: "",
    admin_emp_id: "",
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState(initialInsuranceData);
  const [partData, setPartData] = useState({});
  const user = useSelector((state) => state.authReducer.user);

  const navigate = useNavigate();

  const steps = ["Information", "Check", "Done"];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Information />;
      case 2:
        return <Check />;
      case 3:
        return <Done />;
      default:
    }
  };

  const [cookies] = useCookies(["jwt"]);

  const registerCompany = async () => {
    if (document.cookie) {
      const token = cookies?.jwt;
      if (token) {
        try {
          const res = await axios.post(
            `${config.baseURL}/company/register`,
            userData,
            { headers: { "x-access-token": token } }
          );
          console.log(res);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;

    direction === "next" ? newStep++ : newStep--;
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);

    setUserData({ ...userData, [displayStep(currentStep)]: partData });
    setPartData({});

    if (currentStep == 2) {
      registerCompany();
    }
  };

  useEffect(() => {
    if (user && !user.metadata) {
      if (user.userType == "farmer") navigate("/farmer_register");
      if (user.userType == "company") navigate("/insurance_register");
    }
    if (user && user.metadata) {
      if (user.userType == "farmer") navigate("/farmer_dashboard");
      if (user.userType == "company") navigate("/insurance_dashboard");
    }
    return () => {};
  }, [user]);

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
