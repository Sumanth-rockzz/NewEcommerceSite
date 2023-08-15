import React from "react";
import { NavLink } from "react-router-dom";
import { Layout, Row, Col, Typography } from "antd";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;
const { Title, Text, Link } = Typography;

const AppFooter = () => {
  return (
    <Footer style={{ background: "#f0f2f5" }}>
      <Row gutter={16} justify="center">
        <Col xs={24} sm={12} md={6}>
          <Title level={4}>Contact Us</Title>
          <Text>
            <MailOutlined />
            {"  "}
            Email:{" "}
            <Link href="mailto:sumanthn876@gmail.com">
              sumanthn876@gmail.com
            </Link>
          </Text>
          <br />
          <Text>
            <PhoneOutlined rotate={120} />
            {"  "}
            Phone: <Link href="tel:+918073953662">+91 8073953662</Link>
          </Text>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Title level={4}>Customer Service</Title>
          <NavLink to="/returns">Returns</NavLink>
          <br />
          <NavLink to="/shipping">Shipping</NavLink>
          <br />
          <NavLink to="/faqs">FAQs</NavLink>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Title level={4}>About Us</Title>
          <NavLink to="/our-story">Our Story</NavLink>
          <br />
          <NavLink to="/careers">Careers</NavLink>
          <br />
          <NavLink to="/terms">Terms and Conditions</NavLink>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Title level={4}>Follow Us</Title>
          <div>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookOutlined
                style={{ fontSize: "24px", marginRight: "10px" }}
              />
            </a>
            <a
              href="https://www.twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterOutlined
                style={{ fontSize: "24px", marginRight: "10px" }}
              />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramOutlined
                style={{ fontSize: "24px", marginRight: "10px" }}
              />
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <YoutubeOutlined
                style={{ fontSize: "24px", marginRight: "10px" }}
              />
            </a>
          </div>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: "20px" }}>
        <Col span={24} justify="center">
          <Text style={{ textAlign: "center" }}>
            © {new Date().getFullYear()} Your InstaMart Store. All rights
            reserved.
          </Text>
        </Col>
      </Row>
    </Footer>
  );
};

export default AppFooter;
