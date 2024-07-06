import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import UploadCsv from "../src/pages/AddCsv";

jest.mock("axios");

const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/login" element={<div>Login Page</div>} />
        <Route path="*" element={ui} />
      </Routes>
    </MemoryRouter>
  );
};

describe("UploadCsv Component", () => {
  beforeEach(() => {
    localStorage.setItem("token", "test-token");
  });

  afterEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
  });

  it("should display a message if no file is selected on submit", () => {
    renderWithRouter(<UploadCsv />, { route: "/upload" });

    fireEvent.click(screen.getByTestId("upload"));

    expect(
      screen.getByText("Please select a file to upload.")
    ).toBeInTheDocument();
  });

  // it("should upload the file successfully and navigate to home", async () => {
  //   const file = new File(["dummy content"], "example.csv", {
  //     type: "text/csv",
  //   });
  //   axios.post.mockResolvedValue({
  //     statusText: "OK",
  //     data: { message: "File uploaded successfully" },
  //   });

  //   renderWithRouter(<UploadCsv />, { route: "/upload" });

  //   fireEvent.change(screen.getByTestId("uploadButton"), {
  //     target: { files: [file] },
  //   });
  //   fireEvent.click(screen.getByTestId("upload"));

  //   await waitFor(() => {
  //     expect(
  //       screen.getByText("File uploaded successfully")
  //     ).toBeInTheDocument();
  //   });

  //   await waitFor(() => {
  //     expect(screen.getByText("Home Page")).toBeInTheDocument();
  //   });
  // });

  it("should navigate to login if the token is expired", async () => {
    const file = new File(["dummy content"], "example.csv", {
      type: "text/csv",
    });
    axios.post.mockResolvedValue({ status: 401, data: { token: true } });

    renderWithRouter(<UploadCsv />, { route: "/upload" });

    fireEvent.change(screen.getByTestId("uploadButton"), {
      target: { files: [file] },
    });
    fireEvent.click(screen.getByTestId("upload"));

    await waitFor(() => {
      expect(screen.getByText("Login Page")).toBeInTheDocument();
    });
  });

  it("should display an error message if upload fails", async () => {
    const file = new File(["dummy content"], "example.csv", {
      type: "text/csv",
    });
    axios.post.mockRejectedValue(new Error("Network response was not ok"));

    renderWithRouter(<UploadCsv />, { route: "/upload" });

    fireEvent.change(screen.getByTestId("uploadButton"), {
      target: { files: [file] },
    });
    fireEvent.click(screen.getByTestId("upload"));

    await waitFor(() => {
      expect(
        screen.getByText("Network response was not ok")
      ).toBeInTheDocument();
    });
  });

  // it("should show loading spinner while uploading", async () => {
  //   const file = new File(["dummy content"], "example.csv", {
  //     type: "text/csv",
  //   });
  //   axios.post.mockImplementation(() => {
  //     return new Promise((resolve) =>
  //       setTimeout(() => resolve({ statusText: "OK" }), 1000)
  //     );
  //   });

  //   renderWithRouter(<UploadCsv />, { route: "/upload" });

  //   fireEvent.change(screen.getByTestId("uploadButton"), {
  //     target: { files: [file] },
  //   });
  //   fireEvent.click(screen.getByTestId("upload"));

  //   await waitFor(() => {
  //     expect(screen.getByText("Loading")).toBeInTheDocument();
  //   });
  // });
});
