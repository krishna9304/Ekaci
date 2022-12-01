import "./App.css";
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
import Create_Insurance from "./pages/Create_Insurance";
import Farmer_Dashboard from "./pages/Farmer_Dashboard";
import State_Dashboard from "./pages/State_Dashboard";
import Insurance_Dashboard from "./pages/Insurance_Dashboard";
import Insurance_Purchase from "./pages/Insurance_Purchase";
import { Insurance_buy } from "./pages/insurance_buy";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [cookies] = useCookies(["jwt"]);
  const user = useSelector((state) => state.authReducer.user);
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
          user.metadata = res.data.metadata;
          dispatch(setUser(user));
          document.cookie = "jwt=" + res.data.token;
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  useEffect(() => {
    if (!user) authUser();
    return () => {};
  }, [user]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Register />} />
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
        <Route path="/farmer_dashboard" element={<Farmer_Dashboard />} />
        <Route path="/government_dashboard" element={<State_Dashboard />} />
        <Route path="/insurance_dashboard" element={<Insurance_Dashboard />} />
        <Route path="/insurance_purchase" element={<Insurance_Purchase />} />
        <Route
          path="/insurance/buy/:insurance_id"
          element={<Insurance_buy />}
        />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
