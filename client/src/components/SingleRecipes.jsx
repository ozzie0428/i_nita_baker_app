import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import axios from "axios";
// import { Link } from "react-router-dom";
import ShoppingList from "./ShoppingList";

export default class SingleRecipes extends Component {
  state = {
    recipes: {
      _id: null
    },
    recipesList: [],
    ingredients: "",
    time: "",
    isDeleted: false,
    ingredientsList: [],
    picture_url_url: ""
  };
  addToList = value => {
    const ingredientsList = [...this.state.ingredientsList];
    ingredientsList.push(value);
    //   this.state.ingredientsList.push(this.props.singleRecipe.recipe.ingredientLines)
    //  console.log("ADD TO CART")
    this.setState({ ingredientsList: ingredientsList });
  };

  createShoppingList = async () => {
    // console.log("WORK YOU FUCKER!!");
    // console.log("GOING TO SHOPPING LIST", this.state.ingredientsList);
    const items = [...this.state.ingredientsList];
    for (let i = 0; i < items.length; i++) {
      const newShoppingList = {
        name: items[i],
        price: "0.00"
      };

      try {
        const response = await axios.post(
          "/api/v1/shoppinglist/",
          newShoppingList
        );
      } catch (error) {
        console.log(
          "TCL: ShoppingList -> createShoppingList -> error",
          error.message
        );
      }
    }
  };

  render() {
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
            {this.props.singleRecipe.recipe.ingredientLines.map(
              (ingredient_item, index) => {
                return (
                  <div key={index}>
                    <li>{ingredient_item}</li>

                    <button onClick={() => this.addToList(ingredient_item)}>
                      Add to Shopping List
                    </button>
                    {/* <ShoppingList/> */}
                  </div>
                );
              }
            )}
          </ul>
        </div>

        <button onClick={() => this.props.toggle()}>BACK</button>
        <button onClick={() => this.createShoppingList()}>
          ADD TO SHOPPING LIST{" "}
        </button>
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
