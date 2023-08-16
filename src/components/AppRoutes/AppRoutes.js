import React from "react";
import { Routes, Route } from "react-router-dom";
import Category from "../../Pages/Category/Category";
import SignupPage from "../../Pages/Auth/SignupPage";
import LoginPage from "../../Pages/Auth/LoginPage";
import AboutUsPage from "../../Pages/AboutUsPage/AboutUsPage";
import ContactUsPage from "../../Pages/ContactUsPage/ContactUsPage";
import HomePage from "../../Pages/HomePage/HomePage";
import MyOrders from "../../Pages/MyOrders/MyOrders";
import SingleProductPage from "../../Pages/SingleProductPage/SingleProductPage";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />}></Route>
      <Route
        path="/products/:productId"
        element={<SingleProductPage />}
      ></Route>
      <Route path="/category/:categoryId" element={<Category />}></Route>
      <Route path="/signup" element={<SignupPage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/about-us" element={<AboutUsPage />}></Route>
      <Route path="/contact-us" element={<ContactUsPage />}></Route>
      <Route
        path="/my-orders"
        element={
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<h1>OOPS page not found!!</h1>}></Route>
    </Routes>
  );
};

export default AppRoutes;
