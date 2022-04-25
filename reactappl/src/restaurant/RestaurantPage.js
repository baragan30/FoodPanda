import React, { useState, useEffect } from "react";
import {useLocation } from 'react-router-dom';
import './css/RestaurantPage.css'
import {useNavigate,Link,Routes,Route} from "react-router-dom"

import RestaurantNavBar from './RestaurantNavBar'
import RestaurantsScreen from './screens/RestaurantsScreen'
import FoodsScreen from './screens/FoodsScreen'
import OrdersScreen from './screens/OrdersScreen'

function RestaurantPage(){
    const [curentRestaurant, setRestaurant] = useState(useLocation().state);
    return(
      <div>
        <RestaurantNavBar curentRestaurant = {curentRestaurant}></RestaurantNavBar>
        <Routes>
          <Route path="/foods" element = {<FoodsScreen curentRestaurant = {curentRestaurant}/>}/>
          <Route path="/orders" element = {<OrdersScreen restaurant={curentRestaurant}/>}/>
          <Route path="/restaurants" element = {<RestaurantsScreen/>}/>
        </Routes>

      </div>
       
    )
}


export default RestaurantPage;