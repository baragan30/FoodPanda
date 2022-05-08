import axios from "axios"
import React from "react";
import { useEffect, useState } from "react"
import Order from "../modules/Order";
import ServerRoot from "../../ServerRoot";

const orderTypes = ['NONE','PENDING','ACCEPTED','INDELIVERY','DELIVERED','DECLINED']

function OrderScreen({restaurant}){
    const [orders, setOrders] = useState([]);
    const [type, setType] = useState(orderTypes[0]); 
    useEffect( async ()=>{
        let neworders= await loadOrders(restaurant,type);
        if(type !== orderTypes[0]){
            neworders = neworders.filter((order)=> order.orderType === type)
        }
        setOrders(neworders);
    },[type]);
 
    const forceUpdate = (type) => {setType(type);console.log(type)}
    return(
        <div>
            <select onChange={(e)=>{forceUpdate(e.target.value);}} id="category" className="form-control">
                    {orderTypes.map((type)=><option>{type}</option>)}
            </select>



            {orders.map((order) =>  <Order order = {order}/>)}
        </div>
    )
}
async function loadOrders(restaurant,type){
    return await axios.post(`${ServerRoot.getInstance()}/getOrdersByRestaurant/`,restaurant
      )
    .then( res => {
            return res.data
    }).catch( error => {
        console.log(error);
        return [];
    })
}

export default OrderScreen;