import { useState, useEffect } from "react";
import { getCart } from "../../API/API";
import { cartActions } from "../../redux-store/cart-slice";
import {
  message,
  Badge,
  Drawer,
  Table,
  InputNumber,
  Form,
  Input,
  Button,
  Checkbox,
  Typography,
} from "antd";
import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";

const AppCart = () => {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [orderDrawerOpen, setOrderDrawerOpen] = useState(false);

  let cartItems = useSelector((state) => state.cart.items);
  let totalQuantity = useSelector((state) => state.cart.totalQuantity);
  let totalAmount = useSelector((state) => state.cart.totalAmount);

  const dispatch = useDispatch();

  useEffect(() => {
    getCart().then((res) => {
      const items = res.products.map((item) => {
        item.key = item.id;
        return item;
      });
      dispatch(cartActions.replaceCart({ items: items }));
    });
  }, [dispatch]);

  const CartHandler = () => {
    setCartDrawerOpen(!cartDrawerOpen);
  };
  const orderHandler = () => {
    setOrderDrawerOpen(!orderDrawerOpen);
  };

  const onConfirmOrder = (values) => {
    console.log(values);
    setOrderDrawerOpen(!orderDrawerOpen);
    setCartDrawerOpen(!cartDrawerOpen);
    dispatch(cartActions.onOrder());
    message.success(
      "Order has been placed successfully and will be Delivered in 30 Min"
    );
  };
  return (
    <div>
      <Badge
        count={totalQuantity}
        className="shoppingCartIcon"
        onClick={CartHandler}
      >
        <ShoppingCartOutlined />
      </Badge>
      <Drawer
        open={cartDrawerOpen}
        onClose={CartHandler}
        title="Your Cart"
        contentWrapperStyle={{ width: 600 }}
        closable
      >
        <div className="cartDrawer">
          <Table
            pagination={false}
            scroll={{ y: 350 }}
            columns={[
              {
                key: 1,
                title: "Title",
                dataIndex: "title",
                width: "30%",
              },
              {
                key: 2,
                title: "Price",
                dataIndex: "price",
                width: "25%",

                render: (value) => <div>₹ {value}</div>,
              },
              {
                key: 3,
                title: "Quantity",
                dataIndex: "quantity",
                width: "25%",

                render: (oldValue, record) => {
                  return (
                    <InputNumber
                      className="quantity-input"
                      min={1}
                      defaultValue={oldValue}
                      onChange={(newValue) => {
                        console.log(oldValue, newValue);
                        dispatch(
                          cartActions.addItem({
                            key: record.id,
                            id: record.id,
                            title: record.title,
                            price: record.price,
                            total: record.price * newValue,
                            quantity: newValue,
                          })
                        );
                      }}
                    ></InputNumber>
                  );
                },
              },
              {
                key: 4,
                title: "Total",
                dataIndex: "total",
                width: "20%",
              },
              {
                key: 5,
                width: "10%",
                render: (data) => {
                  return (
                    <DeleteOutlined
                      type="danger"
                      style={{
                        fontSize: "20px",
                        margin: "unset",
                        padding: "unset",
                      }}
                      onClick={() => {
                        dispatch(cartActions.deleteItem(data.id));
                      }}
                    />
                  );
                },
              },
            ]}
            dataSource={cartItems}
          ></Table>
          <Typography.Text style={{ marginTop: "5px" }}>
            Total Cart Value is : ₹{totalAmount}
          </Typography.Text>
          <Button
            type="primary"
            onClick={orderHandler}
            style={{ marginTop: "5px" }}
          >
            Proceed to Checkout
          </Button>
        </div>
      </Drawer>
      <Drawer
        open={orderDrawerOpen}
        onClose={orderHandler}
        title="Confirm Your Order"
      >
        <Form
          labelWrap
          labelCol={{ span: 10 }}
          labelAlign={{ span: 10 }}
          onFinish={onConfirmOrder}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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

export default AppCart;
