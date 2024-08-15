import { useDispatch, useSelector } from "react-redux";
import ItemCard from "./ItemCard";
import { clearCart } from "../utils/cartSlice";

export const Cart = () => {
    const cartItems = useSelector((store) => store.cart.items);
    const dispatch = useDispatch();
    console.log("Items obtained inside cart", cartItems);

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <div className="text-center m-4 p-4">
            <h1 className="text-2xl font-bold">Cart</h1>
            <div className="w-6/12 m-auto">
            {
                cartItems.length === 0 ? <></> : (<button className="p-2 m-2 bg-black text-white rounded-lg" onClick={handleClearCart}>Clear Cart</button>)
            }
            {
                cartItems.length === 0 ? <>Sorry, your cart is empty. Please add some items to cart</> : cartItems.map((cartItem) => {
                    return (
                        <div>
                            <ItemCard itemCard={cartItem} />
                        </div>
                    );
                })
            }
            </div>     
        </div>
    );
};

export default Cart;
