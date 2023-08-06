import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../API/API";
import { Card, List, Image, Typography, Badge, Rate, Button } from "antd";
import "../../App.css";

const Products = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    getAllProducts().then((res) => {
      setItems(res.products);
    });
  }, []);

  const addToCartHandler = () => {
    console.log("hi");
  };
  return (
    <div>
      <List
        grid={{ column: 3 }}
        dataSource={items}
        renderItem={(item, index) => {
          return (
            <Badge.Ribbon
              className="itemCardBadge"
              text={item.discountPercentage}
              color="blue"
            >
              <Card
                className="itemCard"
                title={<h3 style={{ textAlign: "center" }}>{item.title}</h3>}
                key={index}
                cover={<Image className="itemCartImage" src={item.thumbnail} />}
                actions={[
                  <Rate allowHalf value={item.rating} disabled />,
                  <Button onClick={addToCartHandler}>
                    <h4>Add to cart</h4>
                  </Button>,
                ]}
              >
                <Card.Meta
                  title={
                    <h3 style={{ textAlign: "center" }}>
                      <Typography.Paragraph>
                        Price:₹{item.price}{" "}
                        <Typography.Text delete type="danger">
                          {parseFloat(
                            item.price +
                              (item.price * item.discountPercentage) / 100
                          ).toFixed(2)}
                        </Typography.Text>
                      </Typography.Paragraph>
                    </h3>
                  }
                  description=<h4 style={{ textAlign: "center" }}>
                    <Typography.Paragraph
                      ellipsis={{ rows: 2, expandable: true, symbol: "more" }}
                    >
                      {item.description}
                    </Typography.Paragraph>
                  </h4>
                ></Card.Meta>
              </Card>
            </Badge.Ribbon>
          );
        }}
      ></List>
    </div>
  );
};

export default Products;
