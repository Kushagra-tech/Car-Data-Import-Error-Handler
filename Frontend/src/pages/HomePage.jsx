import { useEffect, useState } from "react";
import HomeTable from "../components/HomeTable";
import axios from "axios";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import DropDown from "../components/DropBox";
import SearchBar from "../components/SearchBar";

const HomePage = () => {
  const [tableData, setTableData] = useState([]);
  const [pageNumber, setPageNumber] = useState({
    pages: 1,
    count: 0,
    pageSize: 10,
  });
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [change, setChange] = useState(true);
  const [index, setIndex] = useState({
    firstIndex: 0,
    lastIndex: 5,
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/posts?pageNumber=${
          pageNumber.pages
        }&pageSize=${pageNumber.pageSize}&file=${0}&check=cardetails`
      );
      if (response.statusText !== "OK") {
        throw new Error("Upload failed.");
      }

      let data = response.data.posts;
      if (search !== "") {
        data = data.filter((ele) => JSON.stringify(ele).includes(search));
      }

      if (sort !== "") {
        data = data.sort((a, b) => {
          return a[sort] - b[sort];
        });
      }

      setTableData(data);
      setPageNumber((prev) => ({
        ...prev,
        count: response.data.totalCount,
      }));
      setChange(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleNextIndex = () => {
    const totalPages = Math.ceil(pageNumber.count / pageNumber.pageSize);
    if (index.lastIndex < totalPages) {
      setIndex((prev) => ({
        firstIndex: prev.firstIndex + 5,
        lastIndex: Math.min(totalPages, prev.lastIndex + 5),
      }));
    }
  };

  const handlePreviousIndex = () => {
    if (index.firstIndex > 0) {
      setIndex((prev) => ({
        firstIndex: Math.max(0, prev.firstIndex - 5),
        lastIndex: prev.firstIndex,
      }));
    }
  };

  useEffect(() => {
    fetchData();
  }, [change]);

  const elements = [];
  const start = index.firstIndex;
  const totalPages = Math.ceil(pageNumber.count / pageNumber.pageSize);
  const end = Math.min(index.lastIndex, totalPages) - 1;

  for (let i = start; i <= end; i++) {
    elements.push(
      <button
        key={i}
        className="px-2 py-2 text-gray-700 bg-gray-200 hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 rounded-md text-xs space-x-8"
        onClick={() => {
          setPageNumber((prev) => ({
            ...prev,
            pages: i + 1,
          }));
          setChange(true);
        }}
      >
        {i + 1}
      </button>
    );
  }

  return (
    <main className="">
      <div className="flex items-center w-[90%] mx-auto justify-between mb-4">
        <SearchBar setSearch={setSearch} setChange={setChange} />
        <DropDown setSort={setSort} setChange={setChange} />
      </div>
      <HomeTable tableData={tableData} setChange={setChange} />
      <div className="flex justify-center items-center gap-2 m-4 absolute left-1/2 -translate-x-1/2">
        <button
          className="px-2 py-3 text-gray-700 bg-gray-200 hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 rounded-md space-x-8"
          onClick={handlePreviousIndex}
        >
          <GrFormPrevious />
        </button>

        {elements}

        <button
          className="px-2 py-3 text-gray-700 bg-gray-200 hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 rounded-md space-x-8"
          onClick={handleNextIndex}
        >
          <GrFormNext />
        </button>

        <span className="text-xs ml-4 font-semibold">{`... ${pageNumber.count}`}</span>

        <div className="">
          <select
            id="pageSize"
            value={pageNumber.pageSize}
            onChange={(e) => {
              setPageNumber((prev) => ({
                ...prev,
                pageSize: parseInt(e.target.value, 10),
                pages: 1,
              }));
              setIndex({ firstIndex: 0, lastIndex: 5 });
              setChange(true);
            }}
            className="px-2 py-2 text-xs border rounded-md"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
