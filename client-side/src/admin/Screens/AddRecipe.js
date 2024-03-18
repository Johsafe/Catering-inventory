import * as React from "react";
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

import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import { toast } from "react-toastify";
import { base_url, getError } from "../../Utils/Utils";
import SideBar from "../../Utils/AdminSideBar";
import Select from "react-select";

export default function AddRecipe() {
  //post data
  const navigate = useNavigate();
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [products, setProducts] = React.useState([]);
  const [prdOptions, setPrdOptions] = React.useState([]);

  //get all products
  const fetchProducts = async () => {
    try {
      const fetched = await fetch(`${base_url}product/products`);
      const jsonData = await fetched.json();
      setPrdOptions(jsonData);
    } catch (err) {
      toast.error(getError(err));
    }
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  const handleVegChange = (selectedOptions) => {
    setProducts(selectedOptions);
  };

  const handleQuantityChange = (index, value) => {
    setProducts((prevState) =>
      prevState.map((veg, i) =>
        i === index ? { ...veg, quantity: parseInt(value) || 0 } : veg
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      title,
      description,
      products,
    };

    try {
      const response = await fetch(`${base_url}recipe/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("Form submitted successfully", response);
      navigate("/admin-dashboard/recipe");
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  const Options = prdOptions.map((item) => ({
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
                Recipe
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
              Add Recipe
            </Typography>
            <Link to="/recipe">
              <Button
                color="primary"
                // startDecorator={<AddIcon />}
                size="sm"
              >
                Back to Recipe
              </Button>
            </Link>
          </Box>

          {/* form */}
          <form onSubmit={handleSubmit}>
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
                  <Stack spacing={2} sx={{ flexGrow: 1 }}>
                    <Stack direction="row" spacing={2}>
                      <FormControl sx={{ flexGrow: 1 }}>
                        <FormLabel>Recipe Title</FormLabel>
                        <Input
                          sx={{ flexGrow: 1 }}
                          size="sm"
                          placeholder="Title"
                          value={title}
                          required
                          onChange={(e) => setTitle(e.target.value)}
                        />
                      </FormControl>
                    </Stack>

                    <Stack spacing={2} sx={{ my: 1 }}>
                      <FormLabel> Recipe Description</FormLabel>
                      <Textarea
                        size="sm"
                        minRows={4}
                        sx={{ mt: 1.5 }}
                        placeholder="Write a description about the Recipe."
                        value={description}
                        required
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </Stack>
                    {/* <Stack spacing={2} alignItems="flex-start"> */}
                    <Select
                      isMulti
                      value={products}
                      onChange={handleVegChange}
                      options={[...Options]}
                    />
                    {products.map((veg, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "40px",
                        }}
                      >
                        <b>Quantity for {veg.label}:</b>
                        {/* <Input
                          type="number"
                          value={veg.quantity}
                          onChange={(e) =>
                            handleQuantityChange(index, e.target.value)
                          }
                          sx={{ width: "400px" }}
                        /> */}
                        <Input
                                type="number"
                                value={veg.quantity}
                                onChange={(e) => {
                                  const inputValue = e.target.value.replace(
                                    /[^0-9]/g,
                                    ""
                                  ); // Remove non-numeric characters
                                  const numericValue = parseInt(inputValue, 10); // Convert string to number
                                  if (numericValue >= 1) {
                                    // Only update quantity if it's a non-negative number
                                    handleQuantityChange(index, numericValue);
                                  }
                                }}
                                defaultValue="1"
                              />
                      </div>
                    ))}
                  </Stack>
                </Stack>
                <div
                  style={{
                    marginTop: "1rem",
                    borderTop: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Button
                    size="sm"
                    variant="solid"
                    sx={{ width: "100%" }}
                    type="submit"
                  >
                    Add Recipe
                  </Button>
                </div>
              </Card>
            </Stack>
          </form>
          {/* <p>
            Your favorite vegetables:{" "}
            {products.map((veg) => `${veg.label} (${veg.quantity})`).join(", ")}{" "}
          </p> */}
        </Box>
      </Container>
    </div>
  );
}
