import PropTypes from "prop-types";

const DropDown = ({ setSort, setChange }) => {
  return (
    <form className="w-fit mx-auto">
      <div className="mt-1 relative">
        <select
          id="type"
          name="type"
          className="block w-full py-2 pl-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          data-testid="dropdown-select"
          onChange={(e) => {
            setSort(e.target.value);
            setChange(true);
          }}
        >
          <option value="">Sort</option>
          <option value="Year">Year</option>
          <option value="Mileage">Mileage</option>
          <option value="Price">Price</option>
        </select>
      </div>
    </form>
  );
};

export default DropDown;

DropDown.propTypes = {
  setSort: PropTypes.func.isRequired,
  setChange: PropTypes.func.isRequired,
};
