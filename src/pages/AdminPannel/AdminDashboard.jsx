import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import supabase from '../../lib/Db';

const AdminDashboard = () => {
  const [loanData, setLoanData] = useState([]);

  useEffect(() => {
    fetchLoanData();
  }, []);

  const fetchLoanData = async () => {
    const { data, error } = await supabase.from('userEvents').select('*');
    if (error) return console.error('Fetch error:', error.message);
    setLoanData(data);
  };

  const handleStatusChange = async (id, newStatus) => {
    const { error } = await supabase
      .from('userEvents')
      .update({ status: newStatus })
      .eq('id', id);
    if (!error) fetchLoanData();
  };

  const total = loanData.length;
  const approved = loanData.filter(l => l.status === 'Approved').length;
  const pending = loanData.filter(l => l.status === 'Pending').length;
  const rejected = loanData.filter(l => l.status === 'Rejected').length;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row text-black">
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

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-4 lg:p-8 overflow-auto">
        <h1 className="text-3xl font-bold text-black mb-6 text-center lg:text-left">
          Dashboard Overview
        </h1>

        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white shadow rounded-lg p-5 text-center">
            <div className="text-xl font-medium text-gray-600">Total</div>
            <div className="text-3xl font-bold text-black">{total}</div>
          </div>
          <div className="bg-white shadow rounded-lg p-5 text-center">
            <div className="text-xl font-medium text-green-600">Approved</div>
            <div className="text-3xl font-bold text-green-700">{approved}</div>
          </div>
          <div className="bg-white shadow rounded-lg p-5 text-center">
            <div className="text-xl font-medium text-yellow-600">Pending</div>
            <div className="text-3xl font-bold text-yellow-700">{pending}</div>
          </div>
          <div className="bg-white shadow rounded-lg p-5 text-center">
            <div className="text-xl font-medium text-red-600">Rejected</div>
            <div className="text-3xl font-bold text-red-700">{rejected}</div>
          </div>
        </div>

        {/* Loan Table */}
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="min-w-[600px] w-full text-sm">
            <thead className="bg-black text-white">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Reason</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loanData.map((loan, i) => (
                <tr
                  key={loan.id}
                  className="border-b last:border-none hover:bg-gray-50"
                >
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3">{loan.title}</td>
                  <td className="p-3">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                        loan.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : loan.status === 'Approved'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {loan.status}
                    </span>
                  </td>
                  <td className="p-3">{loan.description || '—'}</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => handleStatusChange(loan.id, 'Approved')}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition text-xs"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(loan.id, 'Rejected')}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition text-xs"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
              {loanData.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="p-4 text-center text-gray-500 italic"
                  >
                    No loan applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
