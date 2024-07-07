import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const LoginCard = ({ onToggle }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username === "" || password === "") {
      alert("Please fill in all fields");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        {
          username,
          password,
        }
      );
      console.log("Login successful:", response.data);
      alert("Login successful. You can now access the dashboard.");
    } catch (error) {
      console.error("There was an error logging in:", error);
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
          >
            Login
          </button>
        </div>
        <div className="mt-4 text-center">
          <button
            type="button"
            className="text-blue-600 hover:underline"
            onClick={onToggle}
          >
            Don`t have an account? Register
          </button>
        </div>
      </form>
    </div>
  );
};

LoginCard.propTypes = {
  onToggle: PropTypes.func.isRequired,
};

export default LoginCard;
