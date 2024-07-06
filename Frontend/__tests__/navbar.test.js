/* eslint-disable no-undef */
import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../src/pages/NavigationBar";

// Mocking react-router-dom's useNavigate
jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
  };
});

describe("Navbar Component", () => {
  beforeEach(() => {
    // Clear local storage mock before each test
    localStorage.clear();
  });

  test("renders Navbar component", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    // Check if Navbar renders without crashing
    const navbarElement = screen.getByRole("navigation");
    expect(navbarElement).toBeInTheDocument();
  });
  test("logs out user", () => {
    const mockNavigate = jest.fn();
    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);

    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText("Logout"));
  });
});
