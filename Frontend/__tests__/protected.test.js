import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import verifyToken from "../src/helpers/verify";
import Protected from "../src/components/Protected";
// import Navbar from "../src/pages/NavigationBar";

// Mocking dependencies
jest.mock("../src/helpers/verify");
jest.mock("../src/pages/NavigationBar", () => () => <div>Mocked Navbar</div>);

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

describe("Protected Component", () => {
  it("should navigate to home page if token is verified", async () => {
    verifyToken.mockResolvedValue(true);

    renderWithRouter(<Protected />, { route: "/protected" });

    await waitFor(() => {
      expect(screen.getByText("Home Page")).toBeInTheDocument();
    });
  });

  it("should navigate to login page if token is not verified", async () => {
    verifyToken.mockResolvedValue(false);

    renderWithRouter(<Protected />, { route: "/protected" });

    await waitFor(() => {
      expect(screen.getByText("Login Page")).toBeInTheDocument();
    });
  });

  // it("should render Navbar and Outlet components", async () => {
  //   verifyToken.mockResolvedValue(true);

  //   renderWithRouter(<Protected />, { route: "/protected" });

  //   await waitFor(() => {
  //     expect(screen.getByText("Mocked Navbar")).toBeInTheDocument();
  //     expect(screen.getByText("Home Page")).toBeInTheDocument();
  //   });
  // });
});
