import React, { useState } from "react";
import "./SignupPage.css";
import { useNavigate } from "react-router-dom";
import { Button, Divider, Form, Input, Typography, message } from "antd";
import {
  FacebookOutlined,
  GoogleOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const SignupPage = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const signUpHandler = (input) => {
    setIsLoading(true);
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDBk72B52mm2V30BTJ99xYFqZsV2SLd48s";

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
        // const expirationTime = new Date(
        //   new Date().getTime() + +data.expiresIn * 1000
        // );
        form.resetFields();
        message.success(" Registered SuccessFully");
        navigate("/login");
      })
      .catch((err) => {
        message.error(err);
      });
  };

  return (
    <div className="signup-container">
      <Form
        labelWrap
        labelCol={{ span: 10 }}
        labelAlign={{ span: 10 }}
        className="my-form"
        form={form}
        onFinish={(values) => {
          signUpHandler(values);
        }}
        autoComplete="off"
        onFinishFailed={(error) => {
          console.log(error);
        }}
      >
        <Typography.Title>Register</Typography.Title>
        <Divider style={{ borderColor: "black", width: "5px" }}></Divider>
        <Form.Item
          style={{ width: "70%" }}
          name="fullName"
          label="Full Name"
          rules={[
            {
              required: true,
              message: "Please enter your name",
            },
            {
              whitespace: true,
            },
            {
              min: 3,
              message: "It should have atleast 3 characters ",
            },
            {
              max: 20,
              message: "It can have max 20 characters ",
            },
          ]}
          hasFeedback
        >
          <Input placeholder="Enter your name here" allowClear />
        </Form.Item>
        <Form.Item
          style={{ width: "70%" }}
          name="email"
          label="Email ID"
          rules={[
            {
              required: true,
              message: "Email Id is required",
            },
            {
              type: "email",
              message: "Please enter a email id",
            },
          ]}
          hasFeedback
        >
          <Input placeholder="Enter your email here" type="email" allowClear />
        </Form.Item>
        <Form.Item
          style={{ width: "70%" }}
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Password field is required",
            },
            {
              min: 8,
              message: "Password should contain atleast 8 characters",
            },
            {
              validator: (_, value) => {
                return value && value.includes("a")
                  ? Promise.resolve()
                  : Promise.reject("Password does not match criteria");
              },
            },
          ]}
          hasFeedback
        >
          <Input.Password
            placeholder="Create your new password here"
            allowClear
          />
        </Form.Item>
        <Form.Item
          style={{ width: "70%" }}
          name="confirmPassword"
          label="Confirm Password"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Confirm password field is required",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value)
                  return Promise.resolve();
                return Promise.reject("The Passwords does not match");
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password
            placeholder="Confirm your above entered password here"
            allowClear
          />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <Button loading={isLoading} block type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
        <Typography.Text>
          Already have an account ? <NavLink to="/login">Login here</NavLink>
        </Typography.Text>
        <p>Or</p>
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
export default SignupPage;
