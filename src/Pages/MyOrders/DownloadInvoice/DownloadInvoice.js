import jsPDF from "jspdf";
import "jspdf-autotable";

export const downloadInvoiceHandler = (record) => {
  const doc = new jsPDF();
  doc.setFontSize(12);

  const storeName = "InstaMart";
  const phoneNumber = "+91 8073953662";
  const address = "Church Street, Bangalore, Karnataka, 560091";

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

  const date = new Date().toISOString();

  // Save the PDF
  doc.save(`Invoice-${date.split("T")[0]}.pdf`);
};
