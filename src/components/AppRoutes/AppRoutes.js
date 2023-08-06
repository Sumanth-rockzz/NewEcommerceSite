import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../../Pages/HomePage/HomePage";
import Category from "../../Pages/Category/Category";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<Category />}></Route>
      <Route path="/:categoryId" element={<Category />}></Route>
    </Routes>
  );
};

export default AppRoutes;
