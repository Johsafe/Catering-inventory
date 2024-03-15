import * as React from "react";
import GlobalStyles from "@mui/joy/GlobalStyles";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton, { listItemButtonClasses } from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import PaidIcon from "@mui/icons-material/Paid";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import QuestionAnswerRoundedIcon from "@mui/icons-material/QuestionAnswerRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import SupportRoundedIcon from "@mui/icons-material/SupportRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import BrightnessAutoRoundedIcon from "@mui/icons-material/BrightnessAutoRounded";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import BlockIcon from '@mui/icons-material/Block';
import GroupsIcon from '@mui/icons-material/Groups';
import ArticleIcon from '@mui/icons-material/Article';
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { base_url, getError } from "../Utils/Utils";
import { toast } from "react-toastify";


export default function SideBar() {
  const navigate = useNavigate();
  function logOut() {
    localStorage.clear();
    navigate("/login");
  }

  function closeSidebar() {
    if (typeof window !== "undefined") {
      document.documentElement.style.removeProperty("--SideNavigation-slideIn");
      document.body.style.removeProperty("overflow");
    }
  }
//low quanityt product
  const [lowQuantityProducts, setLowQuantityProducts] = React.useState([]);

  React.useEffect(() => {
    const fetchLowQuantity = async () => {
      try {
        const fetched = await fetch(
          `${base_url}recipe/cookedfood/low-quantity`
        );
        const jsonData = await fetched.json();
        setLowQuantityProducts(jsonData);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchLowQuantity();
  }, []);

  const notificationCount = lowQuantityProducts.length;
  return (
    <div>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>
      <Sheet
        className="Sidebar"
        sx={{
          position: { xs: "fixed", md: "sticky" },
          transform: {
            xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))",
            md: "none",
          },
          transition: "transform 0.4s, width 0.4s",
          zIndex: 10000,
          height: "100dvh",
          width: "var(--Sidebar-width)",
          top: 0,
          p: 2,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRight: "1px solid",
          borderColor: "divider",
        }}
      >
        <GlobalStyles
          styles={(theme) => ({
            ":root": {
              "--Sidebar-width": "220px",
              [theme.breakpoints.up("lg")]: {
                "--Sidebar-width": "240px",
              },
            },
          })}
        />
        <Box
          className="Sidebar-overlay"
          sx={{
            position: "fixed",
            zIndex: 9998,
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            opacity: "var(--SideNavigation-slideIn)",
            backgroundColor: "var(--joy-palette-background-backdrop)",
            transition: "opacity 0.4s",
            transform: {
              xs: "translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))",
              lg: "translateX(-100%)",
            },
          }}
          onClick={() => closeSidebar()}
        />
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <IconButton variant="soft" color="primary" size="sm">
            <BrightnessAutoRoundedIcon />
          </IconButton>
          <Typography level="title-lg">Asgard Co.</Typography>
        </Box>
        <Box
          sx={{
            minHeight: 0,
            overflow: "hidden auto",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            [`& .${listItemButtonClasses.root}`]: {
              gap: 1.5,
            },
          }}
        >
          <List
            size="sm"
            sx={{
              gap: 1,
              "--List-nestedInsetStart": "30px",
              "--ListItem-radius": (theme) => theme.vars.radius.sm,
            }}
          >
            <ListItem>
              <ListItemButton
                selected
                role="menuitem"
                component="a"
                href="/dashboard"
              >
                <DashboardRoundedIcon />
                <ListItemContent>
                  <Typography level="title-sm">Dashboard</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton role="menuitem" component="a" href="/product">
                <LocalMallIcon />
                <ListItemContent>
                  <Typography level="title-sm">Products</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>
            {/* <ListItem>
              <ListItemButton role="menuitem" component="a" href="/barcode">
                <LocalMallIcon />
                <ListItemContent>
                  <Typography level="title-sm">BarCode Scanner</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem> */}
            <ListItem>
              <ListItemButton role="menuitem" component="a" href="/supplier">
                <GroupsIcon/>
                <ListItemContent>
                  <Typography level="title-sm">Suppliers</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton role="menuitem" component="a" href="/foods">
                <GroupsIcon/>
                <ListItemContent>
                  <Typography level="title-sm">Foods</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton role="menuitem" component="a" href="/recipe">
                <ArticleIcon/>
                <ListItemContent>
                  <Typography level="title-sm">Recipes</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>
            
            {/* <ListItem>
              <ListItemButton role="menuitem" component="a" href="/purchaseorder">
                <ShoppingCartRoundedIcon />
                <ListItemContent>
                  <Typography level="title-sm">Purchase Orders</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem> */}
            <ListItem>
              <ListItemButton role="menuitem" component="a" href="/orders">
                <ShoppingCartRoundedIcon />
                <ListItemContent>
                  <Typography level="title-sm">Orders</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>
            {/* <ListItemButton role="menuitem" component="a" href="">
              <PaidIcon />
              <ListItemContent>
                <Typography level="title-sm">Transaction</Typography>
              </ListItemContent>
            </ListItemButton> */}
            <ListItem>
              <ListItemButton role="menuitem" component="a" href="/notification">
                <QuestionAnswerRoundedIcon />
                <ListItemContent>
                  <Typography level="title-sm">Notifications</Typography>
                </ListItemContent>
                <Chip size="sm" color="primary" variant="solid">
                  {notificationCount}
                </Chip>
              </ListItemButton>
            </ListItem>
            <ListItemButton role="menuitem" component="a" href="/users">
              <GroupRoundedIcon />
              <ListItemContent>
                <Typography level="title-sm">Users</Typography>
              </ListItemContent>
            </ListItemButton>

            <ListItem>
              <ListItemButton role="menuitem" component="a" href="/expired">
                <BlockIcon sx={{color:'red'}} />
                <ListItemContent>
                  <Typography level="title-sm" sx={{color:'red'}}>Expired</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>
          </List>

          <List
            size="sm"
            sx={{
              mt: "auto",
              flexGrow: 0,
              "--ListItem-radius": (theme) => theme.vars.radius.sm,
              "--List-gap": "8px",
              mb: 2,
            }}
          >
            <ListItem>
              <ListItemButton>
                <SupportRoundedIcon />
                Support
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>
                <SettingsRoundedIcon />
                Settings
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
        <Divider />
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Avatar
            variant="outlined"
            size="sm"
            src="https://material-kit-react.devias.io/assets/avatars/avatar-miron-vitold.png"
          />
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography level="title-sm">Admin Panel</Typography>
            <Typography level="body-xs">admin@test.com</Typography>
          </Box>
          <IconButton
            size="sm"
            variant="plain"
            color="neutral"
            onClick={logOut}
          >
            <LogoutRoundedIcon />
          </IconButton>
        </Box>
      </Sheet>
    </div>
  );
}
