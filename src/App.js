import React, { lazy, Suspense, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import Body from './components/Body';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import ContactUs from './components/ContactUs';
import Error from './components/Error';
import RestaurantMenu from './components/RestaurantMenu';
import Shimmer from './components/Shimmer';
import UserContext from './utils/UserContext';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import Cart from './components/Cart';

const Grocery = lazy(() => import('./components/Grocery'));

const About = lazy(() => import('./components/AboutUs'));

const AppLayout = () => {
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const data = {
            name: "Prerak Parekh",
        };
        setUserName(data.name);
    }, []);
    return (
        <Provider store={appStore}>
            <div className='app'>
                <UserContext.Provider value={{ loggedInUser: userName, setUserName: setUserName }}>
                    <div>
                        <UserContext.Provider value={{ loggedInUser: "Siddhi", setUserName: setUserName }}>
                            <Header />
                        </UserContext.Provider>
                    </div>
                    <Outlet />
                </UserContext.Provider>
            </div>
        </Provider>
    );
};

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: '/',
                element: <Body />,
            },
            {
                path: "/about-us",
                element: <Suspense fallback={<Shimmer />}><About /></Suspense>,
            },
            {
                path: "/contact-us",
                element: <ContactUs />,
            },
            {
                path: "/grocery",
                element: (<Suspense fallback={<Shimmer />}><Grocery /></Suspense>),
            },
            {
                path: "/restaurants/:resId",
                element: <RestaurantMenu />,
            },
            {
                path: "/cart",
                element: <Cart />,
            },
        ],
        errorElement: <Error />,
    },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
