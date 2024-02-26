import { LocalShipping, Person, Place, Print } from "@mui/icons-material";
import { Card, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { Box, Breadcrumbs, Typography } from "@mui/joy";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import Avatar from "react-avatar";
import { base_url, getError } from "../Utils/Utils";
import { toast } from "react-toastify";
import SideBar from "../Layout/sideBar";

export default function MarkOrderScreen() {
  const params = useParams();
  const [order, setOrder] = useState([]);
  //get an order
  async function getOrder() {
    try {
      const response = await fetch(
        `${base_url}order/orders/${params.id}`
      );
      const getorder = await response.json();
      setOrder(getorder);
    } catch (err) {
      toast.error(getError(err));
    }
  }
  useEffect(() => {
    getOrder();
  }, []);
  const styleIcon = {
    fontSize: "4.5rem",
    cursor: "pointer",
    borderRadius: "50%",
    backgroundColor: "#dddddd",
    padding: "20px",
    color: "green",
  };
  return (
    <div style={{ display: "flex" }}>
      
      <SideBar />
      <Helmet>
        <title>Order Details</title>
      </Helmet>
      <Container>
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
              href="/orders"
              fontSize={12}
              fontWeight={500}
            >
              Dashboard
            </Link>
            <Typography color="primary" fontWeight={500} fontSize={12}>
              Order
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
            Order Details
          </Typography>
        </Box>

        <div>
          {order ? (
            <Card sx={{ width: "100%" }}>
              <div className="cardheader">
                <div>
                  <p className="date">
                    {moment(order.createdAt).format("MMM Do YY")}
                  </p>
                  <p>{order.order_no}</p>
                  <p>Status: {order.orderStatus}</p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "2rem",
                    marginRight: "2rem",
                  }}
                >
                  <div lass="mb-2">
                    <select class="form-select" aria-label=" select example">
                      <option selected>Change Status</option>
                      <option value="pending">pending</option>
                      <option value="completed">completed</option>
                    </select>
                  </div>

                  <button className="btn btn-success">
                    {" "}
                    <Print />
                  </button>
                </div>
              </div>

              <div>
                <div className="subheader">
                  <div className="orderheaderdetails">
                    <div>
                      <Person style={styleIcon} />
                    </div>
                    <div>
                      <h5>Customer</h5>
                      <p>
                        {order.shippingAddress &&
                          order.shippingAddress.fname}{" "}
                          {order.shippingAddress &&
                          order.shippingAddress.sname}
                      </p>
                      <p>{order.shippingAddress &&
                          order.shippingAddress.email}</p>
                    </div>
                  </div>
                  <div className="orderheaderdetails">
                    <div>
                      <LocalShipping style={styleIcon} />
                    </div>
                    <div>
                      <h5>Order info</h5>
                      <p>
                        <strong>Shipping: </strong>
                        {order.shippingAddress && order.shippingAddress.city}
                      </p>
                      <p>
                        <strong>Pay Method : </strong>
                        {order.paymentMethod}
                      </p>
                      <p>
                        <strong>Paid: </strong>
                        not paid
                      </p>
                    </div>
                  </div>
                  <div className="orderheaderdetails">
                    <div>
                      <Place style={styleIcon} />
                    </div>
                    <div>
                      <h5>Deliver to</h5>
                      <p>
                        <strong>Address: </strong>
                        {order.shippingAddress && order.shippingAddress.address}
                      </p>
                      <p>
                        {order.shippingAddress &&
                          order.shippingAddress.postalCode}
                        ,{order.shippingAddress && order.shippingAddress.county}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="orderbody">
                  <div style={{ width: "60%" }}>
                    <table class="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col">Title</th>
                          <th scope="col">Product</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Price</th>
                        </tr>
                      </thead>
                      {order.OrderItems &&
                        order.OrderItems.map((item) => (
                          <tbody>
                            <tr>
                              <td>
                                {item.title}
                              </td>
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
                                    name="Product Name"
                                    src={item.image}
                                    alt={item.title}
                                  />
                                </Typography>
                                <div>
                                  <Typography level="body-xs">
                                    {item.title}
                                  </Typography>
                                  <Typography level="body-xs">
                                    Laptop
                                  </Typography>
                                </div>
                              </Box>
                              <td>{item.quantity}</td>
                              <td>Ksh.{item.price}</td>
                            </tr>
                          </tbody>
                        ))}
                    </table>
                  </div>
                  <div className="cost">
                    <h4>Order Summary</h4>
                    <div className="summary" style={{ width: "300px" }}>
                      <table class="table table-hover">
                        <tbody>
                          <tr>
                            <td>
                              <p>Subtotal</p>
                            </td>
                            <td>{order.totalAmount}</td>
                          </tr>

                          <tr>
                            <td>
                              <p>Shipping</p>
                            </td>
                            <td>Ksh.0</td>
                          </tr>
                          <tr>
                            <td>
                              <p>Grand total</p>
                            </td>
                            <td>{order.totalAmount}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div>
                      <button
                        style={{
                          border: "none",
                          padding: "0.5rem 0",
                          width: "300px",
                          borderRadius: "10px",
                          color: "white",
                          cursor: "pointer",
                          background: "rgb(164, 231, 164)",
                          marginBottom: "1rem",
                        }}
                      >
                        Mark As Delivered
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </Container>
    </div>
  );
}
