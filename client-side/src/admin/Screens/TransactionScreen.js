import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Link from "@mui/joy/Link";
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
import { Breadcrumbs } from "@mui/joy";
import BlockIcon from "@mui/icons-material/Block";
import Avatar from "react-avatar";
import { Container } from "@mui/material";
import SideBar from "../Layout/sideBar";

const rows = [
  {
    id: "INV-1227",
    date: "Feb 3, 2023",
    tranx: "QERTYU",
    status: "Paid",
    amount: 559.0,
    avatar:"https://material-kit-react.devias.io/assets/avatars/avatar-miron-vitold.png",
    customer: {
      initial: "S",
      name: "Sachin Flynn",
      phone: "254766786789",
    },
  },
  {
    id: "INV-1226",
    date: "Feb 3, 2023",
    tranx: "QEFGHN",
    status: "Cancelled",
    amount: 989.0,
    avatar:"https://material-kit-react.devias.io/assets/avatars/avatar-iulia-albu.png",
    customer: {
      initial: "B",
      name: "Bradley Rosales",
      phone: "254766789590",
    },
  },
  {
    id: "INV-1221",
    date: "Feb 3, 2023",
    tranx: "QYUIOP",
    status: "Refunded",
    amount: 67999.0,
    avatar:"https://material-kit-react.devias.io/assets/avatars/avatar-nasimiyu-danai.png",
    customer: {
      initial: "M",
      name: "Maria Macdonald",
      phone: "25476654456",
    },
  },
  {
    id: "INV-1220",
    date: "Feb 3, 2023",
    tranx: "QRTYUI",
    status: "Paid",
    amount: 30059.0,
    avatar:"https://material-kit-react.devias.io/assets/avatars/avatar-jie-yan-song.png",
    customer: {
      initial: "C",
      name: "Charles Fulton",
      phone: "254766789456",
    },
  },
  {
    id: "INV-1219",
    date: "Feb 3, 2023",
    tranx: "QERTYU",
    status: "Cancelled",
    amount: 989659.0,
    avatar:"https://material-kit-react.devias.io/assets/avatars/avatar-omar-darboe.png",
    customer: {
      initial: "J",
      name: "Jay Hooper",
      phone: "254765467890",
    },
  },
  {
    id: "INV-1216",
    date: "Feb 3, 2023",
    tranx: "QWERTY",
    status: "Refunded",
    amount: 679659.0,
    avatar:"https://material-kit-react.devias.io/assets/avatars/avatar-anika-visser.png",
    customer: {
      initial: "A",
      name: "Anika Rosales",
      phone: "254765432456",
    },
  },
];

function RowMenu() {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "plain", color: "neutral", size: "sm" } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem>Edit</MenuItem>
        <MenuItem>View</MenuItem>
        <Divider />
        <MenuItem color="danger">Delete</MenuItem>
      </Menu>
    </Dropdown>
  );
}

export default function TransactionScreen() {
  const [open, setOpen] = React.useState(false);
  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <FormLabel>Status</FormLabel>
        <Select
          size="sm"
          placeholder="Filter by status"
          slotProps={{ button: { sx: { whiteSpace: "nowrap" } } }}
        >
          <Option value="paid">Paid</Option>
          <Option value="pending">Pending</Option>
          <Option value="refunded">Refunded</Option>
          <Option value="cancelled">Cancelled</Option>
        </Select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel>Category</FormLabel>
        <Select size="sm" placeholder="All">
          <Option value="all">All</Option>
          <Option value="refund">Refund</Option>
          <Option value="purchase">Purchase</Option>
          <Option value="debit">Debit</Option>
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
                Transactions
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
              Transactions
            </Typography>
            <Button
              color="primary"
              startDecorator={<DownloadRoundedIcon />}
              size="sm"
            >
              Download PDF
            </Button>
          </Box>

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
              <FormLabel>Search for transaction</FormLabel>
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
                  <th style={{ width: 120, padding: "12px 6px" }}>Tranx_Id</th>
                  <th style={{ width: 140, padding: "12px 6px" }}>Date</th>
                  <th style={{ width: 140, padding: "12px 6px" }}>Invoice</th>
                  <th style={{ width: 140, padding: "12px 6px" }}>Amount</th>
                  <th style={{ width: 140, padding: "12px 6px" }}>Status</th>
                  <th style={{ width: 240, padding: "12px 6px" }}>Customer</th>
                  <th style={{ width: 140, padding: "12px 6px" }}> </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <Typography level="body-xs">{row.tranx}</Typography>
                    </td>

                    <td>
                      <Typography level="body-xs">{row.date}</Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">{row.id}</Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">Ksh. {row.amount}</Typography>
                    </td>
                    <td>
                      <Chip
                        variant="soft"
                        size="sm"
                        startDecorator={
                          {
                            Paid: <CheckRoundedIcon />,
                            Refunded: <AutorenewRoundedIcon />,
                            Cancelled: <BlockIcon />,
                          }[row.status]
                        }
                        color={
                          {
                            Paid: "success",
                            Refunded: "neutral",
                            Cancelled: "danger",
                          }[row.status]
                        }
                      >
                        {row.status}
                      </Chip>
                    </td>
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
                          src={row.avatar}
                          name={row.customer.name}
                        />
                        <div>
                          <Typography level="body-xs">
                            {row.customer.name}
                          </Typography>
                          <Typography level="body-xs">
                            {row.customer.phone}
                          </Typography>
                        </div>
                      </Box>
                    </td>
                    <td>
                      <Box
                        sx={{ display: "flex", gap: 2, alignItems: "center" }}
                      >
                        <Link level="body-xs" component="button">
                          Download
                        </Link>
                        <RowMenu />
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
