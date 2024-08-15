import { BrowserRouter } from "react-router-dom";
import { mockRestaurantMenu } from "../mocks/mockRestaurantMenuData";
import Header from "../Header";
import { act } from "react";
import RestaurantMenu from "../RestaurantMenu";
import Cart from "../Cart";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";

global.fetch = jest.fn(() => {
    return Promise.resolve({
        json: () => {
            return Promise.resolve(mockRestaurantMenu);
        },
    });
});

it("Should load restaurant menu component", async () => {
    await act(async () => render(
        <Provider store={appStore}>
            <BrowserRouter>
                <Header />
                <RestaurantMenu />
                <Cart />
            </BrowserRouter>
        </Provider>        
    ));
    const accordianHeader = screen.getByText("Upma (4)")
    fireEvent.click(accordianHeader);
    const foodItems = screen.getAllByTestId("foodItems");
    expect(foodItems.length).toBe(4);
    const addItemButton = screen.getAllByTestId("addItemButton")[0];
    fireEvent.click(addItemButton);
    fireEvent.click(addItemButton);
    fireEvent.click(addItemButton);
    fireEvent.click(addItemButton);
    expect(appStore.getState().cart.items.length).toBe(4);
    expect(screen.getByText("Cart (4 items)")).toBeInTheDocument();
    fireEvent.click(addItemButton);
    fireEvent.click(addItemButton);
    expect(screen.getByText("Cart (6 items)")).toBeInTheDocument();
    expect(screen.getAllByTestId("foodItems").length).toBe(10);
});
