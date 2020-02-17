import React, { Component } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import SingleRecipes from "./SingleRecipes";

export default class Recipes extends Component {
  state = {
    recipesList: [],
    newRecipeName: "",
    ingredients: "",
    instructions: "",
    time: "",
    picture_url: "",
    reviews: [],
    singleRecipe: null,
    loading: true
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.updateRecipesPage();
  }

  updateRecipesPage = () => {
    const APP_ID = "959e9a44";
    const APP_KEY = "6893b109aa81707135e8d6106e22fe3c";

    const search_term = this.props.match.params.search_term;
    // console.log("TCL: Recipes -> updateRecipesPage -> this.props", this.props);

    axios
      .get(
        `https://api.edamam.com/search?q=${search_term}&app_id=${APP_ID}&app_key=${APP_KEY}`
      )
      .then(res => {
        this.setState({ recipesList: res.data.hits, loading:false });
      });
  };
  // createRecipes = async () => {
  //   console.log("PLEASE WORK!!!!!!!!!!!!");
  //   const newRecipes = {
  //     name: this.state.newRecipeName,
  //     time: this.state.time,
  //     ingredients: this.state.ingredients,
  //     instructions: this.state.instructions,
  //     picture_url: this.state.picture_url
  //   };
  //   try {
  //     const response = await axios.post("api/v1/recipes/", newRecipes);
  //     console.log("TCL: Recipes -> createRecipes -> response", response);
  //   } catch (error) {
  //     console.log("TCL: Recipes -> createRecipes -> error", error.message);
  //   }
  //   const newState = { ...this.state };
  //   newState.name = "";
  //   newState.time = "";
  //   newState.ingredients = "";
  //   newState.instructions = "";
  //   newState.picture_url = "";
  //   this.updateRecipesPage();
  //   this.setState(newState);
  // };

  handleChange = event => {
    const inputValue = event.target.value;
    this.setState({ [event.target.name]: inputValue });
  };

  toggle = () => {
    // console.log("TOGGLED THAT HOE");
    this.setState({ singleRecipe: null });
  };

  render() {
    if (this.state.loading) {
      return (
        <div style={{height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"}}>
          <Spinner
            animation="border"
            variant="primary"
            style={{ width: "100px", height: "100px" }}
          />
        </div>
      );
    }
    // console.log("this.state.singleRecipe", this.state.singleRecipe)
    const recipesList =
      this.state.recipesList &&
      this.state.recipesList.map((recipes, i) => {
        // console.log("recipesXXXXX", recipes )
        return (
          <div className="recipes-container" key={i}>
            <Card>
              <Card.Title>{recipes.recipe.label}</Card.Title>
              <Card.Img
                src={recipes.recipe.image}
                alt="recipe img"
                width="350px"
              />
              <Card.Body>
                <Card.Text>
                  Want to cook this delious dish? Click button below to find out
                  how!
                </Card.Text>
                {/* <Link
                  style={{ textDecoration: "none" }}
                  to={`/recipes/${recipes.id}`}
                > */}
                <Button
                  variant="primary"
                  size="lg"
                  block
                  onClick={() => this.setState({ singleRecipe: recipes })}
                >
                  View Ingredients
                </Button>
                {/* </Link> */}
              </Card.Body>
              <div>
                <h3>{`Calories: ${recipes.recipe.calories.toFixed()}`}</h3>
              </div>
            </Card>
          </div>
        );
      });
    return (
      <div>
        <br />

        {this.state.singleRecipe ? (
          <SingleRecipes
            toggle={this.toggle}
            singleRecipe={this.state.singleRecipe}
          />
        ) : (
          <div
            className="recipeParent"
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap"
            }}
          >
            {recipesList}
          </div>
        )}
      </div>
    );
  }
}
