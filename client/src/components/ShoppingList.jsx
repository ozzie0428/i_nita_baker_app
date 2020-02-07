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
        axios.get("/api/v1/shoppingList/").then(res => {
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
          const response = await axios.post("api/v1/shoppingList/", newShoppingList);
          console.log("TCL: ShoppingList -> createShoppingList -> response", response);
        } catch (error) {
          console.log("TCL: ShoppingList -> createShoppingList -> error", error.message);
        }
      };

    render() {
        return (
            <div>
                Hello FROM SHOPPING LIST
            </div>
        )
    }
}
