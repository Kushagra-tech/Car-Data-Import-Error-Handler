import { useLocation } from "react-router-dom";

const View = () => {
  const location = useLocation();
  const carObject = location.state.rowObject;

  return (
    <div className="container mx-auto w-2/3 p-4">
      <div className="bg-white shadow-md rounded-lg p-10">
        <h1 className="text-4xl font-semibold mb-6">Car Details</h1>
        <div className="flex flex-wrap">
          {Object.keys(carObject).map((key) => (
            <div
              key={key}
              className="flex justify-between items-center px-4 py-6 w-full border-t"
            >
              <span className="text-gray-700 font-semibold capitalize text-xl">
                {key}:
              </span>
              <span className="text-gray-900 text-lg">{carObject[key]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default View;
