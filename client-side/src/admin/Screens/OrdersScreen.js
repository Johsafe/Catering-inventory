import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
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
// import EditIcon from "@mui/icons-material/Edit";
import ButtonGroup from "@mui/material/ButtonGroup";
import DeleteForever from "@mui/icons-material/DeleteForever";
import Breadcrumbs from "@mui/joy/Breadcrumbs";


import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import moment from "moment";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";
import { base_url, getError } from "../../Utils/Utils";
import { toast } from "react-toastify";
import SideBar from "../../Utils/AdminSideBar";
import AdminDownloadScreen from "./DownloadInvoiceAdmin";

// function RowMenu({ order,deleteOrder }) {
//   return (
//     <Dropdown>
//       <MenuButton
//         slots={{ root: IconButton }}
//         slotProps={{ root: { variant: "plain", color: "neutral", size: "sm" } }}
//       >
//         <MoreHorizRoundedIcon />
//       </MenuButton>
//       <Menu size="sm" sx={{ minWidth: 140 }}>
//         <MenuItem>Edit</MenuItem>
//         <MenuItem>
//           <Link to={`/admin-dashboard/${order.id}/orders/mark`}>View</Link>
//         </MenuItem>
//         <Divider />
//         <MenuItem color="danger" onClick={() => deleteOrder(order.id)}>Delete</MenuItem>
//       </Menu>
//     </Dropdown>
//   );
// }

export default function OrdersScreen() {
  const [open, setOpen] = React.useState(false);
  const [paid, setPaid] = React.useState([]);
  const [status, setStatus] = React.useState([]);
  const [filteredOrders, setFilteredOrders] = React.useState([]);

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
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchOrder();
  }, []);
  //  //delete order
   async function deleteOrder(id) {
    try {
      await fetch(`${base_url}order/order/${id}`, {
        method: "DELETE",
      });
      setOrders(orders.filter((order) => order.id !== id));
      toast.success("Order deleted successfully");
    } catch (err) {
      toast.error(getError(err));
    }
  }

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
          placeholder="Filter by brand"
          onChange={(e) => filterStatus(e.value)}
          options={[{ value: "All", label: "All" }, ...statusOptions]}
        />
      </FormControl>
      <FormControl size="sm">
        <FormLabel>Category</FormLabel>
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
                        <AdminDownloadScreen orderId={order.id} />
                        {/* <RowMenu order={order} deleteOrder={deleteOrder(order.id)} /> */}
                          <div>
                            <ButtonGroup
                              variant="text"
                              aria-label="text button group"
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              {/* <Link to={`/admin-dashboard/${order.id}/edit`}>
                                <EditIcon style={{ color: "blue" }} />
                              </Link> */}
                              <Button
                                onClick={() => deleteOrder(order.id)}
                                style={{ background: "none" }}
                              >
                                <DeleteForever sx={{ color: "red" }} />
                              </Button>
                            </ButtonGroup>
                          </div>
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
