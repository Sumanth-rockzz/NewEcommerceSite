import React, { useState } from "react";
import "./SignupPage.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../redux-store/auth-slice";

import {
  Form,
  Input,
  Button,
  Checkbox,
  Divider,
  Typography,
  message,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  GoogleOutlined,
  FacebookOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

const LoginPage = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = (input) => {
    setIsLoading(true);
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDBk72B52mm2V30BTJ99xYFqZsV2SLd48s";

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: input.email,
        password: input.password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMsg = "Authentication Failed";
            throw new Error(errorMsg);
          });
        }
      })
      .then((data) => {
        console.log(data);
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        dispatch(
          authActions.login({
            token: data.idToken,
            expirationTime: expirationTime,
          })
        );
        localStorage.setItem("token", data.idToken);
        localStorage.setItem("expirationTime", expirationTime);
        form.resetFields();
        message.success(" LoggedIn SuccessFully");
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        message.error(err.message);
      });
  };
  return (
    <div className="signup-container">
      <Form
        labelWrap
        labelCol={{ span: 10 }}
        labelAlign={{ span: 10 }}
        form={form}
        className="my-form"
        initialValues={{ remember: true }}
        onFinish={(values) => {
          loginHandler(values);
        }}
        onFinishFailed={(error) => {
          message.error(error);
        }}
      >
        <Typography.Title>Login</Typography.Title>
        <Divider style={{ borderColor: "black", width: "5px" }}></Divider>
        <Form.Item
          label="Email Id"
          name="email"
          rules={[{ required: true, message: "Please input your Email ID!" }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Username"
            style={{ width: "150px" }}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Password"
            allowClear
            style={{ width: "150px" }}
          />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item>
          <a href="">Forgot password</a>
        </Form.Item>

        <Form.Item>
          <Button loading={isLoading} type="primary" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
        <Form.Item>
          No account ? <NavLink to="/signup">Register here</NavLink>
        </Form.Item>
        <Divider style={{ borderColor: "black", width: "5px" }}>
          Login with
        </Divider>
        <div className="social-networks">
          <GoogleOutlined />
          <FacebookOutlined />
          <TwitterOutlined />
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
