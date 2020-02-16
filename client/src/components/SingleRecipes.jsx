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
    tastinessArray: [],
    difficultyArray: [],
    updateRecipesName: "",
    ingredients: "",
    instructions: "",
    ratings: "",
    time: "",
    isDeleted: false,
    reviews: [],
    picture_url_url: ""
  };

  render() {
    console.log('"prosssss---"', this.props);
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>
          {this.props.singleRecipe.recipe.label}
        </h1>
        <h3 style={{ textAlign: "center" }}>
          Calories: {this.props.singleRecipe.recipe.calories.toFixed()}
        </h3>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "5%"
          }}
        >
          <img
            src={this.props.singleRecipe.recipe.image}
            alt={`pic of ${this.props.singleRecipe.recipe.label}`}
          />
        </div>
        <hr />
        <div style={{ marginLeft: "2%" }}>
          <h3>Ingredients</h3>
        </div>
        <div style={{ maxWidth: "18%" }}>
          <ul
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap"
            }}
          >
            {" "}
            {this.props.singleRecipe.recipe.ingredientLines.map(k => {
              return <li key={k}>{k}</li>;
            })}
          </ul>
        </div>

        <button onClick={() => this.props.toggle()}>BACK</button>
        {/* <div className="single-recipes-container">
          <h1> {this.state.recipes.name}</h1>
          <div className="single-recipes-img">
            <img
              src={this.state.recipes.picture_url}
              alt="picture_url-of-recipes"
              style={{ width: "60%" }}
            />
          </div>
          <div>
            <div className="recipes-ingredients">
              <h2>Ingredients: </h2>
              <p>{this.state.recipes.ingredients}</p>
              <h2>Instructions: </h2>
              <p>{this.state.recipes.instructions}</p>
              <div className="time">
                <h2>Time:</h2>
                <p> {this.state.recipes.time}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="recipes-review">
          <Link to={`/reviews/${this.state.recipes.id}`}>
            <button type="button" class="btn btn-secondary btn-lg btn-block">
              See Reviews
            </button>
          </Link>
          <a href={`/recipes/`}>Back To All Recipes</a>
        </div> */}
      </div>
    );
  }
}
