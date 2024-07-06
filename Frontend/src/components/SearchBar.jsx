import PropTypes from "prop-types";
const SearchBar = ({ setSearch, setChange }) => {
  return (
    <div className="max-w-xs mx-auto">
      <input
        type="text"
        placeholder="Search..."
        className="w-full border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none"
        onChange={(e) => {
          setSearch(e.target.value);
          setChange(true);
        }}
      />
    </div>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  setSearch: PropTypes.func.isRequired,
  setChange: PropTypes.func.isRequired,
};
