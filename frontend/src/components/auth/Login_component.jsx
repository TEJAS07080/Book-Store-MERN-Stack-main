import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { login as backEndLogin } from '../../api/auth';

function LoginComponent() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { handleSubmit, register } = useForm();

  const login = async (data) => {
    try {
      const { userData, error } = await backEndLogin(data);
      if (userData) {
        localStorage.setItem("userData", JSON.stringify(userData));
        navigate('/');
      } else {
        setError(error.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 border border-gray-200">
        <h2 className="text-center text-3xl font-semibold text-gray-800">Sign In</h2>
        <p className="mt-2 text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/user/register" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-6 space-y-6">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Enter a valid email address",
                },
              })}
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              {...register("password", {
                required: "Password is required",
              })}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginComponent;
