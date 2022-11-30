import React, { useState } from "react";
import Logo from "../assets/logo_white_2.png";
import Image from "../assets/register.png";
import { signInUser } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(phone, password);
    const data = useSelector(dispatch(signInUser({ phone, password })));
    console.log(data.farmer_ref);
  };

  return (
    <div className=" flex flex-row h-screen">
      <div className="flex flex-col w-1/3 p-5 gap-20 my-10">
        <img src={Logo} alt="logo" className="w-52 m-0" />
        <div>
          <div className="mx-10 mb-10">
            <h2 className="text-4xl">Welcome,</h2>
            <h4 className="text-base leading-7">
              please fill in your details below to login.
            </h4>
          </div>

          <form className="flex flex-col mx-10" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Contact No."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className=" outline-lime-700 outline-2 p-2 border-b-2 mb-5 border-green-700 "
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" outline-lime-700  p-2 border-b-2 mb-10  border-green-700  "
            />

            <button className="bg-green-900 p-2 w-full mx-auto rounded-lg text-white">
              Submit
            </button>
          </form>
        </div>
      </div>

      <div>
        <img src={Image} alt="login-img" className="h-screen w-100" />
      </div>
    </div>
  );
};

export default Login;
