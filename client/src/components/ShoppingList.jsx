import React, { Component } from 'react'
import axios from "axios"
export default class ShoppingList extends Component {
    state ={
        shoppingListList: [],
        newShoppingListName: '',
        picture_url: '', 
        price: ''
    }

    componentDidMount() {
        console.log("ShoppingList component mouned");
        this.updateShoppingListPage();
      }
    
      updateShoppingListPage = () => {
        axios.get("/api/v1/shoppinglist/").then(res => {
          console.log("/api/v1/shoppingList/", res.data);
          this.setState({ shoppingListList: res.data });
        });
      };

    createShoppingList = async () => {

        const newShoppingList = {
          name: this.state.newShoppingListName,
          price: this.state.price,
          picture_url: this.state.picture_url
        };
        try {
          const response = await axios.post("api/v1/shoppinglist/", newShoppingList);
          console.log("TCL: ShoppingList -> createShoppingList -> response", response);
        } catch (error) {
          console.log("TCL: ShoppingList -> createShoppingList -> error", error.message);
        }
      };

      handleChange = event => {
        const inputValue = event.target.value;
        this.setState({ [event.target.name]: inputValue });
      };

    render() {
        const shoppingListList = 
        this.state.shoppingListList &&
        this.state.shoppingListList.map((shoppingList, i) => {
            return(
                <div>

                    {shoppingList.name}
                    {` $${shoppingList.price}`}
                </div>
                )
                
            })
            return (
                <div>
                   <div>
                    <input 
                    type="string"
                    name="newShoppingListName"
                    placeholder="Name of Ingredient"
                    required="required"
                    onChange={this.handleChange}
                    value={this.state.name}
                    />

                    <input 
                    type="string"
                    name="price"
                    placeholder="Price of Ingredient"
                    required="required"
                    onChange={this.handleChange}
                    value={this.state.price}
                    />
                    <button onClick={this.createShoppingList}> Add to Shopping List</button>
                    
                    </div> 
                Hello FROM SHOPPING LIST
                {shoppingListList}
            </div>
        )
    }
}
