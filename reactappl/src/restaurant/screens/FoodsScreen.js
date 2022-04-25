import axios from 'axios';
import React, { useState,useEffect,useCallback } from 'react';
import FoodsCategoryBar from '../modules/FoodCategoryBar';
import AddFoodForm from '../modules/AddFoodForum';

const serverRoot = 'http://localhost:8080'



function FoodsScreen({curentRestaurant}){
    const [categories,setCategories] = useState([]);

    const [value, setValue] = useState(0); // integ
    const forceUpdate = () => setValue(value+1);

    useEffect( async ()=>{
        // console.log("FoodScreen:rerender");
        setCategories( await loadCategories());
    },[])

    return (
        <div>
            // Add a new Category
            <AddFoodForm forceUpdate={forceUpdate} categoriesList = {categories} curentRestaurant={curentRestaurant}></AddFoodForm>
            // List of categories 
            {categories.map((cat)=><FoodsCategoryBar signal = {value} category = {cat} restaurant = {curentRestaurant}/>)}
            
        </div>
    );
    
}


async function loadCategories(){
    return await axios.get(`${serverRoot}/getCategories`)
    .then(
        res => {
            return res.data;
        }
    ).catch(function (error) {
          console.log(error);
          return []
      });
}
function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}
export default FoodsScreen;