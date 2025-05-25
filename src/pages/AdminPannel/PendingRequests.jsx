import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../../lib/Db';
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign
} from 'lucide-react';

const PendingRequests = () => {
  const [pendingLoans, setPendingLoans] = useState([]);

  useEffect(() => {
    const fetchPendingLoans = async () => {
      const { data, error } = await supabase
        .from('userEvents')
        .select('*')
        .eq('status', 'Pending');

      if (error) {
        console.error('Error fetching pending loans:', error);
        return;
      }

      setPendingLoans(data);
    };

    fetchPendingLoans();
  }, []);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-black text-white ">
      {/* Sidebar */}
        <aside className="w-full lg:w-64 bg-black text-white p-6">
            <h2 className="text-2xl font-bold mb-8 text-center">Admin Panel</h2>
            <nav className="space-y-4">
              <Link
                to="/admin-dashboard"
                className="flex items-center gap-3 hover:text-gray-300 transition"
              >
                <FileText size={20} /> Dashboard
              </Link>
              <Link
                to="/pending"
                className="flex items-center gap-3 hover:text-gray-300 transition"
              >
                <Clock size={20} /> Pending
              </Link>
              <Link
                to="/approved-loan"
                className="flex items-center gap-3 hover:text-gray-300 transition"
              >
                <CheckCircle size={20} /> Approved
              </Link>
              <Link
                to="/rejected-loan"
                className="flex items-center gap-3 hover:text-gray-300 transition"
              >
                <XCircle size={20} /> Rejected
              </Link>
              <Link
                to="/disbursed"
                className="flex items-center gap-3 hover:text-gray-300 transition"
              >
                <DollarSign size={20} /> Disbursed
              </Link>
            </nav>
          </aside>

      {/* Main Section */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-emerald-400">Pending Event Requests</h1>
        <p className="mt-1 text-gray-300">List of pending Event applications will appear below.</p>

        {/* Table */}
       <div className="mt-6 overflow-x-auto bg-gray-900 shadow-lg rounded-lg">
  <table className="min-w-full table-auto text-sm text-white">
    <thead className="bg-emerald-700">
      <tr>
        <th className="px-4 py-3 text-left">User ID</th>
        <th className="px-4 py-3 text-left">Title</th>
        <th className="px-4 py-3 text-left">Description</th>
        <th className="px-4 py-3 text-left">Date</th>
        <th className="px-4 py-3 text-left">Status</th>
      </tr>
    </thead>
    <tbody>
      {pendingLoans.length === 0 ? (
        <tr>
          <td colSpan="5" className="text-center py-6 text-gray-400 italic">
            No pending Event requests found.
          </td>
        </tr>
      ) : (
        pendingLoans.map((loan, i) => (
          <tr
            key={loan.id}
            className={`border-t border-emerald-800 ${
              i % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700'
            } hover:bg-emerald-900 transition-colors`}
          >
            <td className="px-4 py-3">{loan.id}</td>
            <td className="px-4 py-3">{loan.title}</td>
            <td className="px-4 py-3">{loan.description}</td>
            <td className="px-4 py-3">{new Date(loan.date).toLocaleDateString()}</td>
            <td>
              <span className="inline-block bg-yellow-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                {loan.status}
              </span>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>

      </main>
    </div>
  );
};

export default PendingRequests;
