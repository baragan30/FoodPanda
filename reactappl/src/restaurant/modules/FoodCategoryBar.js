import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FoodBar from "./FoodBar";
const serverRoot = 'http://localhost:8080';


export default function FoodsCategoryBar({signal,category,restaurant}){
    const [foods, setfoods] = useState([]);
    useEffect( async ()=>{
        setfoods(await getFoods(category,restaurant))
    },[signal])
    return(
        <div>
            <p>
                <a className="btn btn-primary" data-toggle="collapse" href={`#collapseExample${category}`} role="button" aria-expanded="false" aria-controls="collapseExample">
                    {category}
                </a>
            </p>
            <div className="collapse" id={`collapseExample${category}`}>
                <div class="card card-body">
                   {
                       foods.map((food)=> FoodBar({food}))
                   }
                </div>
            </div>
        </div>
    )
}

async function getFoods(category,restaurant){
    return await axios.get(`${serverRoot}/getFoodsByCategoryAndRestaurant/${category}/${restaurant.id}`)
    .then(
        res => {
            return res.data;
        }
    ).catch(function (error) {
          console.log(error);
          return []
      });
}