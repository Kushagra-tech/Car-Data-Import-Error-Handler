import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const initialFormData = {
    Make: "",
    Model: "",
    Year: 0,
    Color: "",
    Price: 0,
    Mileage: 0,
    Transmission: "",
    FuelType: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5001/api/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.statusText === "Created") {
        navigate("/");
      }
    } catch (error) {
      if (error.response?.data?.token) {
        console.log("Token expired");
        navigate("/login");
      } else {
        console.log("Network Error");
      }
    }
  };

  const css =
    "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500";

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Car Details</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(initialFormData).map((key) => (
          <div className="mb-4" key={key}>
            <label className="block text-gray-700">
              {key.charAt(0).toUpperCase() + key.slice(1)}:
              <input
                type={
                  key === "Year" || key === "Price" || key === "Mileage"
                    ? "number"
                    : "text"
                }
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className={css}
              />
            </label>
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Create;
