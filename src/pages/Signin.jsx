import React, { useState } from 'react';  // <-- import useState
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import supabase from '../lib/Db';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email address').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Signin = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);  // <-- State to track button disable

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const adminEmail = "admin@gmail.com";
  const adminPassword = "adminadmin";

  const onSubmit = async (data) => {
    if (isSubmitting) return;  // Prevent double submission if somehow clicked again

    setIsSubmitting(true);    // Disable button

    const { email, password } = data;

    if (email === adminEmail && password === adminPassword) {
      toast.success("Admin Login Successful");
      setTimeout(() => {
        setIsSubmitting(false);
        navigate('/admin-dashboard');
      }, 1000);
      return;
    }

    const { data: userData, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast.error("Signin Error: " + error.message);
      setIsSubmitting(false);  // Enable button on error
      return;
    }

    if (userData) {
      toast.success("Signin successful");
    }

    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/user-dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-[100vh] flex justify-center items-center pt-10 pb-6 text-neutral-950 px-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left side image */}
        <div className="hidden md:block relative">
          <img
            src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg"
            alt="Login Visual"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl md:text-4xl z-10 px-4 text-center">
            Welcome Back <br /> Event Management System
          </div>
        </div>

        {/* Right side form */}
        <div className="flex items-center justify-center px-6 py-10 bg-white bg-opacity-90 backdrop-blur-md">
          <div className="w-full max-w-sm">
            <h2 className="text-3xl font-bold mb-3 text-gray-800 text-center">Login</h2>
            <p className="text-center text-gray-600 mb-6 text-sm">Access your dashboard</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FaEnvelope /> Email Address
                </label>
                <input
                  type="email"
                  {...register('email')}
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <FaLock /> Password
                </label>
                <input
                  type="password"
                  {...register('password')}
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                  placeholder="••••••••"
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}  // <-- disable button when submitting
                className={`w-full py-2.5 rounded-lg font-medium text-sm shadow-md transition duration-300 ${
                  isSubmitting 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-emerald-600 hover:bg-emerald-700 text-white"
                }`}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="text-xs text-center mt-5 text-gray-700">
              Don’t have an account?{' '}
              <Link to="/signup" className="text-emerald-600 font-semibold hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        </div>

        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
  );
};

export default Signin;
