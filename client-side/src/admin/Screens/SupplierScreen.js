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
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForever from "@mui/icons-material/DeleteForever";
import ButtonGroup from "@mui/material/ButtonGroup";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";
import { base_url, getError } from "../Utils/Utils";
import { toast } from "react-toastify";
import SideBar from "../Layout/sideBar";

// import { DeleteForever } from "@mui/icons-material";

export default function SupplierScreen() {
  const [open, setOpen] = React.useState(false);
  const [suppliers, setSuppliers] = React.useState([]);
  //get all Suppliers
  const fetchSuppliers = async () => {
    try {
      const fetched = await fetch(`${base_url}vendor/vendors`);
      const jsonData = await fetched.json();
      setSuppliers(jsonData);
    } catch (err) {
      toast.error(getError(err));
    }
  };

  React.useEffect(() => {
    fetchSuppliers();
  }, []);

  //delete supplier
  async function deleteSupplier(id) {
    try {
      await fetch(`${base_url}vendor/vendor/${id}`, {
        method: "DELETE",
      });
      setSuppliers(suppliers.filter((supplier) => supplier._id !== id));
      toast.success("Supplier deleted successfully");
    } catch (err) {
      toast.error(getError(err));
    }
  }

  //search by title
  const [search, setSearch] = React.useState("");
  const [searchResult, setSearchResult] = React.useState([]);
  const searchHandler = (searchValue) => {
    setSearch(searchValue);

    if (search !== "") {
      const newContactList = suppliers.filter((supplier) => {
        return supplier.name
          .join("")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setSearchResult(newContactList);
    } else {
      setSearchResult(suppliers);
    }
  };
  // filter
  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm" style={{ zIndex: 100 }}>
        <FormLabel>Brand</FormLabel>
        <Select size="sm" placeholder="Filter by brand" disabled />
      </FormControl>
      <FormControl size="sm" style={{ zIndex: 100 }}>
        <FormLabel>Category</FormLabel>
        <Select size="sm" placeholder="Filter by category" disabled />
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
              variant="outlined"
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
                  {/* {renderFilters()} */}
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
                Suppliers
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
              Suppliers
            </Typography>
            <Link to="/addsupplier">
              <Button
                color="primary"
                // startDecorator={<AddIcon />}
                size="sm"
              >
                Add Supplier
              </Button>
            </Link>
          </Box>

          {/* search for Suppliers */}
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
              <FormLabel>Search for supplier</FormLabel>
              <Input
                // size="sm"
                placeholder="Search"
                startDecorator={<SearchIcon />}
                onChange={(e) => searchHandler(e.target.value)}
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
                  <th style={{ width: 140, padding: "12px 6px" }}>Name</th>
                  <th style={{ width: 140, padding: "12px 6px" }}>Company</th>
                  <th style={{ width: 140, padding: "12px 6px" }}>Phone</th>
                  <th style={{ width: 140, padding: "12px 6px" }}>Address</th>
                  <th style={{ width: 240, padding: "12px 6px" }}>Supplier</th>
                  <th style={{ width: 140, padding: "12px 6px" }}> </th>
                </tr>
              </thead>
              <tbody>
                {search.length > 1
                  ? searchResult.map((supplier) => (
                      <tr key={supplier.id}>
                        <td>{supplier.name}</td>
                        <td>{supplier.company}</td>
                        <td>{supplier.phone}</td>
                        <td>{supplier.address}</td>
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
                                round={true}
                                src="https://material-kit-react.devias.io/assets/avatars/avatar-jie-yan-song.png"
                                name={supplier.name}
                                // alt={supplier.email}
                              />
                            </Typography>
                            <div>
                              <Typography level="body-xs">
                                {supplier.name}
                              </Typography>
                              <Typography level="body-xs">
                                {supplier.email}
                              </Typography>
                            </div>
                          </Box>
                        </td>
                        <td>
                          <div>
                            <ButtonGroup
                              variant="text"
                              aria-label="text button group"
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Link to={`/${supplier.id}/editsupplier`}>
                                <EditIcon style={{ color: "blue" }} />
                              </Link>
                              {/* <DeleteProductModel supplier={supplier} />
                               */}

                              <Button
                                onClick={() => deleteSupplier(supplier.id)}
                                style={{ background: "none" }}
                              >
                                {/* <DeleteIcon style={{ color: "red" }} /> */}
                                <DeleteForever sx={{ color: "red" }} />
                              </Button>
                            </ButtonGroup>
                          </div>
                        </td>
                      </tr>
                    ))
                  : suppliers.map((supplier) => (
                      <tr key={supplier.id}>
                        <td>{supplier.name}</td>
                        <td>{supplier.company}</td>
                        <td>{supplier.phone}</td>
                        <td>{supplier.address}</td>
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
                                round={true}
                                src="https://material-kit-react.devias.io/assets/avatars/avatar-jie-yan-song.png"
                                name={supplier.name}
                                // alt={supplier.email}
                              />
                            </Typography>
                            <div>
                              <Typography level="body-xs">
                                {supplier.name}
                              </Typography>
                              <Typography level="body-xs">
                                {supplier.email}
                              </Typography>
                            </div>
                          </Box>
                        </td>
                        <td>
                          <div>
                            <ButtonGroup
                              variant="text"
                              aria-label="text button group"
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <Link to={`/${supplier.id}/editsupplier`}>
                                <EditIcon style={{ color: "blue" }} />
                              </Link>
                              {/* <DeleteProductModel supplier={supplier} /> */}

                              <Button
                                onClick={() => deleteSupplier(supplier.id)}
                                style={{ background: "none" }}
                              >
                                {/* <DeleteIcon style={{ color: "red" }} /> */}
                                <DeleteForever sx={{ color: "red" }} />
                              </Button>
                            </ButtonGroup>
                          </div>
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
              mb: 5,
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
