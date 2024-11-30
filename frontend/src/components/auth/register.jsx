import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createAccount } from '../../api/auth.js';

function RegisterComponent() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const user = await createAccount(data);
      if (user) {
        navigate("/user/login");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 border border-gray-200">
        <h2 className="text-center text-3xl font-semibold text-gray-800">Create an Account</h2>
        <p className="mt-2 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/user/login" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        <form onSubmit={handleSubmit(create)} className="mt-6 space-y-6">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Username:</label>
            <input
              placeholder="Enter your username"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              {...register("username", { required: "Username is required" })}
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              {...register("email", { required: "Email is required" })}
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              {...register("password", { required: "Password is required" })}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterComponent;
