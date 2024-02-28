import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { Card, Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import { Grid, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { base_url, getError } from "../Utils/Utils";
import catering from "../images/catering1.png";
import Avatar from "react-avatar";

export default function ViewRecipe() {
  //   const Token = JSON.parse(localStorage.getItem("token"));
  const params = useParams();
  const [recipes, setRecipes] = useState([]);
  async function getRecipes() {
    try {
      const response = await fetch(`${base_url}recipe/fullrecipes/${params.id}`);
      const getrecipe = await response.json();
      setRecipes(getrecipe);
    //   console.log(getrecipe);
    } catch (err) {
      toast.error(getError(err));
    }
  }

  useEffect(() => {
    getRecipes();
  }, []);
  //delete recipe
  async function deleteRecipe(id) {
    try {
      await fetch(`${base_url}recipe/recipe/${id}`, {
        method: "DELETE",
        // headers: {
        //   "Content-type": "application/json",
        //   //   authorization: `Bearer ${Token.token}`,
        // },
      });
      setRecipes(recipes.filter((recipes) => recipes.id !== id));
      toast.success("recipe deleted successfully");
    } catch (err) {
      toast.error(getError(err));
    }
  }

  var i = 1;
  return (
    <div>
      <div style={{ padding: "1rem" }}>
        <Container>
          <Helmet>
            <title>View Recipe</title>
          </Helmet>
          <div
            style={{
              display: "flex",
              gap: "5rem",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {" "}
            <div>
              <Link
                to="/recipe"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Button variant="contained" size="medium" color="error">
                  Back to Recipes
                </Button>
              </Link>
            </div>
            <div>
              <h1>Food Recipes</h1>
            </div>
          </div>

          <div>
            <div style={{ padding: "1rem" }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4} lg={3}>
                  <Card
                    sx={{
                    //   borderTop: "4px solid #42a5f5",
                      width: 250,
                      height: 380,
                    }}
                  >
                    <div>
                      <img
                        src={catering}
                        style={{
                          width: "100%",
                          marginTop: "3rem",
                        }}
                        alt="catering"
                      />
                      <Divider />
                      <div
                        style={{
                          textAlign: "center",
                          marginBottom: "0.5rem",
                          marginTop: "1rem",
                          padding: "0.3rem",
                        }}
                      >
                        <h4>
                          <b>{recipes.title}</b>
                        </h4>
                      </div>
                    </div>
                  </Card>
                  <div>
                    <Button
                      variant="contained"
                      color="error"
                      size="medium"
                      sx={{ width: "100%", marginTop: "0.5rem" }}
                      onClick={() => deleteRecipe(recipes.id)}
                      startIcon={<DeleteIcon />}
                    >
                      <Link className="link">Delete Recipe</Link>
                    </Button>
                  </div>
                </Grid>

                <Grid item xs={12} md={8} lg={9}>
                  <Paper
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                    //   borderTop: "4px solid #42a5f5",
                      color: "#fff",
                      mb: 2,
                      backgroundColor: "grey.400",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: "30rem",
                      }}
                    >
                      <h1>{recipes.title}</h1>
                    </div>
                  </Paper>
                  <Paper
                    sx={{
                      p: 2,
                      flexDirection: "column",
                      mb: 2,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: "30rem",
                      }}
                    >
                      <h3>Recipe Ingredients</h3>
                    </div>
                  </Paper>
                  <Paper
                    sx={{
                      p: 2,
                      overflow: "hidden",
                      flexDirection: "column",
                    }}
                  >
                    <b>
                      <h3>Ingredients</h3>
                    </b>
                    <div className="dashboard">
                      <table class="table table-hover">
                        <thead>
                          <tr>
                            <th scope="col">S/N</th>
                            <th scope="col">image</th>
                            <th scope="col">name</th>
                            <th scope="col">quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recipes.Ingredients &&
                            recipes.Ingredients.map((product) => (
                              <tr key={product.id}>
                                <th scope="row">{i++}</th>
                                <td>
                                <Avatar
                                size="40"
                                color={Avatar.getRandomColor("sitebase", [
                                  "rgb(233, 150, 150)",
                                  "rgb(164, 231, 164)",
                                  "rgb(236, 224, 167)",
                                  "rgb(174, 185, 233)",
                                ])}
                                // round={true}
                                src={product.product_image}
                                alt={product.product_name}
                              />
                                </td>
                                {/* <td>{product.product_image} </td> */}
                                <td>{product.product_name}</td>
                                <td>{product.quantity} </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
