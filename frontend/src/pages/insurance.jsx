import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../config";
import { useCookies } from "react-cookie";
import Background from "../assets/background_register.jpg";

export const Insurance = () => {
  const params = useParams();
  const [cookies] = useCookies(["jwt"]);
  const [insurance, setInsurance] = useState(null);

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
      {insurance && (
        <div className="md:w-4/5 shadow-2xl rounded-2xl pb-2 bg-white mx-auto items-center -translate-y-40">
          <h1 className="text-3xl font-bold  m-10 pt-10">{insurance.name}</h1>
          <div className="container horizontal flex flex-wrap mt-10 px-10">
            <div className="my-10 p-10"></div>
          </div>
        </div>
      )}
    </div>
  );
};
