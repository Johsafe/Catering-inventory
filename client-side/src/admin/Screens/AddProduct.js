import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Textarea from "@mui/joy/Textarea";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import Card from "@mui/joy/Card";
import Select from "react-select";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";

import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import { toast } from "react-toastify";
import SideBar from "../../Utils/AdminSideBar";
import { base_url, getError } from "../../Utils/Utils";

export default function AddProduct() {
  //image
  const handleLinkClick = () => {
    document.getElementById("image").click();
  };

  //post data
  const navigate = useNavigate();
  const [title, setTitle] = React.useState("");
  const [batch, setBatch] = React.useState("");
  const [cost, setCost] = React.useState("");
  const [inStock, setInStock] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [image, setImage] = React.useState([]);

  const [category, setCategory] = React.useState("");
  const [expire, setExpire] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [supplierId, setSupplier] = React.useState(null);
  const [getSupplier, setGetSupplier] = React.useState([]);

  //add product function
  const addProduct = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("title", title);
    data.append("batch", batch);
    data.append("cost", cost);
    data.append("inStock", inStock);
    data.append("category", category);
    data.append("description", description);
    data.append("image", image);
    data.append("expire", expire);
    data.append("status", status);
    data.append("supplierId", supplierId.value);

    try {
      const prdct = await fetch(`${base_url}product/create`, {
        method: "POST",
        body: data,
      });
      navigate("/admin-dashboard/product");
      console.log(prdct);
      toast.success("Product added successfully");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  // Function to handle select change
  const handleSelectChange = (selectedOption) => {
    setSupplier(selectedOption);
  };

  //get all supplier
  const fetchSupplier = async () => {
    try {
      const fetched = await fetch(`${base_url}vendor/vendors`);
      const jsonData = await fetched.json();
      setGetSupplier(jsonData);
    } catch (err) {
      toast.error(getError(err));
    }
  };
  React.useEffect(() => {
    fetchSupplier();
  }, []);

  const options = getSupplier.map((item) => ({
    value: item.id,
    label: item.company,
  }));

  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <Container>
        <Box sx={{ flex: 1, width: "100%" }}>
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
              Add Product
            </Typography>
            <Link to="/product">
              <Button
                color="primary"
                // startDecorator={<AddIcon />}
                size="sm"
              >
                Back to Product
              </Button>
            </Link>
          </Box>

          {/* form */}
          <Stack
            spacing={4}
            sx={{
              display: "flex",
              mx: "auto",
              px: { xs: 2, md: 6 },
              py: { xs: 2, md: 3 },
            }}
          >
            <Card>
              <Stack
                direction="row"
                spacing={3}
                sx={{ display: { xs: "none", md: "flex" }, my: 1 }}
              >
                <div>
                  <Stack direction="column" spacing={1}>
                    <AspectRatio
                      ratio="1"
                      maxHeight={300}
                      sx={{ flex: 1, minWidth: 250 }}
                    >
                      <img
                        srcSet="https://smartbuy.co.ke/wp-content/uploads/woocommerce-placeholder-300x300.png"
                        loading="lazy"
                      />
                    </AspectRatio>
                  </Stack>
                  <div style={{ marginTop: "1rem" }}>
                    <Button
                      size="sm"
                      variant="solid"
                      onClick={addProduct}
                      sx={{ width: "100%" }}
                      type="submit"
                    >
                      Add Product
                    </Button>
                  </div>
                </div>
                <Stack spacing={2} sx={{ flexGrow: 1 }}>
                  <Stack direction="row" spacing={2}>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <FormLabel>Product Name</FormLabel>
                      <Input
                        size="sm"
                        placeholder="Tomato"
                        sx={{ flexGrow: 1 }}
                        value={title}
                        required
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </FormControl>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <FormLabel>Product Batch</FormLabel>
                      <Input
                        size="sm"
                        type="text"
                        placeholder="e.g January"
                        sx={{ flexGrow: 1 }}
                        value={batch}
                        required
                        onChange={(e) => setBatch(e.target.value)}
                      />
                    </FormControl>
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <FormLabel>Product Cost</FormLabel>
                      <Input
                        sx={{ flexGrow: 1 }}
                        size="sm"
                        placeholder="e.g 12000"
                        type="number"
                        value={cost}
                        required
                        onChange={(e) => setCost(e.target.value)}
                      />
                    </FormControl>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <FormLabel>Product Stock</FormLabel>
                      <Input
                        sx={{ flexGrow: 1 }}
                        size="sm"
                        placeholder="e.g 8"
                        value={inStock}
                        required
                        onChange={(e) => setInStock(e.target.value)}
                      />
                    </FormControl>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <FormLabel>Product Category</FormLabel>
                      <Input
                        size="sm"
                        placeholder="Vegetable"
                        sx={{ flexGrow: 1 }}
                        value={category}
                        required
                        onChange={(e) => setCategory(e.target.value)}
                      />
                    </FormControl>
                  </Stack>

                  <Stack direction="row" spacing={2}>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <FormLabel>Product Expire Date</FormLabel>
                      <Input
                        sx={{ flexGrow: 1 }}
                        size="sm"
                        placeholder="e.g 27-9-2024"
                        value={expire}
                        required
                        onChange={(e) => setExpire(e.target.value)}
                      />
                    </FormControl>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <FormLabel>Product Status</FormLabel>
                      <Input
                        sx={{ flexGrow: 1 }}
                        size="sm"
                        placeholder="e.g instock"
                        value={status}
                        required
                        onChange={(e) => setStatus(e.target.value)}
                      />
                    </FormControl>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <FormLabel>Product Supplier</FormLabel>
                      <Select
                        options={options}
                        value={supplierId}
                        onChange={handleSelectChange}
                        placeholder="Select a Supplier"
                      />
                    </FormControl>
                  </Stack>

                  <Stack spacing={2} sx={{ my: 1 }}>
                    <FormLabel> Product Description</FormLabel>
                    <Textarea
                      size="sm"
                      minRows={4}
                      sx={{ mt: 1.5 }}
                      placeholder="Write a description about the product."
                      value={description}
                      required
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Stack>
                  <Stack spacing={2} sx={{ my: 1 }}>
                    <FormLabel> Product Image</FormLabel>
                    <Card
                      variant="soft"
                      sx={[
                        {
                          borderRadius: "sm",
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                          alignItems: "center",
                          px: 3,
                          flexGrow: 1,
                          boxShadow: "none",
                        },
                      ]}
                    >
                      <AspectRatio
                        ratio="1"
                        variant="solid"
                        color="primary"
                        sx={{
                          minWidth: 32,
                          borderRadius: "50%",
                          "--Icon-fontSize": "16px",
                        }}
                      >
                        <div>{<FileUploadRoundedIcon />}</div>
                      </AspectRatio>
                      <Typography level="body-sm" textAlign="center">
                        <Link
                          component="button"
                          overlay
                          onClick={handleLinkClick}
                        >
                          Click to upload
                        </Link>{" "}
                        <input
                          type="file"
                          class="form-control"
                          hidden="true"
                          accept="image/*"
                          onChange={(e) => setImage(e.target.files[0])}
                          id="image"
                        />
                        or drag and drop
                        <br /> SVG, PNG, JPG or GIF (max. 800x400px)
                      </Typography>
                    </Card>
                  </Stack>
                </Stack>
              </Stack>
            </Card>
          </Stack>
        </Box>
      </Container>
    </div>
  );
}
