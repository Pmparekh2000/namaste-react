import { useEffect, useState } from "react";
import { CORS_PROXY, RESTAURANT_API } from "./constants";

const useShowRestaurants = () => {
    // console.log("Coming inside useShowRestaurants");
    const [restaurants, setRestaurants] = useState(null);

    useEffect(() => {
        // console.log("Executing useEffect of useShowRestaurants");
        fetchRestaurantData();
    }, []);

    const fetchRestaurantData = async () => {
        const data = await fetch(
            CORS_PROXY + RESTAURANT_API,
            {
                headers: {
                    'x-cors-api-key': 'temp_4f368d1c5fd1cd4bcd0dc6b46d054b19',
                },
            },
        );
        const json = await data.json();
        setRestaurants(json);
    };

    // console.log("restaurants obtained are", restaurants);

    return restaurants;
};

export default useShowRestaurants;
