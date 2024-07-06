/* eslint-disable no-undef */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import DropDown from "../src/components/DropBox";

describe("DropDown Component", () => {
  const setSortMock = jest.fn();
  const setChangeMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default "Sort" option selected', () => {
    const { getByTestId } = render(
      <DropDown setSort={setSortMock} setChange={setChangeMock} />
    );
    const selectElement = getByTestId("dropdown-select");

    expect(selectElement.value).toBe(""); // Default option value
    expect(selectElement.children).toHaveLength(4); // Including the default "Sort" option
  });

  it("calls setSort and setChange correctly when selecting an option", () => {
    const { getByTestId } = render(
      <DropDown setSort={setSortMock} setChange={setChangeMock} />
    );
    const selectElement = getByTestId("dropdown-select");

    // Simulate selecting "Year" option
    fireEvent.change(selectElement, { target: { value: "Year" } });

    expect(setSortMock).toHaveBeenCalledWith("Year");
    expect(setChangeMock).toHaveBeenCalledWith(true);
  });
});
