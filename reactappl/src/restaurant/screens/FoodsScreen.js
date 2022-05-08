import axios from 'axios';
import React, { useState,useEffect,useCallback } from 'react';
import FoodsCategoryBar from '../modules/FoodCategoryBar';
import AddFoodForm from '../modules/AddFoodForum';
import ServerRoot from '../../ServerRoot';
// import FoodsPDF from '../modules/FoodsPDF';
import {userReactToPrint} from 'react-to-print';



function FoodsScreen({curentRestaurant}){
    const [categories,setCategories] = useState([]);
    const [foods ,setFoods] = useState([]);

    const [value, setValue] = useState(0); // integ
    const forceUpdate = () => setValue(value+1);
    
    console.log(curentRestaurant);
    useEffect( async ()=>{
        // console.log("FoodScreen:rerender");
        setCategories( await loadCategories());
        setFoods(await loadFoods(curentRestaurant));
    },[])
    // const print  = userReactToPrint({
    //     content: () => <div><FoodsPDF restaurantName={curentRestaurant.name} categories ={categories} foods = {foods} /></div>,
    // });
    return (
        <div>
            // Add a new Category
            {/* <div><FoodsPDF restaurantName={curentRestaurant.name} categories ={categories} foods = {foods} /></div> */}
            {/* <button onClick={print}></button> */}
            <AddFoodForm forceUpdate={forceUpdate} categoriesList = {categories} curentRestaurant={curentRestaurant}></AddFoodForm>
            // List of categories 
            {categories.map((cat)=><FoodsCategoryBar signal = {value} category = {cat} restaurant = {curentRestaurant}/>)}
            
        </div>
    );
    
}


async function loadCategories(){
    return await axios.get(`${ServerRoot.getInstance()}/getCategories`)
    .then(
        res => {
            return res.data;
        }
    ).catch(function (error) {
          console.log(error);
          return []
      });
}
async function loadFoods(curentRestaurant){
    return await axios.get(`${ServerRoot.getInstance()}/getFoodsByRestaurantName/${curentRestaurant.name}`)
    .then(
        res => {
            return res.data;
        }
    ).catch(function (error) {
          console.log(error);
          return []
      });
}
export default FoodsScreen;


