import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import IconButton, { iconButtonClasses } from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Divider from "@mui/joy/Divider";
import Select from "react-select";
import Option from "@mui/joy/Option";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import ModalClose from "@mui/joy/ModalClose";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import Avatar from "react-avatar";
import EditStockModal from "./EditProductStock";
import { Link } from "react-router-dom";
import { Container } from "@mui/material";
import { base_url, getError } from "../Utils/Utils";
import { toast } from "react-toastify";
import SideBar from "../Layout/sideBar";

export default function OutOfStock() {
  const [open, setOpen] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [filteredProducts, setFilteredProducts] = React.useState([]);
  const [section, setSection] = React.useState([]);
  const [category, setCategory] = React.useState([]);

  React.useEffect(() => {
    //get out-of-stock products
    const fetchProducts = async () => {
      try {
        const fetched = await fetch(`${base_url}stats/out-of-stock`);
        const jsonData = await fetched.json();
        const uniqueBrands = [
          ...new Set(jsonData.map((product) => product.brand)),
        ];
        const uniqueCate = [
          ...new Set(jsonData.map((product) => product.category)),
        ];
        setSection(uniqueBrands);
        setCategory(uniqueCate);
        setProducts(jsonData);
        setFilteredProducts(jsonData);
      } catch (err) {
        toast.error(getError(err));
      }
    };

    fetchProducts();
  }, []);

  // filter by brand
  function filterBrand(value) {
    if (value === "All") {
      setProducts(filteredProducts);
      return;
    }

    const brandFilteredProducts = filteredProducts.filter(
      (product) => product.brand === value
    );
    setProducts(brandFilteredProducts);
  }

  // filter by category
  function filterCate(value) {
    if (value === "All") {
      setProducts(filteredProducts);
      return;
    }

    const cateFilteredProducts = filteredProducts.filter(
      (product) => product.category === value
    );
    setProducts(cateFilteredProducts);
  }
  const brandOptions = section.map((brand) => ({ value: brand, label: brand }));
  const categoryOptions = category.map((cate) => ({
    value: cate,
    label: cate,
  }));

  // filter
  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm">
        <FormLabel>Brand</FormLabel>
        <Select
          size="sm"
          placeholder="Filter by brand"
          onChange={(e) => filterBrand(e.value)}
          options={[{ value: "All", label: "All" }, ...brandOptions]}
        />
      </FormControl>
      <FormControl size="sm">
        <FormLabel>Category</FormLabel>
        <Select
          size="sm"
          placeholder="Filter by category"
          onChange={(e) => filterCate(e.value)}
          options={[{ value: "All", label: "All" }, ...categoryOptions]}
        />
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
                Products
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
              Products Out Of Stock
            </Typography>
            <Link to="/product">
              <Button
                color="primary"
                // startDecorator={<AddIcon />}
                size="sm"
              >
                Back to products
              </Button>
            </Link>
          </Box>

          {/* search for products */}
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
              <FormLabel>Search for product</FormLabel>
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
                  <th style={{ width: 140, padding: "12px 6px" }}>Title</th>
                  <th style={{ width: 140, padding: "12px 6px" }}>Brand</th>
                  <th style={{ width: 140, padding: "12px 6px" }}>InStock</th>
                  <th style={{ width: 140, padding: "12px 6px" }}>Price</th>
                  <th style={{ width: 240, padding: "12px 6px" }}>Product</th>
                  <th style={{ width: 140, padding: "12px 6px" }}> </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.title}</td>
                    <td>{product.brand}</td>
                    <td>{product.inStock}</td>
                    <td>Ksh. {product.price}</td>
                    <td>
                      <Box
                        sx={{ display: "flex", gap: 2, alignItems: "center" }}
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
                            src={product.image}
                            alt={product.title}
                          />
                        </Typography>
                        <div>
                          <Typography level="body-xs">
                            {product.title}
                          </Typography>
                          <Typography level="body-xs">Laptop</Typography>
                        </div>
                      </Box>
                    </td>
                    <td>
                      <EditStockModal product={product} />
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
