import React, { useState } from "react";
import Image from "../assets/register.png";
import Logo from "../assets/logo_white_2.png";
import { useDispatch } from "react-redux";
import { signUpUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [type, setType] = useState("");
  const [password, setPassword] = useState("");
  const [metaMaskID, setMetaMaskID] = useState("");
  const [style, setStyle] = useState({
    backgroundColor: "#38BDF8",
    borderRadius: "6px",
    padding: "6px",
    marginBottom: "10px",
    color: "white",
  });
  const [text, setText] = useState("Connect with Metamask");

  const dispatch = useDispatch();

  const registerHandle = (e) => {
    e.preventDefault();
    dispatch(signUpUser({ email, contact, type, password }));
    console.log({ email, contact, type, password, metaMaskID });

    const urls = {
      farmer: "/farmer_register",
      insurance: "/insurance_register",
      government: "/government_register",
    };

    if (urls[type]) navigate(urls[type]);
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
      setMetaMaskID(res[0]);
    } else {
      console.log("Please Install Metamask Extension");
    }
  };

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
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className=" outline-lime-700 outline-2 p-2 border-b-2 mb-5 border-green-700 "
            />
            <select
              id="usertype"
              value={type}
              onChange={(e) => setType(e.target.value)}
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
