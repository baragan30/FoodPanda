import axios from "axios"
import { useEffect, useState } from "react"
import Food from "../modules/AddFoodBar";
const serverRoot = 'http://localhost:8080';

export default function FoodsScreen({addToCart}){
    const [searchName,setSearchName] = useState("");
    const [foods,setFoods] = useState([]);
    // const res
    useEffect(async()=>{
        setFoods(await loadFoods(searchName));
    },[searchName])
    const search = (e) =>{
      e.preventDefault();
      setSearchName(e.target.restaurantName.value);
    }
    const f = ()=>{};
    return(
        <div>
          <form onSubmit={search} className="form-inline my-2 my-lg-0">
            <input name="restaurantName" className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
            <button type="sumit" className="btn btn-dark">Add</button>
          </form>
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">Food</th>
                  <th scope="col">Category</th>
                  <th scope="col">Restaurant</th>
                  <th scope="col">Price</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {
                foods.map((food)=>{return <Food addToCart={addToCart} food= {food}/>})
              }
              </tbody>
              
          </table>

        </div>
    )
}

async function loadFoods(restaurantName){
  
    return await axios.get(`${serverRoot}/getFoodsByRestaurantName/${restaurantName}`)
    .then(
        res => {
            return res.data;
        }
    ).catch(function (error) {
          console.log(error);
          return []
      });
}