import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useShowRestaurants from "../utils/useShowRestaurants";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Body = () => {

    // let listOfRestaurants = [
    //     {
    //         id: "1",
    //         name: "Andhra Biryani",
    //         cuisine: "Biryani, South Indian",
    //         rating: 5.0,
    //         sla: {
    //             deliveryTime: "10 min",
    //         },
    //         costForTwo: "Rs. 500",
    //     },
    //     {
    //         id: "2",
    //         name: "Punjab Bistro",
    //         cuisines: "North Indian, Continental",
    //         avgRating: 3.5,
    //         sla: {
    //             deliveryTime: "20 min",
    //         },
    //         costForTwo: "Rs. 1000",
    //     },
    //     {
    //         id: "3",
    //         name: "Rameshwaram Cafe",
    //         cuisines: "South India, Tea, Coffee",
    //         avgRating: 4.7,
    //         sla: {
    //             deliveryTime: "40 min",
    //         },
    //         costForTwo: "Rs. 500",
    //     },
    //     {
    //         id: "4",
    //         name: "Vishnu Palace",
    //         cuisines: "North Indian, South India, Juices, Milkshakes",
    //         avgRating: 3.0,
    //         sla: {
    //             deliveryTime: "10 min",
    //         },
    //         costForTwo: "Rs. 250",
    //     },
    // ];
    const [restaurants, setRestaurant] = useState([]);
    const [filteredRestaurants, setFilteredRestaurant] = useState([]);
    const [searchText, setSearchText] = useState("");
    const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);
    const { loggedInUser, setUserName } = useContext(UserContext);

    const resData = useShowRestaurants();

    // -------- Approach 1 (Giving infinite render) --------
    // setRestaurant(resData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants?.map((restaurant) => restaurant.info));
    // setFilteredRestaurant(resData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants?.map((restaurant) => restaurant.info));
    
    // -------- Approach 2 (Approach works - Preffered)--------
    // useEffect(() => {
    //     if (resData !== null) {
    //         setRestaurant(resData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants?.map((restaurant) => restaurant.info));
    //         setFilteredRestaurant(resData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants?.map((restaurant) => restaurant.info));
    //     }
    // }, [resData]);

    // -------- Approach 3 (Approach works - But not a good one since resData can have restaurants length to be 0 form backend. Then this will be an infinite loop) --------
    // if (resData !== null && restaurants.length === 0) {
    //     setRestaurant(resData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants?.map((restaurant) => restaurant.info));
    //     setFilteredRestaurant(resData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants?.map((restaurant) => restaurant.info));
    // };

    // -------- Approach 4 (Approach works - But not a good one since we have restaurants and filteredRestaurants as constant variables and not state variables hence values wont be saved across renders) --------
    // const restaurants = resData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants?.map((restaurant) => restaurant.info)
    // const filteredRestaurants = resData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants?.map((restaurant) => restaurant.info)

    useEffect(() => {
        if (resData !== null) {
            setRestaurant(resData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants?.map((restaurant) => restaurant.info));
            setFilteredRestaurant(resData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants?.map((restaurant) => restaurant.info));
            console.log("Restaurants obtained are", resData);
        };
    }, [resData]);

    // const data = useRestaurantData();
    // useEffect(() => {
    //     console.log("Running this if", data);
        
    // }, [data]);
    // console.log("Restuarant length is", restaurants.length);
    // if (data !== null && restaurants.length === 0) {
    //     setRestaurant(data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants?.map((restaurant) => restaurant.info));
    //     setFilteredRestaurant(data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants?.map((restaurant) => restaurant.info));
    // };
    // useEffect(() => {
    //     fetchData();
    // }, []);

    // const fetchData = async () => {
    //     const data = await fetch(
    //         "https://proxy.cors.sh/https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.2149603&lng=72.8204375&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING",
    //         {
    //             headers: {
    //                 'x-cors-api-key': 'temp_4f368d1c5fd1cd4bcd0dc6b46d054b19',
    //             }
    //         }
    //     );
    //     // const data = await fetch(
    //     //     "https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.2149603&lng=72.8204375&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    //     // );
    //     const json = await data.json();
    //     setRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants?.map((restaurant) => restaurant.info));
    //     setFilteredRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants?.map((restaurant) => restaurant.info));
    // }

    const onlineStatus = useOnlineStatus();

    return (restaurants.length === 0 ? (<Shimmer />) : (
        <div className='body'>
            <div className="filter flex">
                <div className="search m-4 p-4">
                    <input type="text" data-testid="search-input" className="search-box border-solid border-2 border-black" value={searchText} onChange={(e) => setSearchText(e.target.value)}></input>
                    <button className="search-button bg-green-100 px-3 py-2 m-4 rounded-2xl" onClick={() => {
                        // Filter the restaurant card and update the UI.
                        // searchText
                        const filteredRestaurants = restaurants.filter((restaurant) => restaurant.name.toUpperCase().includes(searchText.toUpperCase()));
                        setFilteredRestaurant(filteredRestaurants);
                    }}>Search</button>
                </div>
                <div className="search m-4 p-4 flex items-center">
                    <button className="filter-btn bg-gray-100 px-3 py-2 m-4 rounded-2xl" onClick={() => {
                        // Write down the filter logic
                        setFilteredRestaurant(filteredRestaurants.filter((restaurant) => restaurant.avgRating >= 4.5));
                    }}>Top Rated Restaurants</button>
                </div>
                <div className="search m-4 p-4 flex items-center">
                    <label>UserName : </label>
                    <input className="border border-black p-2" value={loggedInUser} onChange={(e) => setUserName(e.target.value)}/>
                </div>
            </div>
            <div className='flex flex-wrap'>
                {
                    filteredRestaurants.map((restaurant) => {
                        return (
                            <Link key={restaurant.id} to={"/restaurants/"+restaurant.id}>
                                {
                                    (restaurant.avgRating >= 4.5) ? (<RestaurantCardPromoted restaurant={restaurant}/>) : (<RestaurantCard restaurant={restaurant} />)
                                }
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    ));
};

export default Body;
