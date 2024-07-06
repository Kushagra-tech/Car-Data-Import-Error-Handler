import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import HomeTable from "../src/components/HomeTable";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";

jest.mock("axios");

describe("HomeTable Component", () => {
  const tableData = [
    {
      _id: "1",
      Make: "Toyota",
      Model: "Camry",
      Year: 2020,
      Color: "Red",
      Price: 25000,
      Mileage: "30,000 miles",
      Transmission: "Automatic",
      FuelType: "Gasoline",
    },
    {
      _id: "2",
      Make: "Honda",
      Model: "Civic",
      Year: 2019,
      Color: "Blue",
      Price: 20000,
      Mileage: "25,000 miles",
      Transmission: "Manual",
      FuelType: "Gasoline",
    },
    // Add more sample rows as needed
  ];

  const setChangeMock = jest.fn();

  beforeEach(() => {
    axios.delete.mockReset();
    setChangeMock.mockClear();
  });

  test("renders table rows correctly", () => {
    const { getAllByRole } = render(
      <BrowserRouter>
        <HomeTable tableData={tableData} setChange={setChangeMock} />
      </BrowserRouter>
    );
    const rows = getAllByRole("row");
    expect(rows.length).toBe(tableData.length + 1); // +1 for header row
  });

  test("handles delete button click correctly", async () => {
    axios.delete.mockResolvedValueOnce({
      data: { message: "Successfully deleted" },
    });

    const { getByTestId } = render(
      <BrowserRouter>
        <HomeTable tableData={tableData} setChange={setChangeMock} />
      </BrowserRouter>
    );

    fireEvent.click(getByTestId("delete-button-1"));

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith(
        "http://localhost:5001/api/delete/1",
        {
          headers: {
            Authorization: "Bearer null", // Adjust mock token as needed
          },
        }
      );
    });

    expect(setChangeMock).toHaveBeenCalled();
  });

  test("handles view button click correctly", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <HomeTable tableData={tableData} setChange={setChangeMock} />
      </BrowserRouter>
    );

    fireEvent.click(getByTestId("view-button-1"));

    // Implement assertions for navigation or state verification
    // Example: expect(navigate).toHaveBeenCalledWith('/view', { state: { rowObject: { Model: 'Camry', ... } } });
  });

  test("handles edit button click correctly", () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <HomeTable tableData={tableData} setChange={setChangeMock} />
      </BrowserRouter>
    );

    const btn = getByTestId("edit-button-1");

    fireEvent.click(btn);

    // Implement assertions for navigation or state verification
    // Example: expect(navigate).toHaveBeenCalledWith('/edit', { state: { rowObject: { _id: '1', Make: 'Toyota', ... } } });
  });
});
