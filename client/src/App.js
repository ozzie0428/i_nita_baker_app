import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './components/Home';
import Recipes from './components/Recipes';
import SingleRecipes from './components/SingleRecipes'
import Reviews from './components/Reviews'
import ShoppingList from './components/ShoppingList'



class App extends React.Component {

  render() {
    return (
      <div>
        
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/recipes" component={Recipes} />
            <Route exact path="/recipes/:recipesId" component={SingleRecipes} />
            <Route path="/reviews/:recipesId" component={Reviews} />
            <Route exact path="/shoppingList" component={ShoppingList} />
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
