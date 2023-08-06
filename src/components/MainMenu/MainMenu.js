import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  Typography,
  Badge,
  Drawer,
  Table,
  Form,
  InputNumber,
  Input,
  Button,
  Checkbox,
  message,
} from "antd";
import { getCart } from "../../API/API";
import "../../App.css";
import {
  ShopOutlined,
  ShoppingCartOutlined,
  HomeFilled,
  WomanOutlined,
  ManOutlined,
} from "@ant-design/icons";

const MainMenu = () => {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    setSelectedKeys(location.pathname);
  }, [location.pathname]);
  const navigate = useNavigate();
  return (
    <div className="MainMenu">
      <Menu
        className="MainMenuHorizontal"
        mode="horizontal"
        onClick={(item) => {
          //item.key
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "Home",
            icon: <HomeFilled />,
            key: "/home",
          },
          {
            label: "Men",
            icon: <ManOutlined />,
            key: "/men",
            children: [
              {
                label: "Men's Shirts",
                key: "/mens-shirts",
              },
              {
                label: "Men's Shoes",
                key: "/mens-shoes",
              },
              {
                label: "Men's Watches",
                key: "/mens-watches",
              },
            ],
          },
          {
            label: "Women",
            icon: <WomanOutlined />,
            key: "/women",
            children: [
              {
                label: "Women's Dresses",
                key: "/womens-dresses",
              },
              {
                label: "Women's Shoes",
                key: "/womens-shoes",
              },
              {
                label: "Women's Watches",
                key: "/womens-watches",
              },
              {
                label: "Women's Bags",
                key: "/womens-bags",
              },
              {
                label: "Women's Jewellery",
                key: "/womens-jewellery",
              },
            ],
          },
          {
            label: "Fragrances",
            icon: <ShopOutlined />,
            key: "/fragrances",
          },
        ]}
      />
      <Typography.Title style={{ marginTop: "10px" }}>
        InstaMart
      </Typography.Title>
      <AppCart />
    </div>
  );
};
const AppCart = () => {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [orderDrawerOpen, setOrderDrawerOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    getCart().then((res) => {
      setCartItems(res.products);
    });
  }, []);

  const CartHandler = () => {
    setCartDrawerOpen(!cartDrawerOpen);
  };
  const orderHandler = () => {
    setOrderDrawerOpen(!orderDrawerOpen);
  };

  const onConfirmOrder = (values) => {
    console.log({ values });
    setOrderDrawerOpen(!orderDrawerOpen);
    setCartDrawerOpen(!cartDrawerOpen);
    message.success(
      "Order has been placed successfully and will be Delivered in 30 Min"
    );
  };

  return (
    <div>
      <Badge count={7} className="shoppingCartIcon" onClick={CartHandler}>
        <ShoppingCartOutlined />
      </Badge>
      <Drawer
        open={cartDrawerOpen}
        onClose={CartHandler}
        title="Your Cart"
        contentWrapperStyle={{ width: 600 }}
        closable
      >
        <Table
          pagination={false}
          columns={[
            {
              title: "Title",
              dataIndex: "title",
            },
            {
              title: "Price",
              dataIndex: "price",
              render: (value) => <span>₹ {value}</span>,
            },
            {
              title: "Quantity",
              dataIndex: "quantity",
              render: (value, record) => {
                return (
                  <InputNumber
                    min={0}
                    defaultValue={value}
                    onChange={(value) => {
                      setCartItems((prev) =>
                        prev.map((cart) => {
                          if (record.id === cart.id) {
                            cart.total = cart.price * value;
                          }
                          return cart;
                        })
                      );
                    }}
                  ></InputNumber>
                );
              },
            },
            {
              title: "Total",
              dataIndex: "total",
            },
          ]}
          dataSource={cartItems}
          summary={(data) => {
            const total = data.reduce((prev, curr) => prev + curr.total, 0);
            return <span>Total : {total}</span>;
          }}
        ></Table>
        <Button type="primary" onClick={orderHandler}>
          Proceed to Checkout
        </Button>
      </Drawer>
      <Drawer
        open={orderDrawerOpen}
        onClose={orderHandler}
        title="Confirm Your Order"
      >
        <Form onFinish={onConfirmOrder}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please Enter Your Full Name",
              },
            ]}
            label="Full Name"
            name="full_name"
          >
            <Input placeholder="Enter Your Full Name" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                type: "email",
                message: "Please Enter A Valid  Email",
              },
            ]}
            label="Email"
            name="email"
          >
            <Input placeholder="Enter Your Email" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please Enter Your Address",
              },
            ]}
            label="Address"
            name="address"
          >
            <Input placeholder="Enter Your Address" />
          </Form.Item>
          <Form.Item>
            <Checkbox checked disabled>
              Cash on Delivery
            </Checkbox>
          </Form.Item>
          <Typography.Paragraph>
            More Payment Options Are Coming Soon...{" "}
          </Typography.Paragraph>
          <Button type="primary" htmlType="submit">
            Confirm Order
          </Button>
        </Form>
      </Drawer>
    </div>
  );
};

export default MainMenu;
