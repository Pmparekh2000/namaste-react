import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Body from "../Body";
import { swiggyData } from "../mocks/mockSwiggyData";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

global.fetch = jest.fn(() => {
    return Promise.resolve({
        json: () => {
            return Promise.resolve(swiggyData)
        },
    });
});

it("Should Search the res list for pizza text input", async() => {
    await act(async () => render(
        <BrowserRouter>
            <Body />
        </BrowserRouter>
    ));
    const cardsBeforeSearch = screen.getAllByTestId("resCard");
    expect(cardsBeforeSearch.length).toBe(8);
    const searchBtn = screen.getByRole("button", {name: "Search"});
    const searchInput = screen.getByTestId("search-input");
    fireEvent.change(searchInput, {
        target: {
            value: "pizza",
        }
    });
    fireEvent.click(searchBtn);
    const cardsAfterSearch = screen.getAllByTestId("resCard");
    expect(cardsAfterSearch.length).toBe(3);
});

it("Should filter top rated restaurant", async () => {
    await act(async () => render(
        <BrowserRouter>
            <Body />
        </BrowserRouter>
    ));
    const cardsBeforeSearch = screen.getAllByTestId("resCard");
    expect(cardsBeforeSearch.length).toBe(8);
    const topRatesRestaurantButton = screen.getByRole("button", {name: "Top Rated Restaurants"});
    fireEvent.click(topRatesRestaurantButton);
    const cardsAfterFilter = screen.getAllByTestId("resCard");
    expect(cardsAfterFilter.length).toBe(5);
});
