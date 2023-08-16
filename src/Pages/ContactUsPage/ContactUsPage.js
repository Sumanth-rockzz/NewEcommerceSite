import React from "react";
import { Form, Input, Button, Typography, message } from "antd";

const { Title } = Typography;

const ContactUsPage = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Form values:", values);
    message.success("Message sent successfully!");
    form.resetFields();
  };

  return (
    <div
      style={{
        padding: "25px",
        display: "flex",
        flex: 2,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Form
        className="my-form"
        labelWrap
        labelCol={{ span: 10 }}
        labelAlign={{ span: 10 }}
        name="contactForm"
        onFinish={onFinish}
      >
        <Title>Contact Us</Title>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Message"
          name="message"
          rules={[{ required: true, message: "Please enter your message" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Send Message
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ContactUsPage;
