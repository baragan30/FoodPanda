import RestaurantBar from "../modules/RestaurantBar";
import axios from 'axios';
import React from "react";
import AddRestaurantForm from "../modules/AddRestaurantForm";
import ServerRoot from '../../ServerRoot';

class RestaurantsScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            restaurants:[]
        }
    }

    async componentDidMount(){
        this.setState({restaurants: await this.getRestaurants()});
    }
    render(){
          return (
            <div>
                <AddRestaurantForm mainComponent = {this}/>
                
                <ul className="list-group">
                    <li className="list-group-item active">Restaurant List</li>
                </ul>
                {
                    this.state.restaurants.map((restaurant) => <RestaurantBar restaurant={restaurant}></RestaurantBar>)
                }
            </div>
        )
    }
    async getRestaurants(){
      const response =  await axios.get(`${ServerRoot.getInstance()}/getRestaurants`)
      .then(
          res => {
              let restaurants =  res.data
              return restaurants;
          }
      ).catch(function (error) {
            console.log(error);
            return [];
        });
        return response;
  }
}




export default RestaurantsScreen;