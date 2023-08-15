import React from "react";
import Products from "../Products/Products";
import OfferSection from "./OfferSection";
import CarouselComponent from "./CarouselComponent";

const HomePage = () => {
  return (
    <div style={{ maxHeight: "100vh", maxWidth: "100vw" }}>
      <div>
        <CarouselComponent />
      </div>
      <OfferSection />
      <Products />
    </div>
  );
};

export default HomePage;
