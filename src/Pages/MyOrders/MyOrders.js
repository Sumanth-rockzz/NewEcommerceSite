import React from "react";
import { useSelector } from "react-redux";
import { Button, Space, Table, Tag, Typography, Row, Col } from "antd";
import { downloadInvoiceHandler } from "./DownloadInvoice/DownloadInvoice";
import { DownloadOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
const { Text } = Typography;
const MyOrders = () => {
  const orderDetails = useSelector((state) => state.cart.orderedItemDetails);

  const firstColumnsDataSource = orderDetails.map((order, index) => {
    return {
      index: index + 1,
      totalAmount: order.reduce((total, item) => total + item.total, 0),
      totalQuantity: order.reduce((total, item) => total + item.quantity, 0),
      orderItems: order,
    };
  });

  const columns = [
    {
      title: "Order Number",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Ordered Items",
      key: "items",
      ellipsis: true,
      render: (record) => (
        <Space direction="vertical">
          {record.orderItems.map((item, index) => (
            <NavLink to={`/products/${item.id}`}>
              <Tag color="blue" key={index}>
                {item.title}
              </Tag>
            </NavLink>
          ))}
        </Space>
      ),
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount) => <Text strong>₹{amount}</Text>,
    },
    {
      title: "Invoice",
      key: "invoice",
      render: (record) => (
        <Button
          type="primary"
          onClick={() => {
            downloadInvoiceHandler(record);
          }}
          icon={<DownloadOutlined color="blue" style={{ fontSize: "20px" }} />}
        >
          Order Invoice
        </Button>
      ),
    },
  ];

  const expandedRowRender = (record) => {
    console.log("hello", record);
    const itemColumns = [
      {
        title: "Product",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        render: (price) => <Text>₹{price}</Text>,
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
      },
      {
        title: "Total",
        dataIndex: "total",
        key: "total",
        render: (total) => <Text>₹{total}</Text>,
      },
    ];

    return (
      <Table
        scroll={{ y: 300 }}
        columns={itemColumns}
        dataSource={record.orderItems}
        pagination={false}
        style={{ maxWidth: "100vw" }}
      />
    );
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", padding: "10px" }}>My Orders</h2>
      <Row justify="center">
        <Col xs={24} sm={24} md={24} lg={20} xl={18}>
          <Table
            scroll={{ y: 1000 }}
            columns={columns}
            dataSource={firstColumnsDataSource}
            rowKey={(record) => record.index}
            expandable={{ expandedRowRender }}
            pagination={{
              position: ["bottomCenter"],
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default MyOrders;
