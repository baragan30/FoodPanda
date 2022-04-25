import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import UserNavBar from './UserNavBar';
import {useNavigate,Link,Routes,Route} from "react-router-dom"
import OrdersScreen from './screens/OrdersScreen';
import FoodsScreen from './screens/FoodsScreen';
import CartScreen from './screens/CartScreen';
import axios from 'axios';

const serverRoot = 'http://localhost:8080'
function UserPage(){
    
    const [user,setUser] = useState(useLocation().state);
    const [cart,setCurentCart] = useState([]) 

    const addToCart = (food) =>{
        let order = cart.find(order => order.restaurant.id == food.restaurant.id);
        if(order === undefined){
            order = {restaurant : food.restaurant,
            foods: [food],
            user:user,
            orderType: 'PENDING'
        };
            cart.push(order);
        }else{
            order.foods.push(food);
        }
        setCurentCart(cart);
    }
    const placeOrder = (order)=>{
        axios.post(`${serverRoot}/neworder`,order)
        .then(function (response) {
            setCurentCart(arrayRemove(cart,order));
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    
    return (
        <div>
            <UserNavBar curentUser = {user}></UserNavBar>
            <Routes>
                <Route path="/foods/*" element = {<FoodsScreen addToCart= {addToCart}/>}/>
                <Route path="/orders/*" element = {<OrdersScreen user = {user} />}/>
                <Route path="/cart/*" element = {<CartScreen cart = {cart} placeOrder = {placeOrder}/>}/>
            </Routes>
        </div>
    )
}

function arrayRemove(arr, value) { 
    
    return arr.filter(function(ele){ 
        return ele != value; 
    });
}

export default UserPage;