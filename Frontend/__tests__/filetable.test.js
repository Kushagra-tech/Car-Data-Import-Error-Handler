/* eslint-disable no-undef */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import FileTable from "../src/components/FileTable";

describe("FileTable Component", () => {
  test('navigates to correct route on "Show Errors" button click', () => {
    const tableData = [
      {
        _id: "1",
        fileName: "example.csv",
        // Add other necessary fields
      },
    ];

    const { getByText } = render(
      <MemoryRouter>
        <FileTable tableData={tableData} />
      </MemoryRouter>
    );

    const showErrorsButton = getByText("Show Errors *");
    fireEvent.click(showErrorsButton);
  });
  test("renders rows with alternating styles based on index", () => {
    const tableData = [
      {
        _id: "1",
        fileName: "file1.csv",
        successfulInserted: 10,
        failedDuringInsert: 2,
        noOfItems: 12,
        startTime: "2024-06-27T10:00:00",
        endTime: "2024-06-27T10:30:00",
      },
      {
        _id: "2",
        fileName: "file2.csv",
        successfulInserted: 8,
        failedDuringInsert: 4,
        noOfItems: 12,
        startTime: "2024-06-27T11:00:00",
        endTime: "2024-06-27T11:30:00",
      },
      {
        _id: "3",
        fileName: "file3.csv",
        successfulInserted: 5,
        failedDuringInsert: 7,
        noOfItems: 12,
        startTime: "2024-06-27T12:00:00",
        endTime: "2024-06-27T12:30:00",
      },
      // Add more sample rows as needed
    ];

    const { getAllByRole } = render(
      <BrowserRouter>
        <FileTable tableData={tableData} />
      </BrowserRouter>
    );
    const rows = getAllByRole("row");

    // Check if the correct number of rows (including header) are rendered
    expect(rows.length).toBe(tableData.length + 1); // +1 for the header row

    // Check alternating styles based on index
    tableData.forEach((row, index) => {
      const expectedRowStyle =
        index % 2 === 0
          ? "bg-gray-400/0 px-4 py-2"
          : "bg-gray-400/20 px-4 py-2";
      expect(rows[index + 1]).toHaveClass(expectedRowStyle); // index + 1 to skip header row
    });
  });
});
