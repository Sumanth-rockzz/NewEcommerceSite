import React from "react";
import { Carousel, Card, Typography, Image } from "antd";

const CarouselComponent = () => {
  const contentStyle = {
    margin: 0,
    color: "black",
    lineHeight: "160px",
    textAlign: "center",
    background: "white",
  };
  const { Text } = Typography;
  return (
    <div style={contentStyle}>
      <Card style={{ fontWeight: "bold" }} title="Special Offers">
        <Carousel
          autoplay
          dotPosition="none"
          arrows={false}
          style={{ color: "blue" }}
        >
          <div>
            <Image src="" />
            <Text strong>Welcome to Insta Mart</Text>
            <br />
            <br />
            Discover a world of amazing products and unbeatable deals.
          </div>
          <div>
            <Text strong>Checkout Exciting deals on Insta Mart</Text>
            <br />
            <br />
            Shop now to avail limited-time offers and discounts.
          </div>
          <div>
            <Text strong>Browse through various categories</Text>
            <br />
            <br />
            Find the products you love across a wide range of categories.
          </div>
          <div>
            <Text strong>
              Win Assured cashback upto ₹5000 and Vouchers of Worth ₹10,000
            </Text>
            <br />
            Shop with us and get a chance to win exciting rewards!
          </div>
        </Carousel>
      </Card>
    </div>
  );
};

export default CarouselComponent;
