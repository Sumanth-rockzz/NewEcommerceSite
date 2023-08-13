import React from "react";
import { Routes, Route } from "react-router-dom";
import Category from "../../Pages/Category/Category";
import SignupPage from "../../Pages/Auth/SignupPage";
import LoginPage from "../../Pages/Auth/LoginPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<Category />}></Route>
      <Route path="/:categoryId" element={<Category />}></Route>
      <Route path="/signup" element={<SignupPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="*" element={<h1>OOPS page not found!!</h1>}></Route>
    </Routes>
  );
};

export default AppRoutes;
