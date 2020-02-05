import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './components/Home';
import Recipes from './components/Recipes'


class App extends React.Component {

  render() {
    return (
      <div>
        <h1>
          Hello World
        </h1>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/recipes" component={Recipes} />
            {/* <Route exact path="/recipes/:recipesId" component={SingleRecipes} /> */}
            {/* <Route path="/review/:recipesId" component={Review} /> */}
            {/* <Route exact path="/equipment" component={Equipment} /> */}
            <Route
              exact
              path="/equipment/:equipmentId"
              // component={SingleEquipment}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}




export default App;
