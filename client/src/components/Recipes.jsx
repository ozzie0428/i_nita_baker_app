import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Recipes extends Component {
  state = {
    recipesList: [],
    newRecipeName: "",
    ingredients: "",
    instructions: "",
    time: "",
    picture_url:
      "https://assets.rebelmouse.io/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbWFnZSI6Imh0dHBzOi8vYXNzZXRzLnJibC5tcy8yMTk1Mjc4Mi9vcmlnaW4uanBnIiwiZXhwaXJlc19hdCI6MTU4MTc2OTUxOH0.aTydxWC1zNp-PPN072BQWxzhJxLqmO-4mOX2fwrwWM0/img.jpg?width=980&height=504",
    reviews: []
  };
  componentDidMount() {
    console.log("Recipes component mouned");
    this.updateRecipesPage();
  }

  updateRecipesPage = () => {
    axios.get("/api/v1/recipes/").then(res => {
      console.log("/api/v1/recipes/", res.data);
      this.setState({ recipesList: res.data });
    });
  };
  createRecipes = async () => {

    const newRecipes = {
      name: this.state.newRecipeName,
      time: this.state.time,
      ingredients: this.state.ingredients,
      instructions: this.state.instructions,
      picture_url: this.state.picture_url
    };
    try {
      const response = await axios.post("api/v1/recipes/", newRecipes);
      console.log("TCL: Recipes -> createRecipes -> response", response);
    } catch (error) {
      console.log("TCL: Recipes -> createRecipes -> error", error.message);
    }
  };

  handleChange = event => {
    const inputValue = event.target.value;
    this.setState({ [event.target.name]: inputValue });
  };

  render() {
    const recipesList =
      this.state.recipesList &&
      this.state.recipesList.map((recipes, i) => {
        return (
          <div className="recipes-container" key={i}>
            <div>
              <h1>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/recipes/${recipes.id}`}
                >
                  {recipes.name}
                </Link>
              </h1>
            </div>
            <div>
              <img src={recipes.picture_url} alt="recipe img" />
            </div>
            <div>
              <h2>{recipes.time}</h2>
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
            placeholder="instructions"
            required="required"
            onChange={this.handleChange}
            value={this.state.instructions}
          />

          <input
            type="string"
            name="time"
            placeholder="Duration"
            required="required"
            onChange={this.handleChange}
            value={this.state.time}
          />
          <input
            type="string"
            name="picture_url"
            placeholder="Add picture"
            required="required"
            onChange={this.handleChange}
            value={this.state.picture_url}
          />
          <button onClick={this.createRecipes}>Add Recipes</button>
        </div>
        <h1>
          HELLO FROM RECIPE
          {recipesList}
        </h1>
      </div>
    );
  }
}
