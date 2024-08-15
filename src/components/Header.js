import { useEffect, useState, useContext } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
    const [btnNameReact, setBtnNameReact] = useState("Login");
    const onlineStatus = useOnlineStatus();
    const { loggedInUser } = useContext(UserContext);
    const cartItems = useSelector((store) => store.cart.items);
    console.log("cart obtained are", cartItems);

    useEffect(() => {
    }, [btnNameReact]);
    return (
        <div className='flex justify-between bg-pink-200 shadow-sm sm:bg-yellow-200 lg:bg-green-200'>
            <div className='logo-container'>
                <img className='w-44' src={LOGO_URL}></img>
            </div>
            <div className='flex items-center'>
                <ul className="flex m-4 p-2">
                    <li className="px-2">
                        Online Status: {
                            onlineStatus ?
                            "✅" : 
                            "🔴"
                        }
                    </li>
                    <li className="px-3">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="px-3">
                        <Link to="/about-us">About Us</Link>
                    </li>
                    <li className="px-3">
                        <Link to="/contact-us">Contact Us</Link>
                    </li>
                    <li className="px-3">
                        <Link to="/grocery">Grocery</Link>
                    </li>
                    <li className="px-3 font-bold text-xl">
                        <Link to="/cart">
                            Cart ({cartItems.length} items)
                        </Link>
                    </li>
                    <button className="login px-3" onClick={() => {
                        setBtnNameReact(btnNameReact === "Login" ? "Logout" : "Login" );
                    }}>{btnNameReact}</button>
                    <li className="px-4 font-bold">{loggedInUser}</li>
                </ul>
            </div>
        </div>
    );
};

export default Header;
