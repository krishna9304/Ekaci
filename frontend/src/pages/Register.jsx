import React, { useEffect, useState } from "react";
import Image from "../assets/register.png";
import Logo from "../assets/logo_white_2.png";
import { useDispatch, useSelector } from "react-redux";
import { setUser, signUpUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userType, setUserType] = useState("");
  const [password, setPassword] = useState("");
  const [metamask_address, setMetamask_address] = useState("");
  const user = useSelector((state) => state.authReducer.user);
  const [style, setStyle] = useState({
    backgroundColor: "#38BDF8",
    borderRadius: "6px",
    padding: "6px",
    marginBottom: "10px",
    color: "white",
  });
  const [text, setText] = useState("Connect with Metamask");

  const dispatch = useDispatch();

  const registerHandle = async (e) => {
    e.preventDefault();
    dispatch(
      setUser(
        await signUpUser({ email, phone, userType, password, metamask_address })
      )
    );

    const urls = {
      farmer: "/farmer_register",
      insurance: "/insurance_register",
      government: "/government_register",
    };

    if (urls[userType]) navigate(urls[userType]);
    return false;
  };

  const handleConnect = async (e) => {
    e.preventDefault();
    if (window.ethereum) {
      const res = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setText("Connected to Metamask");
      setStyle({
        backgroundColor: "green",
        borderRadius: "6px",
        padding: "6px",
        marginBottom: "10px",
        color: "white",
      });
      setMetamask_address(res[0]);
    } else {
      console.log("Please Install Metamask Extension");
    }
  };

  useEffect(() => {
    if (user && user.metadata) {
      if (user.userType == "farmer") navigate("/farmer_dashboard");
      if (user.userType == "company") navigate("/insurance_dashboard");
    }
    if (user && !user.metadata) {
      if (user.userType == "farmer") navigate("/farmer_register");
      if (user.userType == "company") navigate("/insurance_register");
    }
    return () => {};
  }, [user]);

  return (
    <div className=" flex flex-row h-screen">
      <div className="flex flex-col w-1/3 p-5 gap-20 my-10">
        <img src={Logo} alt="logo" className="w-52 m-0" />
        <div>
          <div className="mx-10 mb-10">
            <h2 className="text-4xl">Welcome,</h2>
            <h4 className="text-base leading-7">
              please fill in your details below to register.
            </h4>
          </div>

          <form className="flex flex-col mx-10" onSubmit={registerHandle}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" outline-lime-700 outline-2 p-2 border-b-2 mb-5 border-green-700 "
            />
            <input
              type="text"
              placeholder="Contact No."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className=" outline-lime-700 outline-2 p-2 border-b-2 mb-5 border-green-700 "
            />
            <select
              id="usertype"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="outline-lime-700 outline-2 p-2 border-b-2 mb-5 border-green-700  text-gray-400"
            >
              <option value="user">Select User</option>
              <option value="farmer">Farmer</option>
              <option value="insurance">Insurance</option>
              <option value="government">Government</option>
            </select>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" outline-lime-700  p-2 border-b-2 mb-10  border-green-700  "
            />
            <button onClick={handleConnect} style={style}>
              {text}
            </button>
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

export default Register;
