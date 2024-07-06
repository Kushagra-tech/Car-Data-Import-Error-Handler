import { useEffect, useState } from "react";
import axios from "axios";
import FileTable from "../components/FileTable";

const BulkUpload = () => {
  const [change, setChange] = useState(true);

  const [tableData, setTableData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/posts?pageNumber=${0}&pageSize=${0}&file=${0}&check=bulk`
      );
      if (response.statusText !== "OK") {
        throw new Error("Upload failed.");
      }

    } catch (error) {
      console.log("error");
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, [change]);
  return (
    <div>
      <FileTable tableData={tableData} />
    </div>
  );
};

export default BulkUpload;
