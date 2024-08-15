import { render, screen } from "@testing-library/react";
import RestaurantCard, { withPromotedLabel } from "../RestaurantCard";
import { mockRestaurantData } from "../mocks/mockRestaurantData";
import "@testing-library/jest-dom"

it("Should render RestaurantCard component with props data", () => {
    render(<RestaurantCard restaurant={mockRestaurantData} />);
    const name = screen.getByText("Cha - Ya its cup of tea");
    expect(name).toBeInTheDocument();
});

it("should render RestaurantCard component with Promoted Label", () => {
    const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);
    render(<RestaurantCardPromoted restaurant={mockRestaurantData} />);
    const label = screen.getByText("Swiggy Recommended");
    expect(label).toBeInTheDocument();
});
