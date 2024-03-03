import * as React from "react";
import Box from "@mui/joy/Box";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
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
import Select from "react-select";
import { base_url, getError } from "../Utils/Utils";
import SideBar from "../Layout/sideBar";
import Avatar from "react-avatar";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";

export default function SalesScreen() {
  //post data
  const navigate = useNavigate();
  const [name, setName] = React.useState("");
  //   const [description, setDescription] = React.useState("");
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
      name,
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
      navigate("/recipe");
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  const Options = prdOptions.map((item) => ({
    value: item.id,
    label: item.title,
  }));

  const options = [
    { value: "Cash", label: "Cash" },
    { value: "Cheque", label: "Cheque" },
    { value: "Transaction", label: "Transaction" },
  ];

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
                Sales
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
              Create Order
            </Typography>
            {/* <Link to="/recipe">
              <Button
                color="primary"
                // startDecorator={<AddIcon />}
                size="sm"
              >
                Back to Re
              </Button>
            </Link> */}
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
                        <FormLabel>Customer Full Name</FormLabel>
                        <Input
                          sx={{ flexGrow: 1 }}
                          size="sm"
                          placeholder="Customer Full name"
                          value={name}
                          required
                          onChange={(e) => setName(e.target.value)}
                        />
                      </FormControl>
                    </Stack>

                    {/* <Stack spacing={2} sx={{ my: 1 }}>
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
                    </Stack> */}
                    {/* <Stack spacing={2} alignItems="flex-start"> */}
                    <FormControl size="sm" style={{ zIndex: 100 }}>
                      <FormLabel>Select Product</FormLabel>
                      <Select
                        isMulti
                        value={products}
                        onChange={handleVegChange}
                        options={[...Options]}
                      />
                    </FormControl>
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
                            <th style={{ width: 140, padding: "12px 6px" }}>
                              Title
                            </th>

                            <th style={{ width: 140, padding: "12px 6px" }}>
                              Cost
                            </th>
                            <th style={{ width: 140, padding: "12px 6px" }}>
                              Quantity
                            </th>

                            <th style={{ width: 240, padding: "12px 6px" }}>
                              Product
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* {products.map((product) => ( */}
                          {products.map((veg, index) => (
                            <tr key={index}>
                              <td>{veg.label}</td>
                              <td>Ksh. {veg.cost}</td>
                              <td>
                                <Input
                                  type="number"
                                  value={veg.quantity}
                                  onChange={(e) =>
                                    handleQuantityChange(index, e.target.value)
                                  }
                                  defaultValue="1"
                                />
                              </td>

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
                                      src={veg.image}
                                      alt={veg.label}
                                      name={veg.label}
                                    />
                                  </Typography>
                                  <div>
                                    <Typography level="body-xs">
                                      {veg.label}
                                    </Typography>
                                    <Typography level="body-xs">
                                      {veg.category}
                                    </Typography>
                                  </div>
                                </Box>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>

                      <div style={{ marginTop: "1rem", marginLeft: "500px" }}>
                        <h6>
                          <b>Order Summary</b>
                        </h6>
                        <div style={{ width: "400px" }}>
                          <Table>
                            <tbody>
                              <tr>
                                <td>
                                  <p>Payment Method</p>
                                </td>
                                <td>
                                  <Select options={options} />
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <p>Grand total</p>
                                </td>
                                <td>Ksh. 500</td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>

                        <div>
                          <button
                            style={{
                              border: "none",
                              padding: "0.5rem 0",
                              width: "400px",
                              borderRadius: "10px",
                              color: "white",
                              cursor: "pointer",
                              //   background: "rgb(164, 231, 164)",
                              background: "rgb(174, 185, 233)",
                              marginBottom: "1rem",
                            }}
                          >
                            Generate Invoice
                          </button>
                        </div>
                      </div>
                    </Sheet>
                    {/* </div> */}
                    {/* ))} */}
                  </Stack>
                  {/* </Stack> */}
                </Stack>
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
