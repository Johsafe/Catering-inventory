import * as React from "react";
import Box from "@mui/joy/Box";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import Card from "@mui/joy/Card";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import { toast } from "react-toastify";
import Select from "react-select";
import { base_url, getError } from "../../Utils/Utils";
import SideBar from "../../Utils/CashierSideBar";
import Avatar from "react-avatar";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import Button from "@mui/joy/Button";
import DeleteForever from "@mui/icons-material/DeleteForever";
import QRCode from "react-qr-code";
import moment from "moment";

export default function CashierSalesScreen() {
  //post data
  const navigate = useNavigate();
  const [customer, setCustomer] = React.useState("");
  const [paymentMethod, setPaymentMethod] = React.useState("");
  const [products, setProducts] = React.useState([]);
  const [prdOptions, setPrdOptions] = React.useState([]);
  const [selectedPay, setSelectedPay] = React.useState(null);
  // const [quantity, setQuantity] = React.useState(1);

  // const [orderId, setOrderId] = React.useState("");
  // const [dateCreated, setDateCreated] = React.useState("");
  // const [totalPrice, setTotalPrice] = React.useState(0);
  // // const [cashierName, setCashierName] = React.useState("");

  // // Function to generate QR code
  // const generateQRCode = (text) => {
  //   return (
  //     <div style={{ textAlign: "center" }}>
  //       <QRCode value={text} size={128} />
  //     </div>
  //   );
  // };
  // // {`${orderId} ${dateCreated} ${customer}`} 
  
  
  // // Function to fetch order details from the backend
  // const fetchOrderDetails = async () => {
  //   try {
  //     const response = await fetch(`${base_url}order/orders`);
  //     const data = await response.json();
  //     setOrderId(data.order_no);
  //     setDateCreated(data.createdAt);
  //     setTotalPrice(data.total);
  //     // setCashierName(data.cashierName);
  //     // You might also want to set other state variables such as customer and products if they are fetched from the backend
  //   } catch (error) {
  //     console.error("Error fetching order details:", error);
  //   }
  // };

  // React.useEffect(() => {
  //   fetchOrderDetails();
  // }, []);

  // // Function to generate and print the invoice
  // const generateAndPrintInvoice = () => {
  //   // Restaurant details
  //   const restaurantName = "Asgard Catering";
  //   const restaurantTel = "123-456-7890";
  //   const restaurantEmail = "asgardcatering@example.com";

  //   // Sale details
  //   let cashierName = localStorage.getItem("username");
  //   const saleDetails = `
  //     Customer: ${customer}
  //     Cashier Name: ${cashierName}
  //     Date: ${moment(dateCreated).format("ll")}
  //     Order ID: ${orderId}
  //     Total Price: ${totalPrice}
  //   `;

  //   // Payment method
  //   const paymentDetails = `Payment Method: ${paymentMethod}`;

  //   // Table with purchased items
  //   const itemsTable = products.map((item, index) => (
  //     <tr key={index}>
  //       <td>{item.name}</td>
  //       <td>{item.price}</td>
  //     </tr>
  //   ));

  
  //   // Invoice template
  //   const invoiceTemplate = `
  //     <html>
  //       <head>
  //         <title>Invoice</title>
  //         <style>
  //           /* Add your CSS styles here */
  //           body {
  //             font-family: Arial, sans-serif;
  //           }
  //           table {
  //             width: 100%;
  //             border-collapse: collapse;
  //           }
  //           table td, table th {
  //             padding: 8px;
  //             text-align: left;
  //           }
  //           table th {
  //             background-color: #f2f2f2;
  //           }
  //         </style>
  //       </head>
  //       <body>
  //         <h1>${restaurantName}</h1>
  //         <p>Tel: ${restaurantTel}</p>
  //         <p>Email: ${restaurantEmail}</p>
  //         <h2>Sale Invoice</h2>
  //         <p>${saleDetails}</p>
  //         <table>
  //           <thead>
  //             <tr>
  //               <th>Item</th>
  //               <th>Price</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             ${itemsTable.join("")}
  //           </tbody>
  //         </table>
  //         <p>${paymentDetails}</p>
  //         <div>
  //           ${generateQRCode(orderId,customer,dateCreated)}
  //         </div>
  //         <p>&copy; ${new Date().getFullYear()} Asgard Catering. All rights reserved.</p>
  //       </body>
  //     </html>
  //   `;

  //   // Create a new window and write the invoice template to it
  //   const invoiceWindow = window.open("", "_blank");
  //   invoiceWindow.document.write(invoiceTemplate);

  //   // Close the invoice window after printing
  //   setTimeout(() => {
  //     invoiceWindow.print();
  //     invoiceWindow.close();
  //   }, 100);
  //   // console.log("Invoice Data:", invoiceData);
  // };
//  // Function to prepare and print the invoice
//  const generateAndPrintInvoice = () => {
//   // Prepare invoice data here (customer details, products, total amount, etc.)
//   const product = products.map((option) => ({
//     CookedFoodId: option.value,
//     quantity: option.quantity,
//   }));
//   const invoiceData = {
//     customer,
//     product,
//     paymentMethod,
//   };

//   // Create HTML template for the invoice
//   const invoiceTemplate = `
//   <html>
//     <head>
//       <title>Invoice</title>
//       <!-- Add your CSS styles here -->
//       <style>
//         /* CSS styles for the invoice */
//       </style>
//     </head>
//     <body>
//       <h1>Invoice</h1>
//       <!-- Populate the invoice data dynamically -->
//       <p>Customer: ${invoiceData.customer}</p>
//       <p>Payment Method: ${invoiceData.paymentMethod}</p>
//       <!-- Add more invoice details here as needed -->
//     </body>
//   </html>
// `;

//    // Create a new window and write the invoice template to it
//    const invoiceWindow = window.open("", "_blank");
//    invoiceWindow.document.write(invoiceTemplate);

//    // Close the invoice window after printing
//    setTimeout(() => {
//      invoiceWindow.print();
//      invoiceWindow.close();
//    }, 100);

//   // For demonstration purposes, log the invoice data
//   console.log("Invoice Data:", invoiceData);
// };

  function removeItemFromCart(index) {
    const updatedCartItems = products.filter((_, i) => i !== index);
    setProducts(updatedCartItems);
  }
  //get all products
  const fetchProducts = async () => {
    try {
      const fetched = await fetch(`${base_url}recipe/cookedFood`);
      const jsonData = await fetched.json();
      setPrdOptions(jsonData);
      // setProducts(jsonData);
    } catch (err) {
      toast.error(getError(err));
    }
  };
  // console.log(products)

  React.useEffect(() => {
    fetchProducts();
  }, []);

  const handleVegChange = (selectedOptions) => {
    setProducts(selectedOptions);
    // console.log(selectedOptions);
  };

  // Function to handle changes in quantity input
  const handleQuantityChange = (index, value) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity = parseInt(value) || 0;
    setProducts(updatedProducts);
  };

  const calculateTotalAmount = () => {
    let total = 0;
    products.forEach((product) => {
      total += product.price * product.quantity || product.price * 1;
    });
    return total;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = products.map((option) => ({
      CookedFoodId: option.value,
      quantity: option.quantity,
    }));
    const formData = {
      customer,
      paymentMethod: selectedPay.value,
      product,
      user_id:cashId,
      status:"Paid"
    };

    try {
      const response = await fetch(`${base_url}order/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(formData);
      console.log("Form submitted successfully", response);
      navigate("/cashier-dashboard/orders");
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  //get cashier id
  let cashId = localStorage.getItem("cashier_Id")

  //filter product < 0  & map the rest
  const availableProducts = prdOptions.filter(product => product.quantity > 0);
  const Options = availableProducts.map((item) => ({
    value: item.id,
    label: item.foodName,
    image: item.image,
    price: item.price,
  }));

  const options = [
    { value: "Cash", label: "Cash" },
    // { value: "Cheque", label: "Cheque" },
    { value: "Mpesa", label: "Mpesa" },
  ];

  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <Container>
        <Box sx={{ flex: 1, width: "100%" }}>
          {/* //header */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Breadcrumbs
              size="sm"
              aria-label="breadcrumbs"
              separator={<ChevronRightRoundedIcon fontSize="sm" />}
              sx={{ pl: 0 }}
            >
              <Link
                underline="none"
                color="neutral"
                href="#some-link"
                aria-label="Home"
              >
                <HomeRoundedIcon />
              </Link>
              <Link
                underline="hover"
                color="neutral"
                href="#some-link"
                fontSize={12}
                fontWeight={500}
              >
                Dashboard
              </Link>
              <Typography color="primary" fontWeight={500} fontSize={12}>
                Sales
              </Typography>
            </Breadcrumbs>
          </Box>
          <Box
            sx={{
              display: "flex",
              mb: 1,
              gap: 1,
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "start", sm: "center" },
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <Typography level="h2" component="h1">
              Create Order
            </Typography>
          </Box>

          {/* form */}
          <form onSubmit={handleSubmit}>
            <Stack
              spacing={4}
              sx={{
                display: "flex",
                mx: "auto",
                px: { xs: 2, md: 6 },
                py: { xs: 2, md: 3 },
              }}
            >
              <Card>
                <Stack
                  direction="row"
                  spacing={3}
                  sx={{ display: { xs: "none", md: "flex" }, my: 1 }}
                >
                  <Stack spacing={2} sx={{ flexGrow: 1, display: "flex" }}>
                    <div sx={{ display: "flex" }}>
                      <Stack direction="row" spacing={2}>
                        <FormControl sx={{ flexGrow: 1 }}>
                          <FormLabel>Customer Full Name</FormLabel>
                          <Input
                            sx={{ flexGrow: 1 }}
                            size="sm"
                            placeholder="Customer Full name"
                            value={customer}
                            required
                            onChange={(e) => setCustomer(e.target.value)}
                          />
                        </FormControl>
                      </Stack>
                      <FormControl
                        size="sm"
                        style={{ zIndex: 100, flexGrow: 1 }}
                      >
                        <FormLabel>Select Product</FormLabel>
                        <Select
                          isMulti
                          value={products}
                          onChange={handleVegChange}
                          options={[...Options]}
                        />
                      </FormControl>
                    </div>
                  </Stack>
                </Stack>
                <Sheet
                  className="OrderTableContainer"
                  variant="outlined"
                  sx={{
                    display: { xs: "none", sm: "initial" },
                    width: "100%",
                    borderRadius: "sm",
                    flexShrink: 1,
                    overflow: "auto",
                    minHeight: 0,
                  }}
                >
                  <Table
                  >
                    <thead>
                      <tr>
                        <th style={{ width: 140, padding: "12px 6px" }}>
                          Title
                        </th>

                        <th style={{ width: 140, padding: "12px 6px" }}>
                          Price
                        </th>
                        <th style={{ width: 140, padding: "12px 6px" }}>
                          Quantity
                        </th>

                        <th style={{ width: 240, padding: "12px 6px" }}>
                          Product
                        </th>
                        <th style={{ width: 140, padding: "12px 6px" }}>
                          Total
                        </th>
                        <th style={{ width: 140, padding: "12px 6px" }}>
                          Remove
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.length === 0 ? (
                        <tr>
                          <td colSpan="6">Cart is empty</td>
                        </tr>
                      ) : (
                        products.map((veg, index) => (
                          <tr key={index}>
                            <td>{veg.label}</td>
                            <td>Ksh. {veg.price}</td>
                            <td>
                              <Input
                                type="number"
                                value={veg.quantity}
                                onChange={(e) => {
                                  const inputValue = e.target.value.replace(
                                    /[^0-9]/g,
                                    ""
                                  ); // Remove non-numeric characters
                                  const numericValue = parseInt(inputValue, 10); // Convert string to number
                                  if (numericValue >= 1) {
                                    // Only update quantity if it's a non-negative number
                                    handleQuantityChange(index, numericValue);
                                  }
                                }}
                                defaultValue="1"
                              />
                            </td>

                            <td>
                              <Box
                                sx={{
                                  display: "flex",
                                  gap: 2,
                                  alignItems: "center",
                                }}
                              >
                                <Typography level="body-xs">
                                  <Avatar
                                    size="40"
                                    color={Avatar.getRandomColor("sitebase", [
                                      "rgb(233, 150, 150)",
                                      "rgb(164, 231, 164)",
                                      "rgb(236, 224, 167)",
                                      "rgb(174, 185, 233)",
                                    ])}
                                    // round={true}
                                    src={veg.image}
                                    alt={veg.label}
                                    // name={veg.label}
                                  />
                                </Typography>
                                <div>
                                  <Typography level="body-xs">
                                    {veg.label}
                                  </Typography>
                                  <Typography
                                    level="body-xs"
                                    sx={{ color: "green" }}
                                  >
                                    Available
                                  </Typography>
                                </div>
                              </Box>
                            </td>
                            <td>{veg.price * veg.quantity || veg.price * 1}</td>
                            <td>
                              {" "}
                              <Button
                                variant="outlined"
                                color="error"
                                // startIcon={<DeleteIcon />}
                                onClick={() => removeItemFromCart(index)}
                              >
                                <DeleteForever sx={{ color: "red" }}/>
                              </Button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>

                  <div style={{ marginTop: "1rem", marginLeft: "500px" }}>
                    <h6>
                      <b>Order Summary</b>
                    </h6>
                    <div style={{ width: "400px" }}>
                      <Table>
                        <tbody>
                          <tr>
                            <td>
                              <p>Payment Method</p>
                            </td>
                            <td>
                              <Select
                                options={options}
                                value={selectedPay}
                                onChange={setSelectedPay}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <p>Grand total</p>
                            </td>
                            <td>Ksh. {calculateTotalAmount()}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>

                    <div>
                      <button
                        // onClick={generateAndPrintInvoice}
                        style={{
                          width: "400px",
                          border: "none",
                          padding: "0.5rem 1rem",
                          borderRadius: "5px",
                          background: "rgb(174, 185, 233)",
                          color: "white",
                          cursor: "pointer",
                          marginBottom: "1rem",
                        }}
                      >
                        Generate and Print Invoice
                      </button>
                    </div>
                  </div>
                </Sheet>
              </Card>
            </Stack>
          </form>
        </Box>
      </Container>
    </div>
  );
}
