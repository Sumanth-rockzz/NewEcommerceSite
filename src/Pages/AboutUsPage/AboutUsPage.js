import React from "react";
import { Typography } from "antd";

const { Title, Paragraph } = Typography;

const AboutUsPage = () => {
  return (
    <div
      style={{
        padding: "25px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "aquamarine",
      }}
    >
      <Title>About Our InstaMart</Title>
      <Paragraph>
        Welcome to our e-commerce website! At our online store, we are committed
        to providing you with a seamless shopping experience and a wide range of
        high-quality products to choose from.
      </Paragraph>
      <Paragraph>
        Our team is dedicated to offering you the latest trends and the best
        deals. Whether you're looking for clothing, electronics, home goods, or
        more, we've got you covered. We pride ourselves on excellent customer
        service, secure transactions, and prompt delivery to your doorstep.
      </Paragraph>
      <Paragraph>
        As part of our commitment to customer satisfaction, we offer easy
        returns and exchanges, so you can shop with confidence. Our
        user-friendly website and intuitive navigation make finding your desired
        products a breeze.
      </Paragraph>
      <Paragraph>
        We understand the importance of a seamless online shopping experience,
        which is why we've implemented a secure payment gateway to ensure your
        financial information is always protected. Shop worry-free with us!
      </Paragraph>
      <Paragraph>
        Thank you for choosing us as your go-to destination for all your online
        shopping needs. We look forward to serving you and making your shopping
        experience enjoyable and convenient.
      </Paragraph>
    </div>
  );
};

export default AboutUsPage;
