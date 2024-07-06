/* eslint-disable no-undef */
/* eslint-disable react/display-name */
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AppRoutes } from "../src/App";

// Mocking components that are lazily loaded
jest.mock("../src/pages/HomePage", () => () => <div>Home Page</div>);
jest.mock("../src/pages/ErrorDetails", () => () => <div>Error Details</div>);

jest.mock("../src/components/Protected", () => {
  return ({ children }) => <div>{children}</div>;
});

jest.mock("../src/pages/Login", () => () => <div>Login Page</div>);
jest.mock("../src/pages/Registration", () => () => (
  <div>Registration Page</div>
));
jest.mock("../src/pages/AddCsv", () => () => <div>Upload CSV File</div>);
jest.mock("../src/pages/Create", () => () => <div>Create</div>);
jest.mock("../src/pages/EditRow", () => () => <div>Edit Row</div>);
jest.mock("../src/pages/BulkUpload", () => () => <div>Bulk Upload</div>);
jest.mock("../src/pages/View", () => () => <div>View</div>);

const renderWithRouter = (route) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <AppRoutes />
    </MemoryRouter>
  );
};

describe("App Component", () => {
  it("should render the login page", async () => {
    renderWithRouter("/login");

    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("should render the registration page", async () => {
    renderWithRouter("/registration");

    expect(screen.getByText("Registration Page")).toBeInTheDocument();
  });

  it("should render the HomePage with a spinner initially", async () => {
    renderWithRouter("/");

    expect(screen.getByTestId("spinner")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Home Page")).toBeInTheDocument();
    });
  });

  it("should render the ErrorDetails page with a spinner initially", async () => {
    renderWithRouter("/errors");

    expect(screen.getByTestId("spinner")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Error Details")).toBeInTheDocument();
    });
  });

  it("should render the UploadCsv page", async () => {
    renderWithRouter("/createcsv");

    expect(screen.getByText("Upload CSV File")).toBeInTheDocument();
  });

  it("should render the Create page", async () => {
    renderWithRouter("/create");

    expect(screen.getByText("Create")).toBeInTheDocument();
  });

  it("should render the EditRow page", async () => {
    renderWithRouter("/edit");

    expect(screen.getByText("Edit Row")).toBeInTheDocument();
  });

  it("should render the BulkUpload page", async () => {
    renderWithRouter("/bulk");

    expect(screen.getByText("Bulk Upload")).toBeInTheDocument();
  });

  it("should render the View page", async () => {
    renderWithRouter("/view");

    expect(screen.getByText("View")).toBeInTheDocument();
  });
});
