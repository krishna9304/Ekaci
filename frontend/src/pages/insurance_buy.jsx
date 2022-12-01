import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../config";
import { useCookies } from "react-cookie";
import Background from "../assets/background_register.jpg";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export const Insurance_buy = () => {
  const params = useParams();
  const [cookies] = useCookies(["jwt"]);
  const [insurance, setInsurance] = useState(null);
  const user = useSelector((state) => state.authReducer.user);

  const fetchInsurance = async () => {
    if (document.cookie) {
      try {
        const res = await axios.get(
          `${config.baseURL}/farmer/insurance/${params.insurance_id}`,
          { headers: { "x-access-token": cookies.jwt } }
        );
        setInsurance(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleInsuranceBuy = async () => {
    if (document.cookie) {
      try {
        await axios.post(
          `${config.baseURL}/farmer/insurance/buy`,
          {
            insurance_id: insurance._id,
            farmer_id: user.metamask_address,
          },
          { headers: { "x-access-token": cookies.jwt } }
        );
        toast("You have successfully subscribed to this insurance plan.", {
          type: "success",
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (params.insurance_id) {
      fetchInsurance();
    }

    return () => {};
  }, []);
  return (
    <div>
      <div className="">
        <img className=" h-96 w-full " src={Background} alt="background" />
      </div>
      <div className="md:w-4/5 shadow-2xl rounded-2xl pb-2 bg-white mx-auto items-center -translate-y-40">
        <h1 className="text-3xl font-bold  m-10 pt-10">Proceed to buy</h1>
        {insurance && (
          <div className="container horizontal mt-2 px-10">
            <div className="shadow-md p-5 m-5 flex flex-col justify-center items-center space-y-3">
              <div className="font-bold text-2xl">
                Insurance name: {insurance.name}
              </div>
              <a
                className="text-blue-500 underline font-bold"
                href={insurance.content}
                target="blank"
              >
                Download detailed PDF
              </a>
              <div>Insurance Identifier: {insurance._id}</div>
              <div>Tenure: {insurance.tenure} months</div>
              <div>Premium: {insurance.premium} rupees/month</div>
              <div>Total amount: {insurance.total_amount} rupees</div>
            </div>
            <div className="w-full flex justify-center items-center">
              <button
                onClick={handleInsuranceBuy}
                className="px-3 py-1 bg-black rounded-md text-white border border-black hover:bg-white hover:text-black"
              >
                Buy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
