/* eslint-disable no-undef */
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { MemoryRouter as Router, useLocation } from "react-router-dom"; 
import View from "../src/pages/View";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), 
  useLocation: jest.fn(), 
}));

describe("View Component", () => {
  test("renders car details correctly", () => {
    const mockLocation = {
      state: {
        rowObject: {
          Make: "Toyota",
          Model: "Camry",
          Year: 2023,
          Color: "Silver",
          Price: 25000,
          Mileage: 30000,
          Transmission: "Automatic",
          FuelType: "Gasoline",
        },
      },
    };

    useLocation.mockReturnValue(mockLocation);

    const { getByText } = render(
      <Router>
        <View />
      </Router>
    );

    expect(getByText("Car Details")).toBeInTheDocument();
    expect(getByText("Make:")).toBeInTheDocument();
    expect(getByText("Toyota")).toBeInTheDocument();
    expect(getByText("Model:")).toBeInTheDocument();
    expect(getByText("Camry")).toBeInTheDocument();
    expect(getByText("Year:")).toBeInTheDocument();
    expect(getByText("2023")).toBeInTheDocument();
    expect(getByText("Color:")).toBeInTheDocument();
    expect(getByText("Silver")).toBeInTheDocument();
    expect(getByText("Price:")).toBeInTheDocument();
    expect(getByText("25000")).toBeInTheDocument();
    expect(getByText("Mileage:")).toBeInTheDocument();
    expect(getByText("30000")).toBeInTheDocument();
    expect(getByText("Transmission:")).toBeInTheDocument();
    expect(getByText("Automatic")).toBeInTheDocument();
    expect(getByText("FuelType:")).toBeInTheDocument();
    expect(getByText("Gasoline")).toBeInTheDocument();
  });
});
