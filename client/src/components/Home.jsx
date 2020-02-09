import React, { Component } from "react";

export default class Home extends Component {
  render() {
    return (
      <div className="home-container">
        <div class="jumbotron">
          <h1 class="display-4">Do you need a Baker?</h1>
          <p class="lead">Well i know for sure that i_Nita_Baker!</p>
          <hr class="my-4" />
          <p>
            Want some lovely recipes for your signature dish, enter our
            i_Nita_Baker Website and start browsing...
          </p>
          <a class="btn btn-primary btn-lg" href="/recipes" role="button">
            Enter Here
          </a>
        </div>
      </div>
    );
  }
}
