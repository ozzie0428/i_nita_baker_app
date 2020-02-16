import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Recipes from "./components/Recipes";
// import SingleRecipes from "./components/SingleRecipes";
// import Reviews from "./components/Reviews";
import ShoppingList from "./components/ShoppingList";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import { FormControl } from "react-bootstrap";

class App extends React.Component {
  state = {
    recipesList: [],
    newRecipeName: "",
    ingredients: "",
    instructions: "",
    time: "",
    picture_url: "",
    reviews: [],
    ingredientSearch: ""
  };

  handleChange = event => {
    const inputValue = event.target.value;

    this.setState({ ingredientSearch: inputValue });
  };

  render() {
    return (
      <div>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand>i_Nita_Baker_App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/recipes/chicken">Recipes</Nav.Link>
              <Nav.Link href="/shoppinglist">Add To Shopping List</Nav.Link>
            </Nav>
            <Form
              inline
              onSubmit={event => {
                event.preventDefault();
                // console.log("TCL: App -> render -> event", event);
              }}
            >
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                onChange={this.handleChange}
              />
              <a href={`/recipes/${this.state.ingredientSearch}`}>
                <Button variant="outline-light">Search</Button>
              </a>
            </Form>
          </Navbar.Collapse>
        </Navbar>

        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/recipes/:search_term" component={Recipes} />
            {/* <Route exact path="/recipes/:recipesId" component={SingleRecipes} /> */}
            {/* <Route path="/reviews/:recipesId" component={Reviews} /> */}
            <Route exact path="/shoppinglist" component={ShoppingList} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
