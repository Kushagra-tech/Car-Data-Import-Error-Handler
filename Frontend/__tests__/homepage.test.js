// /* eslint-disable react/display-name */
// import { render, screen, waitFor, fireEvent } from "@testing-library/react";
// import axios from "axios";
// import MockAdapter from "axios-mock-adapter";
// import HomePage from "../src/pages/HomePage";
// import { MemoryRouter } from "react-router-dom";

// const mock = new MockAdapter(axios);

// jest.mock("../src/components/SearchBar", () => ({ setSearch, setChange }) => (
//   <input
//     type="text"
//     placeholder="Search..."
//     onChange={(e) => {
//       setSearch(e.target.value);
//       setChange(true);
//     }}
//   />
// ));

// jest.mock("../src/components/DropBox", () => ({ setSort, setChange }) => (
//   <select
//     data-testid="dropdown-select"
//     onChange={(e) => {
//       setSort(e.target.value);
//       setChange(true);
//     }}
//   >
//     <option value="">Sort</option>
//     <option value="Year">Year</option>
//     <option value="Mileage">Mileage</option>
//     <option value="Price">Price</option>
//   </select>
// ));

// jest.mock("../src/components/HomeTable", () => ({ tableData }) => (
//   <div>
//     {tableData.map((item) => (
//       <div key={item.id}>{item.errorsLog[0].error}</div>
//     ))}
//   </div>
// ));

// describe("HomePage Component", () => {
//   afterEach(() => {
//     mock.reset();
//   });

//   const mockData = {
//     posts: [
//       {
//         id: 1,
//         fileName: "test-file.txt",
//         errorsLog: [
//           {
//             row: 1,
//             key: "test-key-1",
//             error: "Test Error 1",
//           },
//         ],
//       },
//     ],
//     totalCount: 1,
//   };

//   it("should log error message if API call fails", async () => {
//     const consoleSpy = jest.spyOn(console, "log");
//     mock.onGet(/\/api\/posts/).reply(500);

//     render(
//       <MemoryRouter>
//         <HomePage />
//       </MemoryRouter>
//     );

//     await waitFor(() => {
//       expect(consoleSpy).toHaveBeenCalledWith(
//         "Request failed with status code 500"
//       );
//     });

//     consoleSpy.mockRestore();
//   });

//   // it("should handle pagination next and previous buttons", async () => {
//   //   const mockDataMultiple = {
//   //     posts: Array.from({ length: 20 }, (_, i) => ({
//   //       id: i,
//   //       fileName: `test-file-${i}.txt`,
//   //       errorsLog: [
//   //         {
//   //           row: i,
//   //           key: `test-key-${i}`,
//   //           error: `Test Error ${i}`,
//   //         },
//   //       ],
//   //     })),
//   //     totalCount: 20,
//   //   };

//   //   mock.onGet(/\/api\/posts/).reply(200, mockDataMultiple);

//   //   render(
//   //     <MemoryRouter>
//   //       <HomePage />
//   //     </MemoryRouter>
//   //   );

//   //   await waitFor(() => {
//   //     expect(screen.getByText("Test Error 0")).toBeInTheDocument();
//   //   });

//   //   fireEvent.click(screen.getByRole("button", { name: /2/i }));

//   //   await waitFor(() => {
//   //     expect(screen.getByText("Test Error 10")).toBeInTheDocument();
//   //   });

//   //   fireEvent.click(screen.getByRole("button", { name: /Previous/i }));

//   //   await waitFor(() => {
//   //     expect(screen.getByText("Test Error 0")).toBeInTheDocument();
//   //   });
//   // });

//   it("should update state when search is used", async () => {
//     mock.onGet(/\/api\/posts/).reply(200, mockData);

//     render(
//       <MemoryRouter>
//         <HomePage />
//       </MemoryRouter>
//     );

//     fireEvent.change(screen.getByPlaceholderText("Search..."), {
//       target: { value: "Test Error 1" },
//     });

//     await waitFor(() => {
//       expect(screen.getByText("Test Error 1")).toBeInTheDocument();
//     });
//   });

//   it("should update state when sort is used", async () => {
//     const mockDataSortable = {
//       posts: [
//         {
//           id: 1,
//           fileName: "file1",
//           Year: 2020,
//           errorsLog: [{ error: "Error A" }],
//         },
//         {
//           id: 2,
//           fileName: "file2",
//           Year: 2019,
//           errorsLog: [{ error: "Error B" }],
//         },
//       ],
//       totalCount: 2,
//     };

//     mock.onGet(/\/api\/posts/).reply(200, mockDataSortable);

//     render(
//       <MemoryRouter>
//         <HomePage />
//       </MemoryRouter>
//     );

//     fireEvent.change(screen.getByTestId("dropdown-select"), {
//       target: { value: "Year" },
//     });

//     await waitFor(() => {
//       const errors = screen.getAllByText(/Error/);
//       expect(errors[0]).toHaveTextContent("Error B");
//       expect(errors[1]).toHaveTextContent("Error A");
//     });
//   });

//   it("should update state when page size is changed", async () => {
//     mock.onGet(/\/api\/posts/).reply(200, mockData);

//     render(
//       <MemoryRouter>
//         <HomePage />
//       </MemoryRouter>
//     );

//     fireEvent.change(screen.getByDisplayValue("10"), {
//       target: { value: "20" },
//     });

//     await waitFor(() => {
//       expect(screen.getByText("Test Error 1")).toBeInTheDocument();
//     });
//   });
// });
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import HomePage from "../src/pages/HomePage";
import { MemoryRouter } from "react-router-dom";

const mock = new MockAdapter(axios);

describe("HomePage Component", () => {
  afterEach(() => {
    mock.reset();
  });

  it("should update state when search is used", async () => {
    const mockData = {
      posts: [
        {
          id: 1,
          fileName: "test-file.txt",
          errorsLog: [{ error: "Test Error 1" }],
        },
      ],
      totalCount: 1,
    };

    mock.onGet(/\/api\/posts/).reply(200, mockData);

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Search..."), {
      target: { value: "Test Error 1" },
    });

    await waitFor(() => {
      expect(screen.getByText("Test Error 1")).toBeInTheDocument();
    });
  });
});
