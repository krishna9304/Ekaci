import React, { useEffect, useState } from "react";
import Stepper from "../components/Stepper";
import StepperControl from "../components/StepperControl";
import { StepperContext } from "../contexts/StepperContext";
import Done from "../components/steps/Done";

import Background from "../assets/background_register.jpg";
import Crop_Details from "../components/steps/Crop_Details";
import Claim_Info from "../components/steps/Claim_info";
import Claim_Images from "../components/steps/Claim_Images";
import { useCookies } from "react-cookie";
import config from "../config";
import axios from "axios";
import Check from "../components/steps/Check";
import { useSelector } from "react-redux";
import insuranceClaimContract from "../blockchain/interaction";
import Web3 from "web3";
import { toast } from "react-toastify";

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
  insurance_id: null,
  loss_type: null,
  date_of_loss: null,
  crop_details: null,
  site_images: null,
};

const Insurance_Claim = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState(initialClaimData);
  const [partData, setPartData] = useState({});
  const [cookies] = useCookies(["jwt"]);
  const user = useSelector((state) => state.authReducer.user);

  const steps = ["Claim Info", "Claim Images", "Crop Details", "Check", "Done"];

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Claim_Info />;
      case 2:
        return <Claim_Images />;
      case 3:
        return <Crop_Details />;
      case 4:
        return <Check />;
      case 5:
        return <Done />;
      default:
    }
  };

  const fetchLossPercent = async () => {
    try {
      setTimeout(() => {
        return "89";
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLossPercent();

    return () => {};
  }, []);

  const stepStr = (step) => {
    switch (step) {
      case 3:
        return "crop_details";
      case 2:
        return "site_images";
    }
  };

  const claimObjTranslation = (claim) => {
    let boolArr = [true, false, false, false, false, false, false];

    let cropDetailsArray = [
      claim.crop_details.crop_type,
      claim.crop_details.crop_name,
      claim.crop_details.irrigation_method,
      claim.crop_details.season,
    ];

    let arr = [
      claim.insurance_id,
      claim.claimant_id,
      claim.payments,
      boolArr,
      cropDetailsArray,
      claim.site_images,
      claim.is_active,
      claim.loss_percent,
      claim.loss_type,
      claim.date_of_loss,
      claim.created_on,
      claim.updated_on,
    ];

    return arr;
  };

  const setClaimFunc = async (icContract, arr, address) => {
    try {
      const data = await icContract.methods
        .setClaim(arr)
        .send({ from: address });
      toast("Claim Payload stored in blockchain.", { type: "success" });
    } catch (err) {
      console.log("Error-> ", err);
    }
  };

  const storeClaimBlockchain = async (claim) => {
    if (window.ethereum) {
      const address = user.metamask_address;
      const web3Obj = new Web3(window.ethereum);
      const ic = insuranceClaimContract(web3Obj);
      const arr = claimObjTranslation(claim);
      console.log(arr);
      await setClaimFunc(ic, arr, address);
    } else {
      toast("Install metamask", { type: "error" });
    }
  };

  const handleClaimRequest = async () => {
    if (document.cookie) {
      try {
        const res = await axios.post(
          `${config.baseURL}/farmer/claim/create`,
          {
            ...userData,
            loss_percent: "89",
            payments: "1/12",
            site_images: [""],
          },
          { headers: { "x-access-token": cookies.jwt } }
        );
        storeClaimBlockchain(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleClick = (direction) => {
    let newStep = currentStep;

    direction === "next" ? newStep++ : newStep--;
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);

    setUserData({ ...userData, [stepStr(currentStep)]: partData });
    setPartData({});
    if (currentStep == 4) {
      handleClaimRequest();
    }
  };

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
