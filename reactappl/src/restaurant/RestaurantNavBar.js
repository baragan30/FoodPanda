import {Link} from "react-router-dom"

function RestaurantNavBar({curentRestaurant}){
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">{curentRestaurant.name}</Link>
      
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
    
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to = './foods'>Foods <span className="sr-only">(current)</span></Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to = './orders'>Orders <span className="sr-only">(current)</span></Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to = './restaurants'>Restaurants <span className="sr-only">(current)</span></Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to = '/'>Log Out <span className="sr-only">(current)</span></Link>
          </li>
        </ul>
      </div>
    </nav>
  )
  }

  export default RestaurantNavBar;