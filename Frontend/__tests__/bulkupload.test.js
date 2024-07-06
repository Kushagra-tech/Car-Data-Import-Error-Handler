import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import BulkUpload from "../src/pages/BulkUpload";
import { BrowserRouter } from "react-router-dom";

// Mock axios
jest.mock("axios");

describe("BulkUpload", () => {
  beforeEach(() => {
    axios.get.mockClear();
  });

  it("should handle API errors gracefully", async () => {
    const errorMessage = "Upload failed.";
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    // Mock console.log to avoid cluttering the test output
    jest.spyOn(console, "log").mockImplementation(() => {});

    render(
      <BrowserRouter>
        <BulkUpload />
      </BrowserRouter>
    );

    // Wait for the fetchData function to complete and handle the error
    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith("error");
      expect(console.log).toHaveBeenCalledWith(errorMessage);
    });

    console.log.mockRestore(); // Restore the original console.log
  });
});
