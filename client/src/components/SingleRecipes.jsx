import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

export default class SingleRecipes extends Component {
  state = {
    recipes: {
      _id: null
    },
    recipesList: [],
    updateRecipesName: "",
    ingredients: "",
    instructions: "",
    ratings: "",
    time: "",
    isDeleted: false,
    reviews: [],
    picture_url_url: ""
  };

  componentDidMount() {
    this.singleRecipes();
  }

  singleRecipes = () => {
    const recipesId = this.props.match.params.recipesId;
    console.log("recipesId", recipesId);
    axios.get(`/api/v1/recipes/${recipesId}/`).then(res => {
      console.log("single recipe res.data", res.data);
      this.setState({
        recipes: res.data
      });
      console.log("single recipe res.data", res.data);
    });
  };

  RecipesDelete = recipesId => {
    axios.delete(`/api/recipes/${recipesId}`).then(res => {
      console.log("response", res.data);
      this.setState({ isDeleted: true });
    });
  };

  render() {
    if (this.state.isDeleted === true) {
      return <Redirect to="/recipes" />;
    }

    return (
      <div className="single-recipes-container">
        <div className="baber-info">
          <h1>Name: {this.state.recipes.name}</h1>
          <img
            className="single-recipes-img"
            src={this.state.recipes.picture_url}
            alt="picture_url-of-recipes"
          />
          <div>
            <div className="recipes-ingredients">
              <h2>Ingredients: </h2>
              <p>{this.state.recipes.ingredients}</p>
              <h2>Instructions: </h2>
              <p>{this.state.recipes.instructions}</p>
              <h2>
                Time: 
              </h2>
              <p><strong> {this.state.recipes.time}</strong></p>
            </div>
          </div>
        </div>
        <div className="recipes-review">
          <Link to={`/review/${this.state.recipes._id}`}>
            <button>Leave Review</button>
            <div className="delete-recipes">
              <button
                onClick={() => this.RecipesDelete(this.state.recipes._id)}
              >
                Delete Recipes
              </button>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}
