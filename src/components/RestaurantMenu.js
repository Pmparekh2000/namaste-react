import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { MENU_API } from "../utils/constants";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import useOnlineStatus from "../utils/useOnlineStatus";

// Works for
// http://localhost:1234/restaurants/693334
// http://localhost:1234/restaurants/9867
// http://localhost:1234/restaurants/24518
// http://localhost:1234/restaurants/508472

const RestaurantMenu = () => {
    const [restaurantInfo, setRestaurantInfo] = useState(null);
    const [itemCards, setItemCards] = useState([]);
    const onlineStatus = useOnlineStatus();
    const [showItemsIndex, setShowItemsIndex] = useState(null);
    
    const { resId } = useParams();
    const data = useRestaurantMenu(resId);
    if (data !== null && restaurantInfo === null && itemCards.length === 0) {
        setRestaurantInfo(data?.data?.cards[2]?.card?.card?.info);
        setItemCards(data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter((card) => card?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"));
        console.log("Restaurant Data obtained is", data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter((card) => card?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"));
    }

    // setRestaurantInfo();
    // useEffect(() => {
    //     fetchMenu();
    // }, []);

    // const fetchMenu = async () => {
    //     const data = await fetch(MENU_API + resId + "&catalog_qa=undefined&submitAction=ENTER");
    //     const json = await data.json();
    //     setRestaurantInfo(json?.data?.cards[2]?.card?.card?.info);
    //     setItemCards(json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[3]?.card?.card.itemCards);
    //     console.log("Restaurant data is", json);
    // }
    return onlineStatus === true ? (restaurantInfo == null ? (
        <Shimmer />
    ) : (
        <div className="menu text-center">
            <h1 className="font-bold my-6 text-2xl">{restaurantInfo.name}</h1>
            <div className="font-bold text-lg">
                {
                    restaurantInfo.cuisines.join(", ")
                }
            </div>
            <h2>Menu</h2>
            {
                itemCards.length === 0 ? (<h1>No menu items available</h1>) : (
                    itemCards.map((itemCard, index) => {
                        return (
                            <RestaurantCategory
                                key={index}
                                itemCard={itemCard.card.card}
                                expanded={showItemsIndex === index ? true : false}
                                setShowItemsIndex={() => {
                                    if (index === showItemsIndex) setShowItemsIndex(null);
                                    else setShowItemsIndex(index);
                                }}
                            />
                        )
                    })
                )
            }
        </div>
    )) : (<h1>You seem to be offline. Please check your internet connection. 123</h1>);
};

export default RestaurantMenu;
