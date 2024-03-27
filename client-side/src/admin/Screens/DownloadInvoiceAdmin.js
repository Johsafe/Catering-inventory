import * as React from "react";
import Button from "@mui/joy/Button";
import moment from "moment";
import QRCode from "react-qr-code";
import { base_url } from "../../Utils/Utils";
import ReactDOMServer from "react-dom/server";

export default function AdminDownloadScreen({ orderId }) {
  const [orderDetails, setOrderDetails] = React.useState(null);

  // Function to fetch order details from the backend
  const fetchOrderDetails = async (id) => {
    try {
      const response = await fetch(`${base_url}order/orders/${id}`);
      const data = await response.json();
      setOrderDetails(data);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  React.useEffect(() => {
    if (orderId) {
      fetchOrderDetails(orderId);
    }
  }, [orderId]);

  //   Function to generate QR code
  const generateQRCode = (value) => {
    const qrCodeComponent = <QRCode value={value} size={100} />;
    const qrCodeHtmlString = ReactDOMServer.renderToString(qrCodeComponent);
    return qrCodeHtmlString;
  };

  // Function to generate and print the invoice
  async function generateAndPrintInvoice(orderDetails) {
    if (!orderDetails) return;

    // Restaurant details
    const restaurantName = "Asgard Catering";
    const restaurantTel = "123-456-7890";
    const restaurantEmail = "asgcatering@example.com";
    const logo =
      "https://res.cloudinary.com/drselhsl4/image/upload/v1711549855/catering/yewirn2asngvxdxgbpwa.png";
    const qrCodeHtml = generateQRCode(orderDetails.order_no);

    // Table with purchased items
    const itemsTable =
      orderDetails.OrderItems &&
      orderDetails.OrderItems.map((item) => (
        <tr key={item.id}>
          <td>{item.food_name}</td>
          <td>Ksh. {item.price}</td>
          <td>{item.quantity}</td>
          <td>{item.quantity * item.price}</td>
        </tr>
      ));

    // Invoice template
    const invoiceTemplate = `
<html>
  <head>
    <title>Invoice</title>
    <style>
    body {
      font-family: Arial, sans-serif;
      width: 80mm;
      margin: 60px;
      padding: 0;
    }
    .section {
      margin-bottom: 20px;
      text-align: left; 
      display: block;
    }
    .section p {
      margin: 5px 0;
      display:flex;
    }
    .section p b {
      display: inline-block;
      width:40mm;
    }
    .totalsection p {
      margin: 5px 0;
      display:flex;
    }
    .totalsection p b {
      display: inline-block;
      width:40mm;
    }
    .headsection{
      text-align: center;
      display: block;

    }
    .footsection{
      text-align: center;
    }
    .table-container {
      margin-top: 20px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    table td, table th {
      padding: 8px;
      text-align: left;
    }
    table th {
      background-color: #f2f2f2;
    }
    .qr-code {
      text-align: center;
    }
    .restaurant-logo {
      width: 100px; 
      height: auto; 
      display: block; 
      margin: 0 auto 20px;
    }
  </style>
  </head>
  <body>
    <div class="headsection">
    <img class="restaurant-logo" src="${logo}" alt="Restaurant Logo">
      <h2>${restaurantName}</h2>
      <p>Tel: ${restaurantTel}</p>
      <p>Email: ${restaurantEmail}</p>
    </div>
    <div class="section">
      <h2>Sale Invoice</h2>
      <p><b>Customer:</b> ${orderDetails.customer}</p>
      <p><b>Cashier Name:</b> ${orderDetails.User.username}</p>
      <p><b>Date:</b> ${moment(orderDetails.createdAt).format("ll")}</p>
      <p><b>Order ID:</b> ${orderDetails.order_no}</p>
      <p><b>Payment Method:</b> ${orderDetails.paymentMethod}</p>
      
    </div>
    <div class="section table-container">
      <h3>Items</h3>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
         ${itemsTable
           .map((item) => ReactDOMServer.renderToStaticMarkup(item))
           .join("")}
        </tbody>
      </table>
    </div>
    <div class="totalsection">
    <p><strong>Total Price:</strong> Ksh. ${orderDetails.total}.00</p>
    </div>
    <div class="qr-code">
    ${qrCodeHtml} 
      </div>
    <div class="footsection">
      <p>&copy; ${new Date().getFullYear()}. All rights reserved.</p>
    </div>
  </body>
</html>
`;

    // Create a new window and write the invoice template to it
    const invoiceWindow = window.open();
    invoiceWindow.document.write(invoiceTemplate);

    // Close the invoice window after printing
    setTimeout(() => {
      invoiceWindow.print();
      invoiceWindow.close();
    }, 100);
  }

  return (
    <div style={{ display: "flex" }}>
      <Button
        variant="contained"
        color="error"
        size="small"
        onClick={() => generateAndPrintInvoice(orderDetails)}
      >
        Download
      </Button>
    </div>
  );
}
