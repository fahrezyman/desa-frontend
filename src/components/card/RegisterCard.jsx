import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const RegisterCard = ({ onToggle }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username === "" || email === "" || password === "") {
      alert("Please fill in all fields");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/register",
        {
          username,
          email,
          password,
        }
      );
      console.log("Registration successful:", response.data);
      onToggle();
      alert("Registration successful. You can now log in.");
    } catch (error) {
      console.error("There was an error registering:", error);
      alert("Registration failed. Please check your details and try again.");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
      <h3 className="text-2xl font-bold text-center mb-4">Create an account</h3>
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
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            className="w-full px-6 py-2 mt-4 text-white bg-green-600 rounded-lg hover:bg-green-900"
          >
            Create an account
          </button>
        </div>
        <div className="mt-4 text-center">
          <button
            type="button"
            className="text-blue-600 hover:underline"
            onClick={onToggle}
          >
            Already have an account? Login
          </button>
        </div>
      </form>
    </div>
  );
};

RegisterCard.propTypes = {
  onToggle: PropTypes.func.isRequired,
};

export default RegisterCard;
