import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../../API/API";
import {
  Skeleton,
  Row,
  Col,
  Typography,
  Descriptions,
  Image,
  Rate,
} from "antd";
import AddToCartButton from "../Products/AddToCartButton";
const { Title } = Typography;

const SingleProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSingleProduct(productId)
      .then((res) => {
        console.log(res);
        setProduct(res);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [productId]);

  const productImageStyle = {
    width: "100%",
    maxWidth: "100%",
    height: "auto",
    marginBottom: "16px",
  };

  const productInfoStyle = {
    padding: "16px",
    border: "1px solid #d9d9d9",
    borderRadius: "4px",
  };

  return (
    <div>
      {loading ? (
        <Skeleton style={{ width: "100vw", height: "100vh" }} round active />
      ) : product ? (
        <Row gutter={16}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div>
              <Row gutter={16}>
                {product.images.map((image, index) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={index}>
                    <Image
                      src={image}
                      alt={`Product ${index}`}
                      style={productImageStyle}
                    />
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div style={productInfoStyle}>
              <Title level={3}>{product.title}</Title>
              <AddToCartButton item={product} />
              <Descriptions layout="vertical" bordered>
                <Descriptions.Item label="Price">
                  ₹{product.price}
                </Descriptions.Item>
                <Descriptions.Item label="Description" span={2}>
                  {product.description}
                </Descriptions.Item>
                <Descriptions.Item label="Discount Percentage">
                  {product.discountPercentage}%
                </Descriptions.Item>
                <Descriptions.Item label="Rating">
                  <Rate allowHalf value={product.rating} disabled />,
                </Descriptions.Item>
                <Descriptions.Item label="Stock">
                  {product.stock}
                </Descriptions.Item>
                <Descriptions.Item label="Brand">
                  {product.brand}
                </Descriptions.Item>
                <Descriptions.Item label="Category">
                  {product.category}
                </Descriptions.Item>
              </Descriptions>
            </div>
          </Col>
        </Row>
      ) : (
        <p>Product not found.</p>
      )}
    </div>
  );
};

export default SingleProductPage;
