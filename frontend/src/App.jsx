import "./App.css";
import { useEffect } from "react";
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
import { useDispatch } from "react-redux";
import { setUser } from "./redux/authSlice";
import Create_Insurance from "./pages/Create_Insurance";

function App() {
  const [cookies] = useCookies(["jwt"]);
  let dispatch = useDispatch();
  let authUser = async () => {
    if (document.cookie) {
      let token;
      token = cookies.jwt;
      if (token) {
        try {
          const res = await axios.get(`${config.baseURL}/user/self`, {
            headers: { "x-access-token": token },
          });
          const user = res.data.user;
          dispatch(setUser(user));
          document.cookie = "jwt=" + res.data.token;
        } catch (error) {
          console.log(error);
        }
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
        <Route path="/create_insurance" element={<Create_Insurance />} />
      </Routes>
    </>
  );
}

export default App;
