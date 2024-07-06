/* eslint-disable no-undef */
import { render, fireEvent } from "@testing-library/react";
import SearchBar from "../src/components/SearchBar";

describe("SearchBar Component", () => {
  test("renders input field correctly", () => {
    const { getByPlaceholderText } = render(
      <SearchBar setSearch={() => {}} setChange={() => {}} />
    );
    const inputElement = getByPlaceholderText("Search...");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "text");
  });

  test("typing in input field triggers setSearch and setChange", () => {
    const setSearchMock = jest.fn();
    const setChangeMock = jest.fn();

    const { getByPlaceholderText } = render(
      <SearchBar setSearch={setSearchMock} setChange={setChangeMock} />
    );

    const inputElement = getByPlaceholderText("Search...");

    fireEvent.change(inputElement, { target: { value: "Test Search" } });

    expect(setSearchMock).toHaveBeenCalledWith("Test Search");
    expect(setChangeMock).toHaveBeenCalledWith(true);
  });
});
