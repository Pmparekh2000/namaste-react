import { useEffect, useState } from "react";
import { MENU_API } from "./constants";

const useRestaurantMenu = (resId) => {
    const [restaurantInfo, setRestaurantInfo] = useState(null);
    useEffect(() => {
        fetchData(resId);
    }, []);
    const fetchData = async (resId) => {
        const data = await fetch(MENU_API + resId + "&catalog_qa=undefined&submitAction=ENTER");
        const json = await data.json();
        setRestaurantInfo(json);
    }
    return restaurantInfo;
};

export default useRestaurantMenu;
