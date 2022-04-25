import PlaceOrder from "../modules/PlaceOrder"

export default function CartScreen({cart,placeOrder}){
    return(
        <div>
            {cart.map((order) =>  <PlaceOrder order = {order} placeOrder ={placeOrder} />)}
        </div>
    )
}