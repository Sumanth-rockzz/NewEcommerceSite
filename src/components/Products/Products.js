import React, { useEffect, useState } from "react";
import { getAllProducts, getProductsByCategory } from "../../API/API";
import AddToCartButton from "./AddToCartButton";
import { useParams } from "react-router-dom";
import {
  Card,
  List,
  Image,
  Typography,
  Badge,
  Rate,
  Select,
  Pagination,
  Skeleton,
} from "antd";
import "../../App.css";

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
    ) //limit and size
      .then((res) => {
        setItems(res.products);
        setTotalCount(res.total);
        setLoading(false);
      });
  }, [categoryId, currentLimit, currentPage]);

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

      if (sortOrder === "za" || sortOrder === "highLow") {
        comparison *= -1; // Reverse the comparison for descending order
      }

      return comparison;
    });

    return sortedItems;
  };

  return (
    <div className="productsContainer">
      <div
        style={{
          display: "flex",
          justifyContent: "end",
        }}
      >
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
      {loading ? (
        <Skeleton style={{ width: "100vw", height: "100vh" }} round active />
      ) : (
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 2,
            xl: 3,
            xxl: 3,
          }}
          loading={loading}
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
                  cover={
                    <Image className="itemCartImage" src={item.thumbnail} />
                  }
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
                        ellipsis={{
                          rows: 2,
                          expandable: true,
                          symbol: "more",
                        }}
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
          console.log(pageSize, "....", page);
          setCurrentLimit(pageSize);
        }}
        onChange={(page, pageSize) => {
          console.log(pageSize, "....", page);
          setCurrentPage(page);
        }}
      />
    </div>
  );
};

export default Products;
