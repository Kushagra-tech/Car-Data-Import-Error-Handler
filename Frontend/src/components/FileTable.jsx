import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
const FileTable = ({ tableData }) => {
  const navigate = useNavigate();

  const tableStyle = "w-full rounded-xl overflow-hidden";
  const rowStyle = "bg-gray-400/0 px-4 py-2";
  const rowStyle2 = "bg-gray-400/20 px-4 py-2";
  const cellHeaderStyle =
    "border-2 border-white bg-blue-500 text-white px-4 py-2";
  const cellStyle =
    "px-4 py-2 border-2 border-white text-black/50 hover:text-gray-900";
  return (
    <div
      className="mx-auto h-[85vh] w-[90%] overflow-y-scroll"
      data-testid="file-table"
    >
      <h1 className="text-2xl font-bold mb-4">Bulk Upload Details</h1>
      <table className={tableStyle}>
        <thead>
          <tr className={`${rowStyle}`}>
            <th className={cellHeaderStyle}>FileName</th>
            <th className={cellHeaderStyle}>Correct Rows</th>
            <th className={cellHeaderStyle}>InCorrect Rows</th>
            <th className={cellHeaderStyle}>Total Rows</th>
            <th className={cellHeaderStyle}>Start Time</th>
            <th className={cellHeaderStyle}>End Time</th>
            <th className={cellHeaderStyle}>Show Errors</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr
              className={index % 2 === 0 ? rowStyle : rowStyle2}
              key={row._id}
            >
              <td className={cellStyle}>{row.fileName}</td>
              <td className={cellStyle}>{row.successfulInserted}</td>
              <td className={cellStyle}>{row.failedDuringInsert}</td>
              <td className={cellStyle}>{row.noOfItems}</td>
              <td className={cellStyle}>{row.startTime}</td>
              <td className={cellStyle}>{row.endTime}</td>
              <td
                className={`${cellStyle} flex gap-8 cursor-pointer items-center justify-center border-none`}
              >
                <button
                  className="bg-none border-none text-blue-600 underline cursor-pointer hover:text-red-700"
                  onClick={() =>
                    navigate("/errors", {
                      state: { fileName: row.fileName },
                    })
                  }
                >
                  Show Errors *
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileTable;

FileTable.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
};
