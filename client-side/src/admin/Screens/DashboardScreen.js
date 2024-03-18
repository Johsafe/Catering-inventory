import * as React from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import PaidIcon from "@mui/icons-material/Paid";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import { base_url, getError } from "../../Utils/Utils";
import { toast } from "react-toastify";
import SideBar from "../../Utils/AdminSideBar";
import DoughnutChart from "./PieChart";
import PolarAreaChart from "./PolarAreaChart";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 250,
  color: theme.palette.text.primary,
}));

export default function DashboardScreen() {
  const [productCount, setProductCount] = React.useState([]);
  const [orderCount, setOrderCount] = React.useState([]);
  const [OutofStockCount, setOutofStockCount] = React.useState([]);
  const [totalSales, setTotalSales] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [expiredProducts, setExpiredProducts] = React.useState([]);
  const [totalTodaysSales,setTotalTodaysSales]= React.useState([]);
  const [totalTodaysOrders,setTotalTodaysOrders]= React.useState([]);
  
  React.useEffect(() => {
    //get product count
    const fetchproductCount = async () => {
      try {
        const fetched = await fetch(`${base_url}stats/total-product-count`);
        const jsonData = await fetched.json();
        setProductCount(jsonData);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    //get items sold count
    const fetchOrderCount = async () => {
      try {
        const fetched = await fetch(`${base_url}stats/total-orders`);
        const jsonData = await fetched.json();
        setOrderCount(jsonData);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    //get out of stock count
    const fetchOutofStockCount = async () => {
      try {
        const fetched = await fetch(`${base_url}stats/out-of-stock-count`);
        const jsonData = await fetched.json();
        setOutofStockCount(jsonData);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    //get total amount after sales
    const fetchTotalSales = async () => {
      try {
        const fetched = await fetch(`${base_url}stats/total-amount-sold`);
        const jsonData = await fetched.json();
        setTotalSales(jsonData);
      } catch (err) {
        toast.error(getError(err));
      }
    };

    //get today total amount after sales
    const fetchTotalTodaysSales = async () => {
      try {
        const fetched = await fetch(`${base_url}stats/today-total-sales`);
        const jsonData = await fetched.json();
        setTotalTodaysSales(jsonData);
      } catch (err) {
        toast.error(getError(err));
      }
    };
     //get total amount after sales
     const fetchTotalTodaysOrders = async () => {
      try {
        const fetched = await fetch(`${base_url}stats/today-total-orders`);
        const jsonData = await fetched.json();
        setTotalTodaysOrders(jsonData);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    //Expired products
    const expiredProducts = async () => {
      try {
        const fetched = await fetch(`${base_url}stats/expired-product-count`);
        const jsonData = await fetched.json();
        setExpiredProducts(jsonData);
      } catch (err) {
        toast.error(getError(err));
      }
    };

    //get all product sold
    const allSoldProducts = async () => {
      try {
        const fetched = await fetch(`${base_url}stats/total-products-sold`);
        const jsonData = await fetched.json();
        setProducts(jsonData);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchTotalTodaysSales();
    fetchTotalTodaysOrders ();
    fetchproductCount();
    fetchOrderCount();
    fetchOutofStockCount();
    fetchTotalSales();
    allSoldProducts();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <Container>
        <React.Fragment>
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
              Dashboard
            </Typography>
          </Box>

          <div style={{ display: "flex", top: "30px", width: "100%" }}>
            <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3 }}>
              <StyledPaper
                sx={{
                  my: 1,
                  mx: "auto",
                  p: 2,
                }}
              >
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item>
                    <Avatar style={{ background: "rgb(174, 185, 233)" }}>
                      <PaidIcon style={{ color: "blue" }} />
                    </Avatar>
                  </Grid>
                  <Grid item xs>
                    <Typography>Total sales</Typography>
                    <Typography>Ksh.{" "}{totalSales}</Typography>
                  </Grid>
                </Grid>
              </StyledPaper>
            </Box>

            <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3 }}>
              <StyledPaper
                sx={{
                  my: 1,
                  mx: "auto",
                  p: 2,
                }}
              >
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item>
                    <Avatar style={{ background: " rgb(164, 231, 164)" }}>
                      <LocalMallIcon style={{ color: "green" }} />
                    </Avatar>
                  </Grid>
                  <Grid item xs>
                    <Typography>Total Invoices</Typography>
                    <Typography>{orderCount}</Typography>
                  </Grid>
                </Grid>
              </StyledPaper>
            </Box>

            <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3 }}>
              <StyledPaper
                sx={{
                  my: 1,
                  mx: "auto",
                  p: 2,
                }}
              >
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item>
                    <Avatar style={{ background: "rgb(236, 224, 167)" }}>
                      <ShoppingBasketIcon style={{ color: "orange" }} />
                    </Avatar>
                  </Grid>
                  <Grid item xs>
                    <Typography>Available Foods</Typography>
                    <Typography>{productCount}</Typography>
                  </Grid>
                </Grid>
              </StyledPaper>
            </Box>

            <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3 }}>
              <StyledPaper
                sx={{
                  my: 1,
                  mx: "auto",
                  p: 2,
                }}
              >
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item>
                    <Avatar style={{ background: "rgb(233, 150, 150)" }}>
                      <ProductionQuantityLimitsIcon style={{ color: "red" }} />
                    </Avatar>
                  </Grid>
                  <Grid item xs>
                    <Typography>
                      <Link
                        to="/out-of-stock"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        Expired
                      </Link>
                    </Typography>
                    {/* <Typography>{expiredProducts}</Typography> */}
                  </Grid>
                </Grid>
              </StyledPaper>
            </Box>
          </div>

          <div style={{ display: "flex", top: "30px", width: "100%" }}>
            <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3 }}>
              <StyledPaper
                sx={{
                  my: 1,
                  mx: "auto",
                  p: 2,
                }}
              >
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item>
                    <Avatar style={{ background: "rgb(174, 185, 233)" }}>
                      <PaidIcon style={{ color: "blue" }} />
                    </Avatar>
                  </Grid>
                  <Grid item xs>
                    <Typography>Today sales</Typography>
                    <Typography>Ksh.{" "}{totalTodaysSales}</Typography>
                  </Grid>
                </Grid>
              </StyledPaper>
            </Box>

            <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3 }}>
              <StyledPaper
                sx={{
                  my: 1,
                  mx: "auto",
                  p: 2,
                }}
              >
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item>
                    <Avatar style={{ background: " rgb(164, 231, 164)" }}>
                      <LocalMallIcon style={{ color: "green" }} />
                    </Avatar>
                  </Grid>
                  <Grid item xs>
                    <Typography>Today Invoice</Typography>
                    <Typography>{totalTodaysOrders}</Typography>
                  </Grid>
                </Grid>
              </StyledPaper>
            </Box>

            <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3 }}>
              <StyledPaper
                sx={{
                  my: 1,
                  mx: "auto",
                  p: 2,
                }}
              >
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item>
                    <Avatar style={{ background: "rgb(236, 224, 167)" }}>
                      <ShoppingBasketIcon style={{ color: "orange" }} />
                    </Avatar>
                  </Grid>
                  <Grid item xs>
                    <Typography>Foods Sold</Typography>
                    <Typography>{products}</Typography>
                  </Grid>
                </Grid>
              </StyledPaper>
            </Box>

            <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3 }}>
              <StyledPaper
                sx={{
                  my: 1,
                  mx: "auto",
                  p: 2,
                }}
              >
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item>
                    <Avatar style={{ background: "rgb(233, 150, 150)" }}>
                      <ProductionQuantityLimitsIcon style={{ color: "red" }} />
                    </Avatar>
                  </Grid>
                  <Grid item xs>
                    <Typography>
                      <Link
                        to="/out-of-stock"
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        Out of stock
                      </Link>
                    </Typography>
                    <Typography>{OutofStockCount}</Typography>
                  </Grid>
                </Grid>
              </StyledPaper>
            </Box>
          </div>
          <div style={{display:'flex',marginTop:'40px',gap:'3rem'}}>
            <PolarAreaChart/>
            <DoughnutChart/>
          </div>
        </React.Fragment>
      </Container>
    </div>
  );
}
