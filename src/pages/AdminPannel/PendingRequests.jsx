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
    <div className="min-h-screen flex flex-col lg:flex-row bg-black text-black">
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
         
        </nav>
      </aside>

      {/* Main Section */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-emerald-400">Pending Event Requests</h1>
        <p className="mt-1 text-gray-300">List of pending Event applications will appear below.</p>

        {/* Table */}
        <div className="bg-white shadow rounded-lg overflow-x-auto mt-6">
          <table className="min-w-full text-sm">
            <thead className="bg-black text-white">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3 text-left">User ID</th>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Description</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {pendingLoans.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-4 text-center text-gray-500 italic">
                    No pending Event requests found.
                  </td>
                </tr>
              ) : (
                pendingLoans.map((loan, i) => (
                  <tr
                    key={loan.id}
                    className="border-b last:border-none hover:bg-gray-50"
                  >
                    <td className="p-3">{i + 1}</td>
                    <td className="p-3">{loan.id}</td>
                    <td className="p-3">{loan.title}</td>
                    <td className="p-3">{loan.description}</td>
                    <td className="p-3">{new Date(loan.date).toLocaleDateString()}</td>
                    <td className="p-3">
                      <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
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
