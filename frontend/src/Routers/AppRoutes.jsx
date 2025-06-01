import { Routes, Route } from "react-router-dom";
import Login from "../customers/pages/Login";
import Signup from "../customers/pages/Signup";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
