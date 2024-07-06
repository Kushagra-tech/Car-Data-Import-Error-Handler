import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import EditRow from "../src/pages/EditRow";

jest.mock("axios");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    state: {
      rowObject: {
        _id: "1",
        Make: "Toyota",
        Model: "Camry",
        Year: 2020,
        Color: "Blue",        Color: "Blue",

        Price: 25000,
        Mileage: 15000,
        Transmission: "Automatic",
        FuelType: "Petrol",
      },
    },
  }),
  useNavigate: jest.fn(),
}));

describe("EditRow component", () => {
  let originalConsoleLog;
  let mockNavigate;

  beforeEach(() => {
    localStorage.clear(); // Clear localStorage before each test
    originalConsoleLog = console.log;
    console.log = jest.fn(); // Mock console.log
    mockNavigate = jest.fn();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockImplementation(() => mockNavigate);
    localStorage.setItem("token", "test-token");
  });

  afterEach(() => {
    console.log = originalConsoleLog; // Restore original console.log
    jest.clearAllMocks(); // Clear all mocks after each test
  });

  it("should log error message if API call fails", async () => {
    render(<EditRow />, { wrapper: MemoryRouter });

    const mockError = { response: { data: {} } };
    axios.post.mockRejectedValueOnce(mockError);

    fireEvent.submit(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith("Network Error");
    });
  });

  it("should handle token expiration and redirect to login page", async () => {
    render(<EditRow />, { wrapper: MemoryRouter });

    const mockError = { response: { data: { token: true } } };
    axios.post.mockRejectedValueOnce(mockError);

    fireEvent.submit(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith("Token expired");
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });
});
