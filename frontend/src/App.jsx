import "./App.css";

import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
