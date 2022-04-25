import axios from "axios";
const serverRoot = 'http://localhost:8080'

function AddRestaurantForm({mainComponent}){
    return(
        <form onSubmit= {(event)=>{addNewRestaurant(event,mainComponent)}}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label for="name">Name</label>
            <input type="name" className="form-control"  id="name" placeholder="name"/>
          </div>
          <div className="form-group col-md-6">
          <label for="location">Location</label>
            <input type="location" className="form-control" id="location" placeholder="location"/>
          </div>
        </div>
        <div className="form-group">
          <label for="availableZones">AvailableZones</label>
          <input type="text" className="form-control" id="availableZones" placeholder="available zones"/>
        </div>

        <div className="form-group">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="gridCheck"/>
            <label className="form-check-label" for="gridCheck">
              Check me out
            </label>
          </div>
            <button type="submit" className="btn btn-primary">Add Restaurant</button>
        </div>
      </form>
    );
}

async function addNewRestaurant(event,mainComponent){
    event.preventDefault();
    let restaurant = {
        name:event.target.elements.name.value,
        location:event.target.elements.location.value,
        availableZones:event.target.elements.availableZones.value,
    }
    console.log(restaurant);
    if(restaurant.name !== "" && restaurant.location !== "" && restaurant.availableZones !== ""){
        await axios.post(`${serverRoot}/newrestaurant`, restaurant)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
          mainComponent.setState({restaurants: await mainComponent.getRestaurants()});
    }
}


export default AddRestaurantForm