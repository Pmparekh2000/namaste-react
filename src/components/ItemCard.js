import { useDispatch } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { addItems } from "../utils/cartSlice";

const ItemCard = ({itemCard}) => {

    const dispatch = useDispatch();

    const handleAddItem = (itemCard) => {
        // dispatch an action
        dispatch(addItems(itemCard));
    };

    return (
        <div data-testid="foodItems" className="flex flex-col p-1 border-b-2 border-gray-300 hover:bg-white hover:shadow-xl hover:cursor-pointer">
            <div>
                <img src={CDN_URL+itemCard.imageId} className="w-56"></img>
                <button
                    data-testid="addItemButton"
                    className="bg-orange-300 p-2 shadow-lg rounded-2xl float-left my-2 hover:cursor"
                    onClick={() => handleAddItem(itemCard)}
                >Add Item +</button>
            </div>
            <div className="flex">
                <div className="text-left">
                    {itemCard.name}
                </div>
                <div className="justify-end ml-5">
                    ₹ {itemCard.price ? itemCard.price/100 : itemCard.defaultPrice/100}
                </div>
            </div>
            <div className="text-gray-500 text-xs text-left py-2">{itemCard.description}</div>
        </div>
    );
};

export default ItemCard;
