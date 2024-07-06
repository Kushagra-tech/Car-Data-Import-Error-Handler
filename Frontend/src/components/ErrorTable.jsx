import PropTypes from "prop-types";
import React from "react";

const ErrorTable = ({ tableData }) => {
  const tableStyle = "w-full rounded-xl overflow-hidden";
  const rowStyle = "bg-gray-400/0 px-4 py-2";
  const rowStyle2 = "bg-gray-400/20 px-4 py-2";
  const cellHeaderStyle =
    "border-2 border-white bg-blue-500 text-white px-4 py-2";
  const cellStyle =
    "px-4 py-2 border-2 border-white text-black/50 hover:text-gray-900";

  return (
    <div className="mx-auto h-[85vh] w-[90%] overflow-y-scroll">
      <h1 className="text-2xl font-bold mb-4">Bulk Upload Details</h1>
      <table className={tableStyle}>
        <thead>
          <tr className={rowStyle}>
            <th
              className={cellHeaderStyle}
              data-testid="table-cell-header-filename"
            >
              FileName
            </th>
            <th className={cellHeaderStyle} data-testid="table-cell">
              Row
            </th>
            <th className={cellHeaderStyle} data-testid="table-cell">
              Key
            </th>
            <th
              className={cellHeaderStyle}
              data-testid="table-cell-header-error"
            >
              Error
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <React.Fragment key={row._id}>
              <tr className={index % 2 === 0 ? rowStyle : rowStyle2}>
                <td
                  className={cellStyle}
                  data-testid={`table-cell`}
                  rowSpan={row.errorsLog.length + 1}
                >
                  {row.fileName}
                </td>
              </tr>
              {row.errorsLog.map((error) => (
                <tr
                  key={error._id}
                  className={index % 2 === 0 ? rowStyle : rowStyle2}
                >
                  <td className={cellStyle} data-testid={`table-cell`}>
                    {error.row}
                  </td>
                  <td className={cellStyle} data-testid={`table-cell`}>
                    {error.key}
                  </td>
                  <td className={cellStyle} data-testid={`table-cell`}>
                    {error.error}
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ErrorTable.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ErrorTable;
