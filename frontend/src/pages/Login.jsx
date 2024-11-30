import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CoffeeContext } from "../components/ApifetchExample";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {isLogin,setIsLogin}=useContext(CoffeeContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    if (!username || !password) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("https://cafe-app-backend-nine.vercel.app/login", { username, password });
      // const response = await axios.post("http://localhost:5000/login", { username, password });
      setLoading(false);
      localStorage.setItem("token", response.data.token);
      setIsLogin(!isLogin);
      navigate("/"); // Redirect on success
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Something went wrong. Try again.");
    }
  };

  return (
    <form
      className="flex flex-col items-center justify-center min-h-screen p-6"
      onSubmit={handleLogin}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border-2 border-black">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

        {error && (
          <div className="text-red-500 text-sm mb-4 text-center">
            {error}
          </div>
        )}

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
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-amber-500 text-white py-2 rounded-md ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-amber-600"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <div className="mt-4 text-center">
          <p className="text-sm">
            New User?{" "}
            <Link to="/signup" className="text-amber-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      <div className="mt-4">
        <Link to="/admin-login" className="text-sm text-amber-500 hover:underline">
          Login as Admin
        </Link>
      </div>
    </form>
  );
};

export default Login;
