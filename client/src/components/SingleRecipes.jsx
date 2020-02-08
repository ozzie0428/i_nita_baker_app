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
    picture_url_url: "",
   
  };

  componentDidMount() {
    this.singleRecipes();
  }

  singleRecipes = () => {
    const recipesId = this.props.match.params.recipesId;
    console.log("recipesId", recipesId);
    axios.get(`/api/v1/recipes/${recipesId}`).then(res => {
      console.log("single recipe res.data", res.data);
      this.setState({
        recipes: res.data
      });
      console.log("single recipe res.data", res.data);
    });
  };
  singleRecipesReviews = async () => {
    const recipesId = this.props.match.params.recipesId;
    let tastinessArray = [];
    let difficultyArray = [];

    try {
      const response = await axios.get(`/api/v1/reviews/${recipesId}`);
      const allReviews = response.data;
      allReviews.forEach(review => {
        tastinessArray.push(review.tastiness);
        difficultyArray.push(review.difficulty);
      });

      

      this.setState({ tastinessArray, difficultyArray});
    } catch (error) {
      console.log(error);
    }
  };

  RecipesDelete = () => {
    const recipesId = this.props.match.params.recipesId;
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
      <div >
        <div className="single-recipes-container">
          <h1> {this.state.recipes.name}</h1>
          <div className="single-recipes-img">
            
          <img
            src={this.state.recipes.picture_url}
            alt="picture_url-of-recipes"
            style={{width:"60%"}}/>
          </div>
          <div>
            <div className="recipes-ingredients">
              <h2>Ingredients: </h2>
              <p>{this.state.recipes.ingredients}</p>
              <h2>Instructions: </h2>
              <p>{this.state.recipes.instructions}</p>
              <div className="time">
              <h2>
                Time: 
              </h2>
              <p> {this.state.recipes.time}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="recipes-review">
          <Link to={`/reviews/${this.state.recipes.id}`}>
          <button type="button" class="btn btn-secondary btn-lg btn-block">See Reviews</button>
          </Link>
          <a href={`/recipes/`}>
                Back To All Recipes
              </a>
        </div>
      </div>
    );
  }
}
