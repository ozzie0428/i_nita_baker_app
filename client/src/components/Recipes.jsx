import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
export default class Recipes extends Component {
  state = {
    recipesList: [],
    newRecipeName: "",
    ingredients: "",
    instructions: "",
    time: "",
    picture_url: "",
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
    console.log("PLEASE WORK!!!!!!!!!!!!");
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
    const newState = { ...this.state };
    newState.name = "";
    newState.time = "";
    newState.ingredients = "";
    newState.instructions = "";
    newState.picture_url = "";
    this.updateRecipesPage();
    this.setState(newState);
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
            <Card>
              <Card.Title>{recipes.name}</Card.Title>
              <Card.Img
                src={recipes.picture_url}
                alt="recipe img"
                width="350px"
              />
              <Card.Body>
                <Card.Text>
                  Want to cook this delious dish? Click button below to find out
                  how!
                </Card.Text>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/recipes/${recipes.id}`}
                >
                  <Button variant="primary" size="lg" block>
                    View How to Make Me
                  </Button>
                </Link>
              </Card.Body>
              <div>
                <h3>{`Cook Time: ${recipes.time}`}</h3>
              </div>
            </Card>
          </div>
        );
      });
    return (
      <div>
        <div
          className="form-row align-items-center"
          style={{
            // paddingLeft: "30%",
            paddingTop: "2%",
            display: "flex",
            justifyContent: "flex-end",
            flexWrap: "wrap-reverse"
          }}
        >
          <div className="col-sm-3 my-1">
            <label className="sr-only" for="inlineFormInputName">
              Name
            </label>

            <input
              type="string"
              className="form-control"
              name="ingredients"
              id="inlineFormInputName"
              placeholder="Place Ingredients Here"
              required="required"
              onChange={this.handleChange}
              value={this.state.ingredients}
            />
          </div>

          <div className="col-sm-3 my-1">
            <label className="sr-only" for="inlineFormInputName">
              Name
            </label>

            <input
              type="string"
              className="form-control"
              name="instructions"
              id="inlineFormInputName"
              placeholder="Place instructions Here"
              required="required"
              onChange={this.handleChange}
              value={this.state.instructions}
            />
          </div>
          <div className="col-sm-3 my-1">
            <label className="sr-only" for="inlineFormInputName">
              Name
            </label>

            <input
              type="string"
              className="form-control"
              name="time"
              id="inlineFormInputName"
              newShoppingListName
              placeholder="Place Duration Here"
              required="required"
              onChange={this.handleChange}
              value={this.state.time}
            />
          </div>
          <div className="col-sm-3 my-1">
            <label className="sr-only" for="inlineFormInputName">
              Name
            </label>

            <input
              type="string"
              className="form-control"
              name="picture_url"
              id="inlineFormInputName"
              newShoppingListName
              placeholder="Add Picture Here"
              required="required"
              onChange={this.handleChange}
              value={this.state.picture_url}
            />
          </div>
          <br />
          <div
            className="col-sm-3 my-1"
            style={{
              marginRight: "13%"
            }}
          >
            <label className="sr-only" for="inlineFormInputName">
              Name
            </label>
            <input
              type="string"
              className="form-control"
              name="newRecipeName"
              id="inlineFormInputName"
              placeholder="Name of Recipt"
              required="required"
              onChange={this.handleChange}
              value={this.state.newRecipeName}
            />
          </div>
          <div className="col-sm-3 my-1">
            <label className="sr-only" for="inlineFormInputGroupUsername">
              Username
            </label>
          </div>
        </div>

        <button
          onClick={this.createRecipes}
          className="btn btn-primary"
          style={{
            marginLeft: "48%",
            marginBottom: "1%"
          }}
        >
          Submit
        </button>

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
      </div>
    );
  }
}
