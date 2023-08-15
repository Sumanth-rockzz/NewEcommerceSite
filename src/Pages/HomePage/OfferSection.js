import React from "react";

import { Col, Row, Typography, Card, Tag } from "antd";
const { Text } = Typography;
const OfferSection = () => {
  return (
    <div style={{ padding: "20px", background: "white" }}>
      <Row gutter={16}>
        <Col xs={24} sm={12} md={12}>
          <Card title="Special Offers">
            <ul>
              <li>
                <Text strong>10% Discount on Electronics</Text>
                <br />
                Get 10% off on all electronic products using code
                {"  "}
                <Tag color="blue">TECH10</Tag>
              </li>
              <li>
                <Text strong>Free Shipping for Orders Above ₹500</Text>
                <br />
                Enjoy free shipping on orders above ₹500 using code.
                {"  "}
                <Tag color="blue">FREEDEL500</Tag>
              </li>
            </ul>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12}>
          <Card title="Payment Options">
            <Text>
              We accept various payment methods to provide you with a convenient
              shopping experience:
            </Text>
            <ul>
              <li>
                <Text strong>Credit/Debit Cards</Text> - We accept Visa,
                Mastercard, and American Express.
                <br></br>
                <Tag color="blue">Visa</Tag>
                <Tag color="blue">Mastercard</Tag>
                <Tag color="blue">American Express</Tag>.
              </li>
              <li>
                <Text strong>Bank Transfer</Text> - Pay directly from your bank
                account using bank transfer.
              </li>
              <li>
                <Text strong>Mobile Wallets</Text> - Use mobile wallets like
                PayPal, Google Pay, and Apple Pay for seamless payments.
              </li>
            </ul>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OfferSection;
