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

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
// import DeleteProductModel from "./DeleteProductModel";
import { Container } from "@mui/material";
import { base_url, getError } from "../../Utils/Utils";
import { toast } from "react-toastify";
import SideBar from "../../Utils/CashierSideBar";

export default function CashierProductScreen() {
  const [open, setOpen] = React.useState(false);

  const [products, setProducts] = React.useState([]);
  const [filteredProducts, setFilteredProducts] = React.useState([]);
  const [section, setSection] = React.useState([]);
  const [category, setCategory] = React.useState([]);
  //get all products
  const fetchProducts = async () => {
    try {
      const fetched = await fetch(`${base_url}recipe/cookedFood`);
      const jsonData = await fetched.json();
      // const uniqueBatch = [
      //   ...new Set(jsonData.map((product) => product.batch)),
      // ];
      // const uniqueCate = [
      //   ...new Set(jsonData.map((product) => product.category)),
      // ];
      // setSection(uniqueBatch);
      // setCategory(uniqueCate);
      setProducts(jsonData);
      setFilteredProducts(jsonData);
    } catch (err) {
      toast.error(getError(err));
    }
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  //search by title
  const [search, setSearch] = React.useState("");
  const [searchResult, setSearchResult] = React.useState([]);
  const searchHandler = (searchValue) => {
    setSearch(searchValue);

    if (search !== "") {
      const newList = products.filter((product) => {
        // return (product.title)
        // return Object.values(product.title)
        //   .join('')
        //   .toLowerCase()
        //   .includes(search.toLowerCase());
        return product.title
          .join("")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setSearchResult(newList);
    } else {
      setSearchResult(products);
    }
  };

  // filter by brand
  // function filterBatch(value){
  //   let productArray=[]
  //   filteredProducts.filter((product)=>{
  //     if(product.brand===value){
  //       productArray.push(product)
  //       setProducts(productArray)
  //     }else if(value==="All"){
  //       setProducts(filteredProducts)
  //     }
  //   })
  // }

  // filter by brand
  function filterBatch(value) {
    if (value === "All") {
      setProducts(filteredProducts);
      return;
    }

    const batchFilteredProducts = filteredProducts.filter(
      (product) => product.batch === value
    );
    setProducts(batchFilteredProducts);
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

  // // filter by category
  // function filterCate(value){
  //   let cateArray=[]
  //   filteredProducts.filter((product)=>{
  //     if(product.category===value){
  //       cateArray.push(product)
  //       setProducts(cateArray)
  //     }else if(value==="All"){
  //       setProducts(filteredProducts)
  //     }
  //   })
  // }
  // const uniqueBatch = [...new Set(products.map((product) => product.brand))];
  // const batchOptions = section.map((batch) => ({ value: batch, label: batch }));
  // const categoryOptions = category.map((cate) => ({
  //   value: cate,
  //   label: cate,
  // }));
  // filter
  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm" style={{ zIndex: 100 }}>
        <FormLabel>Batch</FormLabel>
        <Select
          disabled="true"
          size="sm"
          placeholder="Filter by brand"
          onChange={(e) => filterBatch(e.value)}
          // options={[{ value: "All", label: "All" }, ...batchOptions]}
        />
      </FormControl>
      <FormControl size="sm" style={{ zIndex: 100 }}>
        <FormLabel>Category</FormLabel>
        <Select
          disabled="true"
          size="sm"
          placeholder="Filter by category"
          onChange={(e) => filterCate(e.value)}
          // options={[{ value: "All", label: "All" }, ...categoryOptions]}
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
              Products
            </Typography>
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
                // size="sm"
                placeholder="Search"
                startDecorator={<SearchIcon />}
                onChange={(e) => searchHandler(e.target.value)}
              />
            </FormControl>
            {/* {renderFilters()} */}
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
                  <th style={{ width: 140, padding: "12px 6px" }}>Food Name</th>
                  <th style={{ width: 140, padding: "12px 6px" }}>Price</th>
                  <th style={{ width: 140, padding: "12px 6px" }}>Quantity</th>
                  <th style={{ width: 240, padding: "12px 6px" }}>Product</th>
                </tr>
              </thead>
              <tbody>
                {search.length > 1
                  ? searchResult.map((product) => (
                      <tr key={product.id}>
                        <td>{product.foodName}</td>
                        <td>Ksh. {product.price}.00</td>
                        <td>{product.quantity}</td>
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
                                src={product.image}
                                alt={product.foodName}
                              />
                            </Typography>
                            <div>
                              <Typography level="body-xs">
                                {product.foodName}
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
                      </tr>
                    ))
                  : products.map((product) => (
                      <tr key={product.id}>
                        <td>{product.foodName}</td>
                        <td>Ksh. {product.price}.00</td>
                        <td>{product.quantity}</td>
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
                                src={product.image}
                                alt={product.foodName}
                              />
                            </Typography>
                            <div>
                              <Typography level="body-xs">
                                {product.foodName}
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
