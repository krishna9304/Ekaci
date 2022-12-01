import axios from "axios";
import React, { useEffect, useState } from "react";

import Background from "../assets/background_register.jpg";
import { useCookies } from "react-cookie";
import config from "../config";
import { Link } from "react-router-dom";

const Insurance_Purchase = () => {
  const [insurances, setInsurances] = useState([]);
  const [cookies] = useCookies(["jwt"]);
  const getAllInsurances = async () => {
    if (document.cookie) {
      let token;
      token = cookies.jwt;
      if (token) {
        try {
          const res = await axios.post(
            `${config.baseURL}/farmer/insurance/get`,
            {},
            {
              headers: { "x-access-token": token },
            }
          );
          setInsurances(res.data);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  useEffect(() => {
    getAllInsurances();
    return () => {};
  }, []);

  return (
    <div>
      <div className="">
        <img className=" h-96 w-full " src={Background} alt="background" />
      </div>
      <div className="md:w-4/5 shadow-2xl rounded-2xl pb-2 bg-white mx-auto items-center -translate-y-40">
        <h1 className="text-3xl font-bold  m-10 pt-10">
          Choose an insurance plan
        </h1>
        <div className="container horizontal flex flex-wrap mt-10 px-10">
          <div className="my-10 p-10">
            {insurances.map((insurance, idx) => {
              return (
                <div
                  key={idx}
                  className="shadow-md bg-gray-200 p-5 m-5 flex flex-col justify-center items-center space-y-3"
                >
                  <div className="font-bold text-2xl">{insurance.name}</div>
                  <a
                    className="text-blue-500 underline font-bold"
                    href={insurance.content}
                    target="blank"
                  >
                    View detailed information
                  </a>
                  <div>Tenure: {insurance.tenure} months</div>
                  <div>Premium: {insurance.premium} rupees/month</div>
                  <div>Total amount: {insurance.total_amount} rupees</div>
                  <Link to={`/insurance/buy/${insurance._id}`}>
                    <button className="px-3 py-1 bg-black rounded-md text-white border border-black hover:bg-white hover:text-black">
                      Buy this plan
                    </button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insurance_Purchase;
