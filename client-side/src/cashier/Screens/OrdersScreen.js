import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";
import Select from "react-select";
import Option from "@mui/joy/Option";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";
import Breadcrumbs from "@mui/joy/Breadcrumbs";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import moment from "moment";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import { Container, stepIconClasses } from "@mui/material";
import { base_url, getError } from "../../Utils/Utils";
import { toast } from "react-toastify";
import SideBar from "../../Utils/CashierSideBar";
import QRCode from "react-qr-code";
// import moment from "moment";

function RowMenu({ order }) {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "plain", color: "neutral", size: "sm" } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem>
          <Link to={`/${order.id}/orders/mark`}>View</Link>
        </MenuItem>
        <Divider />
        <MenuItem color="danger">Delete</MenuItem>
      </Menu>
    </Dropdown>
  );
}

export default function CashierOrdersScreen() {
  const [open, setOpen] = React.useState(false);
  const [paid, setPaid] = React.useState([]);
  const [status, setStatus] = React.useState([]);
  const [filteredOrders, setFilteredOrders] = React.useState([]);

  
  const [orderId, setOrderId] = React.useState("");
  // const [id, setId] = React.useState("");
  const [dateCreated, setDateCreated] = React.useState("");
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [customer, setCustomer] = React.useState("");
  const [pos, setPos] = React.useState("");
  const [products, setProducts] = React.useState([]);

  // Function to generate QR code
  const generateQRCode = (text) => {
    return (
      <div style={{ textAlign: "center" }}>
        <QRCode value={text} size={128} />
      </div>
    );
  };
  // {`${orderId} ${dateCreated} ${customer}`} 
  
  
  
  // Function to generate and print the invoice
    async function generateAndPrintInvoice(id) {

      // Function to fetch order details from the backend
  const fetchOrderDetails = async (id) => {
    try {
      const response = await fetch(`${base_url}order/orders/${id}`);
      const data = await response.json();
      setOrderId(data.order_no);
      setDateCreated(data.createdAt);
      setTotalPrice(data.total);
      setCustomer(data.customer)
      setPos(data.paymentMethod)
      setProducts(data.OrderItems)
      console.log(data)
      // setCashierName(data.cashierName);
      // You might also want to set other state variables such as customer and products if they are fetched from the backend
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  // React.useEffect(() => {
  //   fetchOrderDetails();
  // }, []);

    // Restaurant details
    const restaurantName = "Asgard Catering";
    const restaurantTel = "123-456-7890";
    const restaurantEmail = "asgardcatering@example.com";

    // Sale details
    let cashierName = localStorage.getItem("username");
    const saleDetails = `
      Customer: ${customer}
      Cashier Name: ${cashierName}
      Date: ${moment(dateCreated).format("ll")}
      Order ID: ${orderId}
      Total Price: ${totalPrice}
    `;

    // Payment method
    const paymentDetails = `Payment Method: ${pos}`;

    // Table with purchased items
    const itemsTable = products.map((item, index) => (
      <tr key={index}>
        <td>{item.name}</td>
        <td>{item.price}</td>
      </tr>
    ));

  
    // Invoice template
    const invoiceTemplate = `
      <html>
        <head>
          <title>Invoice</title>
          <style>
            /* Add your CSS styles here */
            body {
              font-family: Arial, sans-serif;
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
          </style>
        </head>
        <body>
          <h1>${restaurantName}</h1>
          <p>Tel: ${restaurantTel}</p>
          <p>Email: ${restaurantEmail}</p>
          <h2>Sale Invoice</h2>
          <p>${saleDetails}</p>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsTable.join("")}
            </tbody>
          </table>
          <p>${paymentDetails}</p>
          <div>
            ${generateQRCode(orderId,customer,dateCreated)}
          </div>
          <p>&copy; ${new Date().getFullYear()} Asgard Catering. All rights reserved.</p>
        </body>
      </html>
    `;

    // Create a new window and write the invoice template to it
    const invoiceWindow = window.open("", "_blank");
    invoiceWindow.document.write(invoiceTemplate);

    // Close the invoice window after printing
    setTimeout(() => {
      invoiceWindow.print();
      invoiceWindow.close();
    }, 100);
    // console.log("Invoice Data:", invoiceData);
  };

  //fetch order
  const [orders, setOrders] = React.useState([]);
  React.useEffect(() => {
    const fetchOrder = async () => {
      try {
        const fetched = await fetch(`${base_url}order/orders`);
        const jsonData = await fetched.json();
        const uniqueStatus = [
          ...new Set(jsonData.map((status) => status.orderStatus)),
        ];
        const uniquePay = [
          ...new Set(jsonData.map((product) => product.isPaid)),
        ];
        setOrders(jsonData);
        setStatus(uniqueStatus);
        setPaid(uniquePay);
        setFilteredOrders(jsonData);
        // setId(jsonData.id)
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchOrder();
  }, []);
  // filter by Status
  function filterStatus(value) {
    if (value === "All") {
      setOrders(filteredOrders);
      return;
    }

    const statusFilteredOrders = filteredOrders.filter(
      (status) => status.orderStatus === value
    );
    setOrders(statusFilteredOrders);
  }
  const statusOptions = status.map((s) => ({
    value: s,
    label: s,
  }));

  // filter
  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm" style={{ zIndex: 100 }}>
        <FormLabel>Status</FormLabel>
        <Select
          size="sm"
          placeholder="All"
          disabled
          onChange={(e) => filterStatus(e.value)}
          options={[{ value: "All", label: "All" }, ...statusOptions]}
        />
      </FormControl>
      <FormControl size="sm">
        <FormLabel>Payment Method</FormLabel>
        <Select size="sm" placeholder="All">
          <Option value="all">All</Option>
          <Option value="pending">Pending</Option>
          <Option value="Completed">Completed</Option>
        </Select>
      </FormControl>
    </React.Fragment>
  );
  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <Container>
        <React.Fragment>
          <Sheet
            className="SearchAndFilters-mobile"
            sx={{
              display: { xs: "flex", sm: "none" },
              my: 1,
              gap: 1,
            }}
          >
            <Input
              size="sm"
              placeholder="Search"
              startDecorator={<SearchIcon />}
              sx={{ flexGrow: 1 }}
            />
            <IconButton
              size="sm"
              variant="outlined"
              color="neutral"
              onClick={() => setOpen(true)}
            >
              <FilterAltIcon />
            </IconButton>
            <Modal open={open} onClose={() => setOpen(false)}>
              <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
                <ModalClose />
                <Typography id="filter-modal" level="h2">
                  Filters
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Sheet
                  sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                  {renderFilters()}
                  <Button color="primary" onClick={() => setOpen(false)}>
                    Submit
                  </Button>
                </Sheet>
              </ModalDialog>
            </Modal>
          </Sheet>
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
                Orders
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
              Orders
            </Typography>
            <Button
              color="primary"
              startDecorator={<DownloadRoundedIcon />}
              size="sm"
            >
              Download PDF
            </Button>
          </Box>

          {/* search for order */}
          <Box
            className="SearchAndFilters-tabletUp"
            sx={{
              borderRadius: "sm",
              py: 2,
              display: { xs: "none", sm: "flex" },
              flexWrap: "wrap",
              gap: 1.5,
              "& > *": {
                minWidth: { xs: "120px", md: "160px" },
              },
            }}
          >
            <FormControl sx={{ flex: 1 }} size="sm">
              <FormLabel>Search for order</FormLabel>
              <Input
                size="sm"
                placeholder="Search"
                startDecorator={<SearchIcon />}
              />
            </FormControl>
            {renderFilters()}
          </Box>
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
              aria-labelledby="tableTitle"
              stickyHeader
              hoverRow
              sx={{
                "--TableCell-headBackground":
                  "var(--joy-palette-background-level1)",
                "--Table-headerUnderlineThickness": "1px",
                "--TableRow-hoverBackground":
                  "var(--joy-palette-background-level1)",
                "--TableCell-paddingY": "4px",
                "--TableCell-paddingX": "8px",
              }}
            >
              <thead>
                <tr>
                  <th style={{ width: 120, padding: "12px 6px" }}>Invoice</th>
                  <th style={{ width: 140, padding: "12px 6px" }}>Date</th>
                  <th style={{ width: 140, padding: "12px 6px" }}>
                    Payment Method
                  </th>
                  <th style={{ width: 140, padding: "12px 6px" }}>
                    Total Amount
                  </th>
                  <th style={{ width: 240, padding: "12px 6px" }}>Customer</th>
                  <th style={{ width: 140, padding: "12px 6px" }}> </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>
                      <Typography level="body-xs">{order.order_no}</Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">
                        {moment(order.createdAt).format("ll")}
                      </Typography>
                    </td>
                    <td>{order.paymentMethod}</td>
                    <td>Ksh. {order.total}.00</td>
                    <td>
                      <Box
                        sx={{ display: "flex", gap: 2, alignItems: "center" }}
                      >
                        <Avatar
                          size="40"
                          color={Avatar.getRandomColor("sitebase", [
                            "rgb(233, 150, 150)",
                            "rgb(164, 231, 164)",
                            "rgb(236, 224, 167)",
                            "rgb(174, 185, 233)",
                          ])}
                          round={true}
                          // name={`${order.customer} ${order.shippingAddress.sname}`}
                          name={order.customer}
                        />
                        <div>
                          <Typography level="body-xs">
                            {order.customer}
                          </Typography>
                          <Typography level="body-xs">
                            Customer@gmail.com
                          </Typography>
                        </div>
                      </Box>
                    </td>
                    <td>
                      <Box
                        sx={{ display: "flex", gap: 2, alignItems: "center" }}
                      >
                        <Link level="body-xs" component="button" onClick={() => generateAndPrintInvoice(order.id)}>
                          Download
                        </Link>
                        <RowMenu order={order} />
                      </Box>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Sheet>
          <Box
            className="Pagination-laptopUp"
            sx={{
              pt: 2,
              gap: 1,
              [`& .${iconButtonClasses.root}`]: { borderRadius: "50%" },
              display: {
                xs: "none",
                md: "flex",
              },
            }}
          >
            <Button
              size="sm"
              variant="outlined"
              color="neutral"
              startDecorator={<KeyboardArrowLeftIcon />}
            >
              Previous
            </Button>

            <Box sx={{ flex: 1 }} />
            {["1", "2", "3", "…", "8", "9", "10"].map((page) => (
              <IconButton
                key={page}
                size="sm"
                variant={Number(page) ? "outlined" : "plain"}
                color="neutral"
              >
                {page}
              </IconButton>
            ))}
            <Box sx={{ flex: 1 }} />

            <Button
              size="sm"
              variant="outlined"
              color="neutral"
              endDecorator={<KeyboardArrowRightIcon />}
            >
              Next
            </Button>
          </Box>
        </React.Fragment>
      </Container>
    </div>
  );
}
