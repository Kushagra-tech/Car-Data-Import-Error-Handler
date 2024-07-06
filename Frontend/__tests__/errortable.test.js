/* eslint-disable no-undef */
import React from "react";
import { render } from "@testing-library/react";
import ErrorTable from "../src/components/ErrorTable";

describe("ErrorTable Component", () => {
  it("renders correctly with empty tableData", () => {
    const emptyTableData = [];
    const { getByText } = render(<ErrorTable tableData={emptyTableData} />);

    const bulkUploadDetailsHeading = getByText("Bulk Upload Details");
    expect(bulkUploadDetailsHeading).toBeInTheDocument();
  });

  it("renders correctly with populated tableData", () => {
    const mockTableData = [
      {
        _id: "1",
        fileName: "file1.csv",
        errorsLog: [
          { _id: "1", row: 1, key: "key1", error: "Error 1" },
          { _id: "2", row: 2, key: "key2", error: "Error 2" },
        ],
      },
      {
        _id: "2",
        fileName: "file2.csv",
        errorsLog: [{ _id: "3", row: 1, key: "key1", error: "Error 1" }],
      },
    ];
    const { getByText, getAllByTestId } = render(
      <ErrorTable tableData={mockTableData} />
    );

    const bulkUploadDetailsHeading = getByText(/Bulk Upload Details/i);
    expect(bulkUploadDetailsHeading).toBeInTheDocument();

    // Check table headers
    expect(getByText("FileName")).toBeInTheDocument();
    expect(getByText("Row")).toBeInTheDocument();
    expect(getByText("Key")).toBeInTheDocument();
    expect(getByText("Error")).toBeInTheDocument();

    // Check table rows and cells
    const cells = getAllByTestId("table-cell");
    expect(cells).toHaveLength(13); // 2 rows * 4 cells per row

    // Check specific content in the table
    expect(getByText("file1.csv")).toBeInTheDocument();
    expect(getByText("file2.csv")).toBeInTheDocument();
  });
});
