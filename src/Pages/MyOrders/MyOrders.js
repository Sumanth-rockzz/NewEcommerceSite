import React from "react";
import { useSelector } from "react-redux";
import { Button, Space, Table, Tag, Typography, Row, Col } from "antd";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { DownloadOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
const { Text } = Typography;
const MyOrders = () => {
  const orderDetails = useSelector((state) => state.cart.orderedItemDetails);

  const downloadInvoiceHandler = (record) => {
    const doc = new jsPDF();
    doc.setFontSize(12);

    const storeName = "InstaMart";
    const phoneNumber = "+91 8073953662";
    const address = "123 Main Street, Bangalore, Karnataka, 560091";

    // Invoice information
    const invoiceTitle = "Order Invoice";
    const invoiceDate = new Date().toLocaleDateString();

    const startY = 20;
    // Add store information to the PDF
    doc.setFontSize(20);
    doc.text(storeName, 20, startY);

    doc.setFontSize(12);
    doc.text(`Phone: ${phoneNumber}`, 20, startY + 10);
    doc.text(`Address: ${address}`, 20, startY + 20);

    const invoiceTitleY = startY + 40; // Adjust the Y position for invoice title
    const invoiceDateY = invoiceTitleY + 10; // Adjust the Y position for invoice date

    // Add invoice information to the PDF
    doc.setFontSize(16);
    doc.text(invoiceTitle, 20, invoiceTitleY);

    doc.setFontSize(12);
    doc.text(`Invoice Date: ${invoiceDate}`, 20, invoiceDateY);

    const tableY = invoiceDateY + 20; // Adjust the Y position for the table

    // Prepare the table data for invoice
    const tableData = record.orderItems.map((item, index) => [
      index + 1,
      item.title,
      item.price,
      item.quantity,
      item.total,
    ]);

    // Set the column headers
    const headers = [["#", "Product", "Price", "Quantity", "Total"]];

    // Generate the PDF table
    doc.autoTable({
      head: headers,
      body: tableData,
      startY: tableY,
    });

    // Save the PDF
    doc.save("invoice.pdf");
  };

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
