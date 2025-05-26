import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { User, Mail, Phone, Lock } from 'lucide-react';
import supabase from '../lib/Db';

const Signup = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string()
      .matches(/^03\d{2}[-\s]?\d{7}$/, 'Invalid Pakistani phone')
      .required('Phone number is required'),
    password: Yup.string().min(6, 'At least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
  });

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
      setIsSubmitting(true);

      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      if (error) {
        toast.error('Signup failed: ' + error.message);
        setIsSubmitting(false);
        return;
      }

      if (!data?.user) {
        toast.error('Signup failed: No user returned');
        setIsSubmitting(false);
        return;
      }

      // Save additional user info
      const { error: insertError } = await supabase.from('usersData').insert({
        name: values.name,
        email: values.email,
        phone: values.phone,
        UID: data.user.id,
      });

      if (insertError) {
        toast.error('Error saving user data: ' + insertError.message);
        setIsSubmitting(false);
        return;
      }

      toast.success('Signup successful! Check your email.');
      setTimeout(() => navigate('/signin'), 1500);
      setIsSubmitting(false);
    },
  });

  return (
    <div className="min-h-[100vh] flex justify-center items-center pt-10 px-4 pb-10">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-lg shadow-lg overflow-hidden">
        
        {/* Left Image */}
        <div className="hidden md:block relative">
          <img
            src="https://img.freepik.com/free-vector/security-system-background_23-2147626787.jpg"
            alt="Sign Up Visual"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-40" />
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl md:text-4xl z-10 px-4 text-center">
            Welcome to<br />Event Management System
          </div>
        </div>

        {/* Form */}
        <div className="flex items-center justify-center px-6 py-10 bg-white">
          <div className="w-full max-w-sm">
            <h2 className="text-3xl font-bold mb-3 text-gray-800 text-center">Create Account</h2>
            <p className="text-center text-gray-600 mb-6 text-sm">Join us to manage your loans</p>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <User size={16} /> Full Name
                </label>
                <input
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  className="w-full text-black bg-white px-3 py-2 mt-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500"
                  placeholder="Your Full Name"
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Mail size={16} /> Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className="w-full text-black px-3 py-2 mt-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500"
                  placeholder="you@example.com"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Phone size={16} /> Phone Number
                </label>
                <input
                  name="phone"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  className="w-full text-black px-3 py-2 mt-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500"
                  placeholder="03XXXXXXXXX"
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.phone}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Lock size={16} /> Password
                </label>
                <input
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  className="w-full text-black px-3 py-2 mt-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500"
                  placeholder="••••••••"
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Lock size={16} /> Confirm Password
                </label>
                <input
                  name="confirmPassword"
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                  className="w-full text-black px-3 py-2 mt-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500"
                  placeholder="••••••••"
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.confirmPassword}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg text-sm font-medium shadow-md transition"
              >
                {isSubmitting ? 'Signing Up...' : 'Sign Up'}
              </button>
            </form>

            <p className="text-xs text-center mt-5 text-gray-700">
              Already have an account?{' '}
              <Link to="/signin" className="text-emerald-600 font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
  );
};

export default Signup;
