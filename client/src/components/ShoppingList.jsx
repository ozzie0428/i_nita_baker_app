import React, { Component } from "react";
import axios from "axios";
import { Table, InputGroup, FormControl } from "react-bootstrap";

export default class ShoppingList extends Component {
  state = {
    shoppingListList: [],
    newShoppingListName: "",
    picture_url: "",
    price: "",
    checkboxlist: []
  };

  componentDidMount() {
    // console.log("ShoppingList component mouned");
    this.updateShoppingListPage();
  }

  updateShoppingListPage = () => {
    axios.get("/api/v1/shoppinglist/").then(res => {
      // console.log("/api/v1/shoppingList/", res.data);
      this.setState({ shoppingListList: res.data });
    });
  };
  checkItem = value => {
    let ingredientsList = this.state.checkboxlist;
    if (!ingredientsList.includes(value)) {
      ingredientsList.push(value);
    } else {
      const index = ingredientsList.indexOf(value);
      ingredientsList.splice(index, 1);
    }

    this.setState({ checkboxlist: ingredientsList });
  };

  createShoppingList = async () => {
    // console.log("WORK YOU FUCKER!!");
    const newShoppingList = {
      name: this.state.newShoppingListName,
      price: this.state.price,
      picture_url: this.state.picture_url
    };
    try {
      const response = await axios.post(
        "/api/v1/shoppinglist/",
        newShoppingList
      );
      console.log(
        "TCL: ShoppingList -> createShoppingList -> response",
        response
      );
    } catch (error) {
      console.log(
        "TCL: ShoppingList -> createShoppingList -> error",
        error.message
      );
    }
    const newState = { ...this.state };
    console.log("NEW STATE", newState);
    newState.name = "";
    newState.price = "";
    this.updateShoppingListPage();
    this.setState(newState);
  };

  handleChange = event => {
    const inputValue = event.target.value;
    this.setState({ [event.target.name]: inputValue });
  };

  render() {
    console.log("yo", this.state.checkboxlist);

    const shoppingListList =
      this.state.shoppingListList &&
      this.state.shoppingListList.map((shoppingList, i) => {
        // const checkedValues = this.state.checkboxlist.length;
        // console.log("this.state.checkboxlist", this.state.checkboxlist);
        let checked;

        // // if (this.state.checkboxlist.includes(shoppingList.name) === true) {
        // //   checked = true;
        // // } else {
        // //   checked = false;
        // // }
        // // function contains(a, obj) {
        // for (var i = 0; i < checkedValues.length; i++) {
        //   if (checkedValues[i] === shoppingList.name) {
        //     checked = true;
        //   } else {
        //     checked = false;
        //   }
        // }

        // }
        return (
          <div key={i}>
            {/* {shoppingList.name} */}

            <li style={{ listStyleType: "none"}}>
              <input
                onChange={() => this.checkItem(shoppingList.name)}
                type="checkbox"
                checked={this.state.checkboxlist.includes(shoppingList.name)}
                value={shoppingList.name}
                // id={`item-${id}`}
              />
              <label
                style={{
                  paddingLeft: "1%",
                  textDecoration: this.state.checkboxlist.includes(
                    shoppingList.name
                  )
                    ? "line-through"
                    : null
                }}
              >
                {shoppingList.name}
              </label>
            </li>
            {/* <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Checkbox
                  aria-label="Checkbox for following text input"
                  // checked={checked}
                  //     if(fruits.indexOf("Mango") !== -1){
                  //     alert("Value exists!")
                  // } else{
                  //     alert("Value does not exists!")
                  // }}
                  value={shoppingList.name}
                  onClick={e => this.checkItem(e.target.value)}
                />
              </InputGroup.Prepend>
              <FormControl
                aria-label="Text input with checkbox"
                value={shoppingList.name}
              />
            </InputGroup> */}
            {/* {` $${shoppingList.price}`} */}
          </div>
        );
      });
    return (
      <div>
        <div>
          <div
            className="form-row align-items-center"
            style={{
              paddingLeft: "30%",
              paddingTop: "2%"
            }}
          >
            <div className="col-sm-3 my-1">
              <label className="sr-only">Name</label>
              {/* <input
                type="string"
                className="form-control"
                name="newShoppingListName"
                id="inlineFormInputName"
                placeholder="Name of Ingredient"
                required="required"
                onChange={this.handleChange}
                value={this.state.name}
              /> */}
            </div>
            <div className="col-sm-3 my-1">
              <label className="sr-only">Username</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  {/* <div className="input-group-text">$</div> */}
                </div>
                {/* <input
                  type="string"
                  className="form-control"
                  name="price"
                  id="inlineFormInputGroupUsername"
                  placeholder="Price of Ingredient"
                  required="required"
                  onChange={this.handleChange}
                  value={this.state.price}
                /> */}
              </div>
            </div>
            <div className="col-auto my-1"></div>
            <div className="col-auto my-1">
              {/* <button
                onClick={this.createShoppingList}
                className="btn btn-primary"
              >
                Submit
              </button> */}
            </div>
          </div>
        </div>
        <div className="shoppingList-container">
          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th></th>
                <th>Shopping List</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>{shoppingListList}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}
