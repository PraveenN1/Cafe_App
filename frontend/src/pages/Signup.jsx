import React, { useState } from "react"; // Import useState
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    // Input validation
    if (!username || !password || !confirmPwd) {
      setError("Please fill all the fields");
      return;
    }
    if (password !== confirmPwd) {
      setError("Passwords do not match. Please check your input.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("https://cafe-app-backend-nine.vercel.app/signup", { username, password });
      // const response = await axios.post("http://localhost:5000/signup", { username, password });
      setLoading(false);
      // Redirect to login or home page upon success
      navigate("/login");
    } catch (err) {
      setLoading(false);
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <form
      className="flex flex-col items-center justify-center min-h-screen p-6"
      onSubmit={handleSignup} // Attach the form handler
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border-2 border-black">
        <h2 className="text-2xl font-semibold text-center mb-4">Signup</h2>

        {/* Display error messages */}
        {error && <div className="text-red-500 text-sm mb-4 text-center">{error}</div>}

        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium mb-1">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Enter your username"
            autoComplete=""
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Set Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Enter your password"
            autoComplete=""
          />
        </div>
        <div className="mb-6">
          <label htmlFor="confirmPwd" className="block text-sm font-medium mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPwd"
            id="confirmPwd"
            value={confirmPwd}
            onChange={(e) => setConfirmPwd(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Confirm your password"
            autoComplete=""
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white py-2 rounded-md transition duration-200 ${
            loading
              ? "bg-amber-300 cursor-not-allowed"
              : "bg-amber-500 hover:bg-amber-600"
          }`}
        >
          {loading ? "Signing up..." : "Signup"}
        </button>
        <div className="mt-4 text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-amber-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default Signup;
