import { useEffect, useState } from "react";
import axios from "axios";
import ErrorTable from "../components/ErrorTable";
import { useLocation } from "react-router-dom";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const ErrorDetails = () => {
  const location = useLocation();
  const fileName = location.state.fileName;
  const [change, setChange] = useState(true);
  const [pageNumber, setPageNumber] = useState({
    pages: 1,
    count: 0,
    counter: 1,
  });

  const [tableData, setTableData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/posts?pageNumber=${pageNumber.pages}&pageSize=10&file=${fileName}&check=error`
      );
      if (response.statusText !== "OK") {
        throw new Error("Upload failed.");
      }
      setTableData(response.data.posts);
      setPageNumber((prev) => ({
        ...prev,
        count: response.data.count,
      }));
      setChange(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, [change]);
  const handleNextIndex = () => {
    if (pageNumber.pages * 10 <= pageNumber.count - 10) {
      setPageNumber((prev) => ({
        ...prev,
        pages: prev.pages + 1,
        counter: prev.counter + 1,
      }));
      setChange(true);
    }
  };
  const handlePreviousIndex = () => {
    if (pageNumber.pages > 1) {
      setPageNumber((prev) => ({
        ...prev,
        pages: prev.pages - 1,
        counter: prev.counter - 1,
      }));
      setChange(true);
    }
  };

  return (
    <div>
      <ErrorTable tableData={tableData} />
      <div className="flex justify-center items-center gap-2 m-4 absolute left-1/2 -translate-x-1/2">
        <button
          className="px-2 py-3 text-gray-700 bg-gray-200 hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 rounded-md space-x-8"
          onClick={handlePreviousIndex}
        >
          <GrFormPrevious />
        </button>
        <button> {`${pageNumber.counter * 10} /${pageNumber.count}`}</button>
        <button
          className="px-2 py-3 text-gray-700 bg-gray-200 hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 rounded-md space-x-8"
          onClick={handleNextIndex}
        >
          <GrFormNext />
        </button>
      </div>
    </div>
  );
};

export default ErrorDetails;
