import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === "" || password === "") {
      alert("Please fill in all fields");
      return;
    }
    console.log(`Username: ${username}, Password: ${password}`);
  };

  const handleRegister = () => {
    console.log("Register");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <div>
              <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-baseline justify-between">
              <div className="flex items-center justify-center w-full">
                <button
                  type="submit"
                  className="px-6 py-2 mt-4 block text-white bg-blue-600 rounded-lg hover:bg-blue-900 w-full"
                  onClick={handleSubmit}
                >
                  Login
                </button>
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <div className="flex items-center justify-center w-full">
                <button
                  type="submit"
                  className="px-6 py-2 mt-4 text-white bg-green-600 rounded-lg hover:bg-green-900 w-full"
                  onClick={handleRegister}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
