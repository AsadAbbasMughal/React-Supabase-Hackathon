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

const RejectedLoan = () => {
  const [rejectedLoans, setRejectedLoans] = useState([]);

  useEffect(() => {
    const fetchRejectedLoans = async () => {
      const { data, error } = await supabase
        .from('userEvents')
        .select('*')
        .eq('status', 'Rejected'); 

      if (error) {
        console.error('Error fetching rejected loans:', error);
        return;
      }

      setRejectedLoans(data); 
    };

    fetchRejectedLoans();
  }, []);

  return (
    <div className="min-h-screen flex  text-black">
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
        <h1 className="text-2xl font-bold text-emerald-700">Rejected Event Requests</h1>
        <p className="mt-2 text-gray-600">List of rejected Event applications will appear here.</p>

        {/* Table for Rejected Loans */}
       <div className="mt-6 overflow-x-auto bg-white shadow-md rounded-lg">
  <table className="min-w-full text-left table-auto text-sm">
    <thead className="bg-emerald-700 text-white">
      <tr>
        <th className="px-4 py-2">Loan ID</th>
        <th className="px-4 py-2">Title</th>
        <th className="px-4 py-2">Description</th>
        <th className="px-4 py-2">Application Date</th>
        <th className="px-4 py-2">Status</th>
      </tr>
    </thead>
    <tbody>
      {rejectedLoans.length === 0 ? (
        <tr>
          <td colSpan="5" className="px-4 py-6 text-center text-gray-500 italic">
            No rejected loan requests found.
          </td>
        </tr>
      ) : (
        rejectedLoans.map((loan, i) => (
          <tr
            key={loan.id}
            className={`border-b last:border-none hover:bg-gray-50 ${
              i % 2 === 0 ? "bg-white" : "bg-gray-50"
            }`}
          >
            <td className="px-4 py-3">{loan.id}</td>
            <td className="px-4 py-3">{loan.title}</td>
            <td className="px-4 py-3">{loan.description}</td>
            <td className="px-4 py-3">{new Date(loan.date).toLocaleDateString()}</td>
            <td className="px-4 py-3">
              <span className="inline-block px-2 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full">
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

export default RejectedLoan;