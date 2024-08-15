import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ContactUs from "../ContactUs";

describe("Testing ContactUs page", () => {

    it("Should load contactUs component", () => {
        render(<ContactUs />);
        const heading = screen.getByRole("heading");
        expect(heading).toBeInTheDocument();
    });

    it("Should load button inside ContactUs component", () => {
        render(<ContactUs />);
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
    });

    it("Should load input name inide ContactUs component", () => {
        render(<ContactUs />);
        const inputName = screen.getByPlaceholderText("name");
        expect(inputName).toBeInTheDocument();
    });

    it("Should load 2 input boxes name inide ContactUs component", () => {
        render(<ContactUs />);
        const allInput = screen.getAllByRole("textbox");
        expect(allInput.length).toBe(2);
    });

});