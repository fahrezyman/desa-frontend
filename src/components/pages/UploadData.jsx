import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const UploadData = ({ onSuccess }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    const user_id = localStorage.getItem("user_id"); // Dapatkan user_id dari localStorage
    if (!user_id) {
      alert("User ID not found. Please login again.");
      return;
    }
    formData.append("user_id", user_id); // Tambahkan user_id ke formData

    console.log(
      "Uploading file to http://localhost:3000/api/alternatives/upload"
    );

    try {
      const response = await axios.post(
        "http://localhost:3000/api/alternatives/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("File uploaded successfully", response.data);
      alert("File uploaded successfully");
      onSuccess(); // Callback to parent component to proceed to next step
    } catch (error) {
      console.error("There was an error uploading the file:", error);
      alert("Failed to upload file");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
      <form onSubmit={handleUpload}>
        <div className="mb-4">
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full px-4 py-2 mt-2 border rounded-md"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

UploadData.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default UploadData;
