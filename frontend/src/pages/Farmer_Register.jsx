import React, { useEffect, useState } from "react";
import Stepper from "../components/Stepper";
import StepperControl from "../components/StepperControl";
import Account from "../components/steps/Account";
import Test from "../components/steps/Plot_Desc";
import { StepperContext } from "../contexts/StepperContext";
import Crop_Details from "../components/steps/Crop_Details";
import Bank_Details from "../components/steps/Bank_Details";
import Plot_Desc from "../components/steps/Plot_Desc";
import Done from "../components/steps/Done";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";

import Background from "../assets/background_register.jpg";

export const plotDescription = {
  plot_no: "",
  plot_area: "",
  tehsil_no: "",
  plot_image: "",
};

export const bankDetails = {
  customer_name: "",
  branch_name: "",
  branch_address: "",
  ifsc_code: "",
  acc_no: "",
};

export const cropDetails = {
  crop_type: "",
  crop_name: "",
  irrigation_methods: "",
  season: "",
};

const initialUserData = {
  farmer_id: "",
  avatar: "",
  first_name: "",
  middle_name: "",
  post_office: "",
  police_station: "",
  district: "",
  pincode: "",
  state: "",
  landmark: "",
  plot_desc: plotDescription,
  farmer_type: "",
  farmer_category: "",
  bank_details: bankDetails,
  crop_details: cropDetails,
};

const Farmer_Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState(initialUserData);
  const [partData, setPartData] = useState({});

  const steps = [
    "Account information",
    "Plot Description",
    "Crop Details",
    "Bank Details",
    "Done",
  ];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Account />;
      case 2:
        return <Plot_Desc />;
      case 3:
        return <Crop_Details />;
      case 4:
        return <Bank_Details />;
      case 5:
        return <Done />;
      default:
    }
  };

  const stepStr = (step) => {
    switch (step) {
      case 2:
        return "plot_desc";
      case 3:
        return "crop_details";
      case 4:
        return "bank_details";
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
    //const [cookies] = useCookies(["jwt"]);
    //let token = cookies.jwt;
    console.log(userData);
    //registerData(token);
    return () => {};
  }, [userData]);

  // const registerData = async (token) => {
  //   const res = await axios.post(`${config.baseURL}/register`, {
  //     headers: { "x-access-token": token },
  //   });
  //   console.log(res);
  // };

  return (
    <div>
      <div className="">
        <img className=" h-96 w-full " src={Background} alt="background" />
      </div>
      <div className="md:w-4/5 shadow-2xl rounded-2xl pb-2 bg-white mx-auto items-center -translate-y-40">
        <h1 className="text-3xl font-bold  m-10 pt-10">Farmer Registration</h1>
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

export default Farmer_Register;
