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
  Select,
} from "antd";
import "../../App.css";

const Products = () => {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("az");

  useEffect(() => {
    setLoading(true);
    (categoryId ? getProductsByCategory(categoryId) : getAllProducts()).then(
      (res) => {
        setItems(res.products);
        setLoading(false);
      }
    );
  }, [categoryId]);

  //   const getSortedItems = () => {
  //     const sortedItems = [...items];
  //     sortedItems.sort((a, b) => {
  //       if (sortOrder === "az") {
  //         return a.title > b.title ? 1 : a.title === b.title ? 0 : -1;
  //       } else if (sortOrder === "za") {
  //         return a.title < b.title ? 1 : a.title === b.title ? 0 : -1;
  //       } else if (sortOrder === "lowHigh") {
  //         return a.price > b.price ? 1 : a.price === b.price ? 0 : -1;
  //       } else if (sortOrder === "highLow") {
  //         return a.price < b.price ? 1 : a.price === b.price ? 0 : -1;
  //       }
  //     });
  //     return sortedItems;
  //   };
  const getSortedItems = () => {
    const sortedItems = [...items];
    sortedItems.sort((a, b) => {
      let comparison = 0;

      if (sortOrder === "az" || sortOrder === "za") {
        comparison = a.title.localeCompare(b.title);
      } else if (sortOrder === "highLow" || sortOrder === "lowHigh") {
        comparison = a.price - b.price;
      }

      if (sortOrder === "za" || sortOrder === "lowHigh") {
        comparison *= -1; // Reverse the comparison for descending order
      }

      return comparison;
    });

    return sortedItems;
  };

  return (
    <div className="productsContainer">
      <div>
        <h3>
          <Typography.Text>Vew Items Sorted By : </Typography.Text>
          <Select
            defaultValue={"az"}
            onChange={(value) => {
              setSortOrder(value);
            }}
            options={[
              {
                label: "Alphabetically a-z",
                value: "az",
              },
              {
                label: "Alphabetically z-a",
                value: "za",
              },
              {
                label: "Price Low to High",
                value: "lowHigh",
              },
              {
                label: "Price High to Low",
                value: "highLow",
              },
            ]}
          ></Select>
        </h3>
      </div>

      <List
        loading={loading}
        grid={{ column: 3 }}
        dataSource={getSortedItems()}
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
