import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import supabase from '../lib/Db.js';

const Signup = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false); // State to handle form submission state

  // Yup validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string()
      .matches(/^03\d{2}[-\s]?\d{7}$/, 'Must be a valid Pakistani phone number with or without hyphen or spaces')
      .required('Phone number is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true); // Disable the button on first click

      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      if (error) {
        toast.error('Signup failed: ' + error.message);
        setIsSubmitting(false); // Re-enable button in case of error
      } else {
        toast.success('Signup successful! Check your email.');
        const uid = data.user.id;

        const { error: insertError } = await supabase.from('usersData').insert({
          name: values.name,
          email: values.email,
          phone: values.phone,
          UID: uid,
        });

        if (insertError) {
          toast.error('Error saving user data');
        } else {
          setTimeout(() => navigate('/login'), 1000);
        }

        setIsSubmitting(false); // Re-enable the button after successful data submission
      }
    },
  });

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-gradient-to-r from-emerald-400 to-green-500 pt-12">
      <div className="hidden md:block relative">
        <img
          src="https://img.freepik.com/free-vector/security-system-background_23-2147626787.jpg"
          alt="Sign Up Visual"
          className="w-full h-full object-cover rounded-l-lg shadow-2xl"
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center text-white font-extrabold text-3xl md:text-5xl z-10 px-4 text-center">
          💼 Welcome to <br /> Loan Management System
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-12 bg-white bg-opacity-80 backdrop-blur-md rounded-r-lg shadow-xl">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold mb-4 text-gray-800 text-center">Create Account 🚀</h2>
          <p className="text-center text-gray-600 mb-8">Join us to manage your loans efficiently 💳</p>

          <form onSubmit={formik.handleSubmit} className="space-y-6 text-neutral-950">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">👤 Full Name</label>
              <input
                type="text"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-xl"
                placeholder="Your Full Name"
              />
              {formik.touched.name && formik.errors.name && <p className="text-red-600 text-sm">{formik.errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">📧 Email Address</label>
              <input
                type="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-xl"
                placeholder="you@example.com"
              />
              {formik.touched.email && formik.errors.email && <p className="text-red-600 text-sm">{formik.errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">📱 Phone Number</label>
              <input
                type="text"
                name="phone"
                onChange={formik.handleChange}
                value={formik.values.phone}
                className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-xl"
                placeholder="03XXXXXXXXX"
              />
              {formik.touched.phone && formik.errors.phone && <p className="text-red-600 text-sm">{formik.errors.phone}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">🔒 Password</label>
              <input
                type="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-xl"
                placeholder="••••••••"
              />
              {formik.touched.password && formik.errors.password && <p className="text-red-600 text-sm">{formik.errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700">🔒 Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-xl"
                placeholder="••••••••"
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <p className="text-red-600 text-sm">{formik.errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting} // Disable the button during submission
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold text-lg"
            >
              {isSubmitting ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>

          <p className="text-sm text-center mt-6 text-gray-700">
            Already have an account?{' '}
            <Link to="/signin" className="text-emerald-600 font-semibold hover:underline">Sign In 👈</Link>
          </p>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Signup;
