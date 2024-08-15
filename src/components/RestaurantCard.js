import { useContext } from "react";
import CDN_URL_2, { CDN_URL } from "../utils/constants";
import UserContext from "../utils/UserContext";

const RestaurantCard = (props) => {
    const {loggedInUser} = useContext(UserContext);
    const resName = props.restaurant.name;
    const cuisine = props.restaurant.cuisines.join(", ");
    const rating = props.restaurant.avgRating;
    const timeToDelivery = props.restaurant.sla.deliveryTime;
    const costForTwo = props.restaurant.costForTwo;
    const cloudinaryImageId = props.restaurant.cloudinaryImageId;
    return (
        <div data-testid="resCard" className="m-4 p-4 w-[200px] rounded-2xl hover:shadow-xl hover:bg-blue-100 bg-gray-50">
            <img
                className='rounded-2xl'
                alt='res-logo'
                src={CDN_URL+cloudinaryImageId}
            >
            </img>
            <h3 className="font-bold py-4 text-lg">{resName}</h3>
            <h4>{cuisine}</h4>
            <h4 className="underline">{rating} stars</h4>
            <h4>{timeToDelivery} min</h4>
            <h4>User: {loggedInUser}</h4>
            <h4 className="font-bold">{costForTwo}</h4>
        </div>
    );
};

// Higher Order Component

// input -> Restaurant card
// output -> Restaurant card with promoted label

export const withPromotedLabel = (RestaurantCard) => {
    return (props) => {
        return (
            <div>
                <label className="absolute bg-black text-white m-2 p-2 rounded-lg">Swiggy Recommended</label>
                <RestaurantCard {...props} />
            </div>
        );
    };
};

export default RestaurantCard;
