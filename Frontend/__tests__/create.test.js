import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter, Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import Create from "../src/pages/Create";

jest.mock("axios");

describe("Create component", () => {
  let originalConsoleLog;
  beforeEach(() => {
    localStorage.clear(); // Clear localStorage before each test
    originalConsoleLog = console.log;
    console.log = jest.fn(); // Mock console.log
  });
  afterEach(() => {
    console.log = originalConsoleLog; // Restore original console.log
  });

  it("should render Create Car Details form", () => {
    render(<Create />, { wrapper: MemoryRouter });

    expect(screen.getByText("Create Car Details")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
    expect(screen.getByLabelText("Make:")).toBeInTheDocument();
    expect(screen.getByLabelText("Model:")).toBeInTheDocument();
    expect(screen.getByLabelText("Year:")).toBeInTheDocument();
    expect(screen.getByLabelText("Color:")).toBeInTheDocument();
    expect(screen.getByLabelText("Price:")).toBeInTheDocument();
    expect(screen.getByLabelText("Mileage:")).toBeInTheDocument();
    expect(screen.getByLabelText("Transmission:")).toBeInTheDocument();
    expect(screen.getByLabelText("FuelType:")).toBeInTheDocument();
  });

  it("should update formData state on input change", () => {
    render(<Create />, { wrapper: MemoryRouter });

    const makeInput = screen.getByLabelText("Make:");
    fireEvent.change(makeInput, { target: { value: "Toyota" } });

    expect(makeInput).toHaveValue("Toyota");
  });

  it("should log error message if API call fails", async () => {
    render(<Create />, { wrapper: MemoryRouter });

    const mockError = new Error("Network Error");
    axios.post.mockRejectedValueOnce(mockError);

    fireEvent.submit(screen.getByRole("button", { name: "Submit" }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(console.log).toHaveBeenCalledWith("Network Error");
    });
  });
});
