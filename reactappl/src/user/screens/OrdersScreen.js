import axios from "axios"
import React from "react";
import { useEffect, useState } from "react"

import Order from "../modules/Order";
const serverRoot = 'http://localhost:8080'

export default function OrdersScreen({user}){
    const [orders, setOrders] = useState([]);
    useEffect( async ()=>{
        setOrders(await loadOrders(user));
    },[user])
    return(
        <div>
            {orders.map((order) =>  <Order order = {order}/>)}
        </div>
    )
}

async function loadOrders(user){
    console.log(user)
    return await axios.post(`${serverRoot}/getOrdersByUser`,user
      )
    .then( res => {
        return res.data
    }).catch( error => {
        console.log(error);
        return [];
    })
}