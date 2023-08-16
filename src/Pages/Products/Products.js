import React, { useEffect, useState } from "react";
import { getAllProducts, getProductsByCategory } from "../../API/API";
import AddToCartButton from "./AddToCartButton";
import { NavLink, useParams } from "react-router-dom";
import {
  Card,
  Image,
  Typography,
  Badge,
  Rate,
  Select,
  Pagination,
  Skeleton,
  Row,
  Col,
  Button,
  Input,
} from "antd";
import "../../App.css";

import { EyeOutlined, SearchOutlined } from "@ant-design/icons";

const Products = () => {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("az");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    setLoading(true);
    (categoryId
      ? getProductsByCategory(categoryId, currentLimit, currentPage)
      : getAllProducts(currentLimit, currentPage)
    ).then((res) => {
      setItems(res.products);
      setTotalCount(res.total);
      setLoading(false);
    });
  }, [categoryId, currentLimit, currentPage]);

  const getSortedItems = () => {
    const sortedItems = [...items];
    sortedItems.sort((a, b) => {
      let comparison = 0;

      if (sortOrder === "az" || sortOrder === "za") {
        comparison = a.title.localeCompare(b.title);
      } else if (sortOrder === "highLow" || sortOrder === "lowHigh") {
        comparison = a.price - b.price;
      }

      if (sortOrder === "za" || sortOrder === "highLow") {
        comparison *= -1;
      }

      return comparison;
    });

    return sortedItems;
  };

  const productsCard = getSortedItems().map((item, index) => (
    <Col xs={24} sm={12} md={8} lg={6} key={index}>
      <Badge.Ribbon
        className="itemCardBadge"
        text={item.discountPercentage}
        color="blue"
      >
        <Card
          className="itemCard"
          key={index}
          title={<h3 style={{ textAlign: "center" }}>{item.title}</h3>}
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
                      item.price + (item.price * item.discountPercentage) / 100
                    ).toFixed(2)}
                  </Typography.Text>
                </Typography.Paragraph>
              </h3>
            }
            description={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <h4 style={{ textAlign: "center", marginBottom: "10px" }}>
                  <Typography.Paragraph
                    ellipsis={{
                      rows: 2,
                      expandable: true,
                      symbol: "more",
                    }}
                  >
                    {item.description}
                  </Typography.Paragraph>
                </h4>
                <Button type="link" icon={<EyeOutlined />}>
                  <NavLink to={`/products/${item.id}`}>View Details</NavLink>
                </Button>
              </div>
            }
          />
        </Card>
      </Badge.Ribbon>
    </Col>
  ));

  return (
    <div className="productsContainer">
      <div
        style={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        <h3>
          <Typography.Text>Search the Products: </Typography.Text>
          <Input.Search
            loading={false}
            placeholder="Search products..."
            prefix={<SearchOutlined />}
            style={{ width: "100%" }}
            onSearch={(value) => {
              console.log(value);
            }}
          />
        </h3>
        <h3>
          <Typography.Text>View Items Sorted By: </Typography.Text>
          <Select
            style={{ width: "100%" }}
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
          />
        </h3>
      </div>
      {loading ? (
        <Skeleton style={{ width: "100vw", height: "100vh" }} round active />
      ) : (
        <Row gutter={16}>{productsCard}</Row>
      )}
      <Pagination
        total={totalCount}
        pageSize={currentLimit}
        defaultCurrent={1}
        current={currentPage}
        pageSizeOptions={[10, 20, 30]}
        showSizeChanger
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onShowSizeChange={(page, pageSize) => {
          setCurrentLimit(pageSize);
        }}
        onChange={(page) => {
          setCurrentPage(page);
        }}
      />
    </div>
  );
};

export default Products;
