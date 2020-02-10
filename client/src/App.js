import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Recipes from "./components/Recipes";
import SingleRecipes from "./components/SingleRecipes";
import Reviews from "./components/Reviews";
import ShoppingList from "./components/ShoppingList";
import { Navbar } from "react-bootstrap";
import { NavDropdown } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import { FormControl } from "react-bootstrap";

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand>i_Nita_Baker_App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/recipes">Recipes</Nav.Link>
              <Nav.Link href="/shoppinglist">Add To Shopping List</Nav.Link>
              
            </Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button variant="outline-light">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        {/* <div>
        <div className="nav-bar">
          <Button variant="primary">Primary</Button>
          <a href="/recipes">
            <h3>Recipes</h3>
          </a>
          <a href="/">
            <h3>Home</h3>
          </a>
          <a href="/shoppinglist">
            <h3>Shopping List</h3>
          </a>
        </div> */}

        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/recipes" component={Recipes} />
            <Route exact path="/recipes/:recipesId" component={SingleRecipes} />
            <Route path="/reviews/:recipesId" component={Reviews} />
            <Route exact path="/shoppinglist" component={ShoppingList} />
            {/* <Route
              exact
              path="/shoppingList/:shoppingListId"
              // component={SingleShoppingList}
            /> */}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
