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

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";

import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import { toast } from "react-toastify";
import SideBar from "../../Utils/AdminSideBar";
import Select from "react-select";
import { base_url, getError } from "../../Utils/Utils";

export default function AddFoodScreen() {
  //image
  const handleLinkClick = () => {
    document.getElementById("image").click();
  };

  //post data
  const navigate = useNavigate();
  const [foodName, setFoodName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [image, setImage] = React.useState([]);
  const [recipe_id, setRecipe] = React.useState(null);
  const [getRecipe, setGetRecipe] = React.useState([]);

  // Function to handle select change
  const handleSelectChange = (selectedOption) => {
    setRecipe(selectedOption);
  };

  //add product function
  const addProduct = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("foodName", foodName);
    data.append("price", price);
    data.append("quantity", quantity);
    data.append("image", image);
    data.append("recipe_id", recipe_id.value);

    try {
      const response = await fetch(`${base_url}recipe/updateStockAndSave`, {
        method: "POST",
        body: data,
      });
      navigate("/admin-dashboard/foods");
      // console.log(response)
      toast.success("Product added successfully");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  //get all recipes
  const fetchProducts = async () => {
    try {
      const fetched = await fetch(`${base_url}recipe/recipes`);
      const jsonData = await fetched.json();
      setGetRecipe(jsonData);
    } catch (err) {
      toast.error(getError(err));
    }
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  //recipe options
  const options = getRecipe.map((item) => ({
    value: item.id,
    label: item.title,
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
                Foods
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
              Add Food
            </Typography>
            <Link to="/product">
              <Button
                color="primary"
                // startDecorator={<AddIcon />}
                size="sm"
              >
                Back to Foods
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
                      Add Food
                    </Button>
                  </div>
                </div>
                <Stack spacing={2} sx={{ flexGrow: 1 }}>
                  <Stack direction="row" spacing={2}>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <FormLabel>Food Name</FormLabel>
                      <Input
                        size="sm"
                        placeholder="Food Name"
                        sx={{ flexGrow: 1 }}
                        value={foodName}
                        required
                        onChange={(e) => setFoodName(e.target.value)}
                      />
                    </FormControl>
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <FormLabel>CookedFood Price</FormLabel>
                      <Input
                        sx={{ flexGrow: 1 }}
                        size="sm"
                        placeholder="Food Price"
                        type="number"
                        value={price}
                        required
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </FormControl>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <FormLabel>Food Quantity</FormLabel>
                      <Input
                        sx={{ flexGrow: 1 }}
                        size="sm"
                        placeholder="Food Quantity"
                        value={quantity}
                        required
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </FormControl>
                  </Stack>

                  <Stack direction="row" spacing={2}>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <FormLabel>Food Recipe</FormLabel>
                      <Select
                        options={options}
                        value={recipe_id}
                        onChange={handleSelectChange}
                        placeholder="Select an recipe"
                      />
                    </FormControl>
                  </Stack>
                  <Stack spacing={2} sx={{ my: 1 }}>
                    <FormLabel> Food Image</FormLabel>
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
