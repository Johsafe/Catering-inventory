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
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForever from "@mui/icons-material/DeleteForever";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link } from "react-router-dom";
import { ButtonGroup, Container } from "@mui/material";
import { toast } from "react-toastify";
import { base_url, getError } from "../../Utils/Utils";
import SideBar from "../../Utils/AdminSideBar";


export default function RecipeScreen() {
  const [open, setOpen] = React.useState(false);

  const [recipe, setRecipe] = React.useState([]);

  React.useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const fetched = await fetch(`${base_url}recipe/recipes`);
        const jsonData = await fetched.json();
        setRecipe(jsonData);
      } catch (err) {
        toast.error(getError(err));
      }
    };

    fetchRecipe();
  }, []);

  //delete recipe
  async function deleteRecipe(id) {
    try {
      await fetch(`${base_url}recipe/recipe/${id}`, {
        method: "DELETE",
      });
      setRecipe(recipe.filter((recipe) => recipe.id !== id));
      toast.success("Recipe deleted successfully");
    } catch (err) {
      toast.error(getError(err));
    }
  }

  // filter
  const renderFilters = () => (
    <React.Fragment>
      <FormControl size="sm"></FormControl>
      <FormControl size="sm">
        <FormLabel>Recipe</FormLabel>
        <Select size="sm" placeholder="All" disabled></Select>
      </FormControl>
    </React.Fragment>
  );

  var i = 1;
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
                Recipes
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
              Recipes
            </Typography>
            <Link to="/admin-dashboard/addrecipe">
              <Button
                color="primary"
                startDecorator={<AddCircleIcon />}
                size="sm"
              >
                Add Recipe
              </Button>
            </Link>
          </Box>

          {/* search for recipe */}
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
              <FormLabel>Search for Recipe</FormLabel>
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
            >
              <thead>
                <tr>
                  <th style={{ width: 120, padding: "12px 6px" }}>N/A</th>
                  <th style={{ width: 240, padding: "12px 6px" }}>Title</th>
                  <th style={{ width: 140, padding: "12px 6px" }}> </th>
                </tr>
              </thead>
              <tbody>
                {recipe.map((recipe) => (
                  <tr key={recipe.id}>
                    <td>
                      <Typography level="body-xs">{i++}</Typography>
                    </td>
                    <td>
                      {" "}
                      <Typography level="body-xs">{recipe.title}</Typography>
                    </td>
                    <td>
                      <div>
                        <ButtonGroup
                          variant="text"
                          aria-label="text button group"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <Button style={{ background: "none" }}>
                            <Link
                              to={`/admin-dashboard/${recipe.id}/editrecipe`}
                            >
                              <EditIcon style={{ color: "blue" }} />
                            </Link>
                          </Button>
                          <Button style={{ background: "none" }}>
                            <Link
                              to={`/admin-dashboard/${recipe.id}/viewrecipe`}
                            >
                              <VisibilityIcon />
                            </Link>
                          </Button>
                          <Button
                            onClick={() => deleteRecipe(recipe.id)}
                            style={{ background: "none" }}
                          >
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
