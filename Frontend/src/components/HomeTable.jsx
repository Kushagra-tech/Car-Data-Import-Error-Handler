import PropTypes from "prop-types";
import { FaTrash, FaEdit } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";

import axios from "axios";
import { useNavigate } from "react-router-dom";
const HomeTable = ({ tableData, setChange }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const tableStyle = "w-full rounded-xl overflow-hidden";
  const rowStyle = "bg-gray-400/0 px-4 py-2";
  const rowStyle2 = "bg-gray-400/20 px-4 py-2";
  const cellHeaderStyle =
    "border-2 border-white bg-blue-500 text-white px-4 py-2";
  const cellStyle =
    "px-4 py-2 border-2 border-white text-black/50 hover:text-gray-900";
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5001/api/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data.message);
      setChange(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="mx-auto h-[80vh] w-[90%] overflow-y-scroll pr-10">
      <table className={tableStyle}>
        <thead>
          <tr className={`${rowStyle}`}>
            <th className={cellHeaderStyle}>Make</th>
            <th className={cellHeaderStyle}>Model</th>
            <th className={cellHeaderStyle}>Year</th>
            <th className={cellHeaderStyle}>Color</th>
            <th className={cellHeaderStyle}>Price</th>
            <th className={cellHeaderStyle}>Mileage</th>
            <th className={cellHeaderStyle}>Transmission</th>
            <th className={cellHeaderStyle}>FuelType</th>
            <th className={cellHeaderStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableData?.map((row, index) => (
            <tr
              className={index % 2 === 0 ? rowStyle : rowStyle2}
              key={row._id}
            >
              <td className={cellStyle}>{row.Make}</td>
              <td className={cellStyle}>{row.Model}</td>
              <td className={cellStyle}>{row.Year}</td>
              <td className={cellStyle}>{row.Color}</td>
              <td className={cellStyle}>{row.Price}</td>
              <td className={cellStyle}>{row.Mileage}</td>
              <td className={cellStyle}>{row.Transmission}</td>
              <td className={cellStyle}>{row.FuelType}</td>
              <td
                className={`${cellStyle} flex gap-8 cursor-pointer items-center justify-center border-none`}
              >
                <button
                  onClick={() =>
                    navigate("/view", {
                      state: {
                        rowObject: {
                          Model: row.Model,
                          Make: row.Make,
                          Year: row.Year,
                          Color: row.Color,
                          Price: row.Price,
                          Mileage: row.Mileage,
                          Transmission: row.Transmission,
                          FuelType: row.FuelType,
                        },
                      },
                    })
                  }
                  data-testid={`view-button-${row._id}`}
                >
                  <IoEyeOutline color="green" className="hover:bg-green-300" />
                </button>
                <button
                  onClick={() => handleDelete(row._id)}
                  data-testid={`delete-button-${row._id}`}
                >
                  <FaTrash color="red" className="hover:bg-red-300" />
                </button>
                <button
                  onClick={() =>
                    navigate("/edit", {
                      state: { rowObject: row },
                    })
                  }
                  data-testid={`edit-button-${row._id}`}
                >
                  <FaEdit color="blue" className="hover:bg-blue-300" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomeTable;

HomeTable.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  setChange: PropTypes.func.isRequired,
};
