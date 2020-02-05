import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Recipes extends Component {
  state = {
    recipeList: [],
    newRecipeName: "",
    ingredients: "",
    instructions: "",
    time: "",
    picture_url: "",
    reviews: []
  };
  componentDidMount() {
    this.updateRecipesPage();
  }

  updateRecipesPage = () => {
    axios.get("/api/recipes").then(res => {
      this.setState({ recipeList: res.data });
    });
  };
  createRecipes = () => {
    const newRecipes = {
      name: this.state.newRecipeName,
      ingredients: this.state.ingredients,
      instructions: this.state.instructions,
      ratings: this.state.ratings,
      time: this.state.time,
      picture_url: this.state.picture_url
    };
    axios.post("/api/v1/recipes", newRecipes).then(() => {
      const newState = { ...this.state };
      newState.newRecipeName = "";
      newState.ingredients = "";
      newState.instructions = "";
      newState.ratings = "";
      newState.time = "";
      this.setState(newState);
      this.updateRecipesPage();
    });
  };

  handleChange = event => {
    const inputValue = event.target.value;
    this.setState({ [event.target.name]: inputValue });
  };

  render() {
    const recipeList =
      this.state.recipeList &&
      this.state.recipeList.map((recipes, i) => {
        return (
          <div className="recipes-container" key={i}>
            <div>
              <h1>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/recipes/${recipes._id}`}
                >
                  Name: {recipes.name}
                </Link>
              </h1>
            </div>
            <img
              className="recipes-img"
              src={recipes.picture_url}
              alt="recipes image"
            />
            <div>
              <h2>
                ingredients: <br />
                {recipes.ingredients}
              </h2>
            </div>
          </div>
        );
      });
    return (
      <div>
        <div className="recipes-input">
          <input
            type="string"
            name="newRecipeName"
            placeholder="Recipes Name"
            required="required"
            onChange={this.handleChange}
            value={this.state.newRecipeName}
          />
          <input
            type="string"
            name="ingredients"
            placeholder="Add ingredients"
            required="required"
            onChange={this.handleChange}
            value={this.state.ingredients}
          />
          <input
            type="string"
            name="instructions"
            placeholder="Services"
            required="required"
            onChange={this.handleChange}
            value={this.state.instructions}
          />

          <input
            type="string"
            name="time"
            placeholder="time"
            required="required"
            onChange={this.handleChange}
            value={this.state.time}
          />
          <input
            type="string"
            name="picture_url"
            placeholder="Add picture_url"
            required="required"
            onChange={this.handleChange}
            value={this.state.picture_url}
          />
          <button onClick={this.createRecipes}>Add Recipes</button>
        </div>

        <div
          className="recipesParent"
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap"
          }}
        >
          {recipeList}
        </div>
      </div>
    );
  }
}
