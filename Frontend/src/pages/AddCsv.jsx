import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadCsv = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const handleSubmit = async () => {
    console.log("hgh");
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    try {
      setMessage("Loading");
      const response = await axios.post(
        "http://localhost:5001/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("aya ", response.data.message);
      if (response.statusText === "OK") {
        // setMessage("File uploaded successfully");
        navigate("/");
      } else {
        const tokenExpired = response.data?.token;
        if (tokenExpired) {
          console.log("Token expired");
          navigate("/login");
        } else {
          console.log("nothing");
          throw new Error("Network response was not ok");
        }
      }
    } catch (error) {
      if (error.response?.data?.token) {
        console.log("Token expired");
        navigate("/login");
      }
      setMessage(error?.message);
    }
  };
  return (
    <main className="py-4 px-10 text-xl font-semibold font-mono flex flex-col gap-4 text-gray-500 items-center">
      <h1>Upload CSV File</h1>
      <input
        type="file"
        name="file"
        data-testid="uploadButton"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br />
      <button
        onClick={handleSubmit}
        data-testid="upload"
        className="p-4 bg-blue-500 text-white rounded-xl cursor-pointer hover:bg-blue-700 duration-200 ease-in-out transition-colors"
      >
        Upload
      </button>
      {message === "Loading" ? <Spinner /> : message}
    </main>
  );
};

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
    </div>
  );
};

export default UploadCsv;
