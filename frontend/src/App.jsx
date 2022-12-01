import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Farmer_Register from "./pages/Farmer_Register";
import Insurance_Registeration from "./pages/Insurance_Registeration";
import Government_Registeration from "./pages/Government_Register";
import Insurance_Claim from "./pages/Insurance_Claim";
import axios from "axios";
import config from "./config";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/authSlice";

function App() {
  const [cookies] = useCookies(["jwt"]);
  let dispatch = useDispatch();
  const globalState = useSelector((state) => state);
  let authUser = async () => {
    if (document.cookie) {
      let token;
      token = cookies.jwt;
      if (token) {
        const res = await axios.get(`${config.baseURL}/self`, {
          headers: { "x-access-token": token },
        });
        const user = res.data.user;
        dispatch(setUser(user));
        document.cookie = "jwt=" + res.data.token;
      }
    }
  };

  useEffect(() => {
    authUser();
    return () => {};
  }, []);

  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/farmer_register" element={<Farmer_Register />} />
        <Route
          path="/insurance_register"
          element={<Insurance_Registeration />}
        />
        <Route
          path="/government_register"
          element={<Government_Registeration />}
        />
        <Route path="/insurance_claim" element={<Insurance_Claim />} />
      </Routes>
    </>
  );
}

export default App;
