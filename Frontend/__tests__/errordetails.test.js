import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import ErrorDetails from "../src/pages/ErrorDetails";
import { MemoryRouter, useLocation } from "react-router-dom";

// Mock the axios module
jest.mock("axios");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
}));

const mockUseLocation = useLocation;

describe("ErrorDetails component", () => {
  beforeEach(() => {
    // Mock the useLocation hook to return a specific state
    mockUseLocation.mockReturnValue({
      state: { fileName: "test-file.txt" },
    });

    // Clear all mocks before each test
    jest.clearAllMocks();
  });
  it("should render without crashing", () => {
    render(
      <MemoryRouter>
        <ErrorDetails />
      </MemoryRouter>
    );
    expect(screen.getByText(/\/0/i)).toBeInTheDocument();
  });

  it("should log error message if API call fails", async () => {
    console.log = jest.fn();
    const mockError = new Error("Network Error");
    axios.get.mockRejectedValueOnce(mockError);

    render(
      <MemoryRouter>
        <ErrorDetails />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith("Network Error");
    });
  });
});
