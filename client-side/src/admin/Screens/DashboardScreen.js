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
import { Card } from "@mui/material";
import SalesChart from "./SalesChart";
// import { Pie } from "react-chartjs-2";

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
        const fetched = await fetch(`${base_url}stats/total-sold`);
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

    //get all ordered items
    const allSoldProducts = async () => {
      try {
        const fetched = await fetch(`${base_url}order/allorders`);
        const jsonData = await fetched.json();
        setProducts(jsonData);
      } catch (err) {
        toast.error(getError(err));
      }
    };

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
                    <Typography>Ksh.{totalSales}</Typography>
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
                    <Typography>Product Sold</Typography>
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
                    <Avatar style={{ background: " rgb(164, 231, 164)" }}>
                      <LocalMallIcon style={{ color: "green" }} />
                    </Avatar>
                  </Grid>
                  <Grid item xs>
                    <Typography>Total Product</Typography>
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
                      <Link to="/out-of-stock">Out of stock</Link>
                    </Typography>
                    <Typography>{OutofStockCount}</Typography>
                  </Grid>
                </Grid>
              </StyledPaper>
            </Box>
          </div>
          {/* <div>
            <Card>
              <Pie
                data={{
                  labels: products.map((data) => data.title),
                  datasets: [
                    {
                      label: "Sold Items",
                      data: products.map((data) => data.quantity),
                    },
                  ],
                }}
              />
            </Card>
          </div> */}
        </React.Fragment>
      </Container>
    </div>
  );
}
