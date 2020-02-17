import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
import axios from "axios";
// import { Link } from "react-router-dom";
import ShoppingList from "./ShoppingList";
import { Button } from "react-bootstrap";
import Swal from 'sweetalert2'

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
    Swal.fire({
      icon: 'success',
      text: 'Ingredient Added.',
      imageUrl: 'https://us.123rf.com/450wm/andre266/andre2661306/andre266130600007/20163761-recipe-cards-with-red-pen.jpg?ver=6',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
    })
    // alert("Ingredient Added")
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
          newShoppingList,
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Visit Shopping List When Ready',
            showConfirmButton: false,
            timer: 1900
          })
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
        <div style={{    display: "flex",
    justifyContent: "center"}}>
        <button onClick={() => this.props.toggle()} type="button" class="btn btn-outline-primary">Back To Recipes</button>
        </div>
          {/* <button onClick={() => this.props.toggle()}>BACK</button> */}
        <hr />
        <div style={{ marginLeft: "2%" }}>
          <h3>Ingredients</h3>
        </div>
        <div style={{ maxWidth: "85%" }}>
          <ul
            style={{
              // display: "flex",
              // justifyContent: "space-around",
              // flexWrap: "wrap"
            }}
          >
            {" "}
            {this.props.singleRecipe.recipe.ingredientLines.map(
              (ingredient_item, index) => {
                return (
                  <div key={index.toFixed(2)} style={{
                    marginRight: "auto",
                  marginLeft: "auto"
                  }}>
                    <li style={{paddingLeft:"2%"}}>{ingredient_item}</li>
                    <Button onClick={() => this.addToList(ingredient_item)} variant="outline-light">
                    ADD ME
                    </Button>

                    {/* <button onClick={() => this.addToList(ingredient_item)}>
                      I want this
                    </button> */}
                    {/* <ShoppingList/> */}
                  </div>
                );
              }
            )}
          </ul>
        </div>

        <button onClick={() => this.createShoppingList()} type="button" class="btn btn-primary btn-lg btn-block">ADD TO SHOPPING LIST</button>
       
      </div>
    );
  }
}
