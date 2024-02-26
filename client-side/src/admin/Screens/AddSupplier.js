import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
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
import { base_url, getError } from "../Utils/Utils";
import SideBar from "../Layout/sideBar";

export default function AddSupplier() {
  // //image
  // const handleLinkClick = () => {
  //   document.getElementById("image").click();
  // };

  //post data
  const navigate = useNavigate();
  const [ name, setName] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phone, setPhone] = React.useState("");

  //add product function
  const handleSubmitSupplier = async (e) => {
    e.preventDefault();
    try {
      const body = { name, company, email, phone, address };
      const addsupplier = await fetch(`${base_url}vendor/create`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          // authorization: `Bearer ${Token.token}`,
        },
        body: JSON.stringify(body),
      });
      await addsupplier.json();
      toast.success("supplier created successfully");
      navigate("/supplier");
    } catch (err) {
      toast.error(getError(err));
    }
  };

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
                href="/dashboard"
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
              Add supplier
            </Typography>
            <Link to="/supplier">
              <Button
                color="primary"
                // startDecorator={<AddIcon />}
                size="sm"
              >
                Back to Supplier
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
                
                <Stack spacing={2} sx={{ flexGrow: 1 }}>
                  <Stack direction="row" spacing={2}>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <FormLabel>Supplier Name</FormLabel>
                      <Input
                        size="sm"
                        placeholder="Suppliers Full Names"
                        sx={{ flexGrow: 1 }}
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                      />
                    </FormControl>
                  </Stack>
                  <Stack direction="row" spacing={2}>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <FormLabel>Supplier company</FormLabel>
                      <Input
                        sx={{ flexGrow: 1 }}
                        size="sm"
                        placeholder="Supplier company name"
                        value={company}
                        required
                        onChange={(e) => setCompany(e.target.value)}
                      />
                    </FormControl>
                  </Stack>

                  <Stack direction="row" spacing={2}>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <FormLabel>Supplier Email</FormLabel>
                      <Input
                        sx={{ flexGrow: 1 }}
                        size="sm"
                        placeholder="supplier email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </FormControl>
                    <FormControl sx={{ flexGrow: 1 }}>
                      <FormLabel>Supplier Phone</FormLabel>
                      <Input
                        sx={{ flexGrow: 1 }}
                        size="sm"
                        placeholder="supplier phone number"
                        value={phone}
                        required
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </FormControl>
                  </Stack>

                  <Stack spacing={2} sx={{ my: 1 }}>
                  <FormControl sx={{ flexGrow: 1 }}>
                      <FormLabel>Supplier Address</FormLabel>
                      <Input
                        sx={{ flexGrow: 1 }}
                        size="sm"
                        placeholder="supplier address"
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </FormControl>
                  </Stack>

                  <div style={{ marginTop: "1rem" }}>
                    <Button
                      size="sm"
                      variant="solid"
                      onClick={handleSubmitSupplier}
                      sx={{ width: "100%" }}
                      type="submit"
                    >
                     Add supplier
                    </Button>
                  </div>
                  
                </Stack>
              </Stack>
            </Card>
          </Stack>
        </Box>
      </Container>
    </div>
  );
}
