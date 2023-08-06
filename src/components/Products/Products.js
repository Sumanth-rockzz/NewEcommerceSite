import React, { useEffect, useState } from "react";
import {
  addToCart,
  getAllProducts,
  getProductsByCategory,
} from "../../API/API";
import { useParams } from "react-router-dom";
import {
  Card,
  List,
  Image,
  Typography,
  Badge,
  Rate,
  Button,
  message,
} from "antd";
import "../../App.css";

const Products = () => {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    (categoryId ? getProductsByCategory(categoryId) : getAllProducts()).then(
      (res) => {
        setItems(res.products);
        setLoading(false);
      }
    );
  }, [categoryId]);

  return (
    <div>
      <List
        loading={loading}
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
                  <AddToCartButton item={item} />,
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

const AddToCartButton = ({ item }) => {
  const [loading, setLoading] = useState(false);
  const addToCartHandler = () => {
    setLoading(true);
    addToCart(item.id).then((res) => {
      message.success(`${item.title} has been added to cart!`);
      setLoading(false);
    });
  };
  return (
    <Button type="link" onClick={addToCartHandler} loading={loading}>
      <h4>Add to cart</h4>
    </Button>
  );
};

export default Products;
