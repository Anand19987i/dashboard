import React, { useState } from 'react';
import Layout from '../components/Layout';
import { users } from '../Samples/users';
import { useDarkMode } from '../context/DarkModeContext';

/**
 * UsersList Component
 * 
 * This component renders a paginated and sortable table of user data.
 * It supports dark mode, column sorting, and responsive pagination.
 */
const UsersList = () => {
  // ------------------------ State Management ------------------------

  const [currentPage, setCurrentPage] = useState(1); // Tracks the current pagination page
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' }); // Sorting configuration

  // Access dark mode state from context
  const { darkMode } = useDarkMode();

  // ------------------------ Sorting Logic ------------------------

  const sortedUsers = [...users].sort((a, b) => {
    if (!sortConfig.key) return 0; // No sorting if no key is selected

    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];

    // Numeric comparison
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
    }

    // String comparison (case-insensitive)
    const aValue = (aVal ?? '').toString().toLowerCase();
    const bValue = (bVal ?? '').toString().toLowerCase();

    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  // ------------------------ Pagination Logic ------------------------

  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  // ------------------------ Render ------------------------

  return (
    <div>
      <Layout>
        <div className={`p-6 shadow-sm ${darkMode ? 'bg-slate-900' : 'bg-white border border-gray-100 rounded-xl'}`}>
          <div className="overflow-x-auto">
            {/* ------------------------ User Table ------------------------ */}
            <table className="w-full">
              <thead className={darkMode ? 'bg-slate-800 text-gray-200' : 'bg-gray-50'}>
                <tr>
                  {/* Table Headers with Sortable Columns */}
                  {[
                    { label: 'ID', key: 'id' },
                    { label: 'Name', key: 'name' },
                    { label: 'Email', key: 'email' },
                    { label: 'Role', key: 'role' },
                    { label: 'Status', key: 'status' }
                  ].map(({ label, key }) => (
                    <th
                      key={key}
                      onClick={() =>
                        setSortConfig((prev) =>
                          prev.key === key
                            ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
                            : { key, direction: 'asc' }
                        )
                      }
                      className={`px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                    >
                      <div className="flex items-center gap-1">
                        {label}
                        {sortConfig.key === key && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className={darkMode ? 'divide-y divide-slate-800' : 'divide-y divide-gray-200'}>
                {currentItems.map((user) => (
                  <tr key={user.id} className={`transition-colors ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-50'}`}>
                    <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{user.id}</td>
                    <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{user.name}</td>
                    <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{user.email}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 inline-flex text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${
                        user.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ------------------------ Pagination Controls ------------------------ */}
          <div className="mt-6 flex justify-between items-center">
            {/* Previous Page Button */}
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 text-sm font-medium border rounded-md disabled:opacity-50 disabled:cursor-not-allowed
                ${darkMode
                  ? 'text-gray-200 bg-slate-800 border-slate-700 hover:bg-slate-700'
                  : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'}`}
            >
              Previous
            </button>

            {/* Page Number Buttons with Ellipses */}
            <div className="text-sm flex gap-1 items-center">
              {totalPages <= 5 ? (
                [...Array(totalPages).keys()].map((page) => (
                  <span
                    key={page}
                    onClick={() => setCurrentPage(page + 1)}
                    className={`px-3 py-2 rounded border cursor-pointer 
                      ${darkMode
                        ? `${currentPage === page + 1 ? 'bg-slate-700 text-white' : 'border-slate-700 text-gray-300'}`
                        : `${currentPage === page + 1 ? 'bg-gray-200' : 'border-gray-100'}`}`}
                  >
                    {page + 1}
                  </span>
                ))
              ) : (
                <>
                  <span
                    onClick={() => setCurrentPage(1)}
                    className={`px-3 py-2 rounded border cursor-pointer 
                      ${darkMode
                        ? `${currentPage === 1 ? 'bg-slate-700 text-white' : 'border-slate-700 text-gray-300'}`
                        : `${currentPage === 1 ? 'bg-gray-200' : 'border-gray-100'}`}`}
                  >
                    1
                  </span>

                  {currentPage > 3 && <span className="px-2 text-gray-500">...</span>}

                  {Array.from({ length: 3 }, (_, i) => {
                    const page = currentPage === totalPages ? totalPages - 2 + i : currentPage - 1 + i;
                    if (page > 1 && page < totalPages) {
                      return (
                        <span
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-2 rounded border cursor-pointer 
                            ${darkMode
                              ? `${currentPage === page ? 'bg-slate-700 text-white' : 'border-slate-700 text-gray-300'}`
                              : `${currentPage === page ? 'bg-gray-200' : 'border-gray-100'}`}`}
                        >
                          {page}
                        </span>
                      );
                    }
                  })}

                  {currentPage < totalPages - 2 && <span className="px-2 text-gray-500">...</span>}

                  <span
                    onClick={() => setCurrentPage(totalPages)}
                    className={`px-3 py-2 rounded border cursor-pointer 
                      ${darkMode
                        ? `${currentPage === totalPages ? 'bg-slate-700 text-white' : 'border-slate-700 text-gray-300'}`
                        : `${currentPage === totalPages ? 'bg-gray-200' : 'border-gray-100'}`}`}
                  >
                    {totalPages}
                  </span>
                </>
              )}
            </div>

            {/* Next Page Button */}
            <button
              onClick={() => setCurrentPage(p => p + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 text-sm font-medium border rounded-md disabled:opacity-50 disabled:cursor-not-allowed
                ${darkMode
                  ? 'text-gray-200 bg-slate-800 border-slate-700 hover:bg-slate-700'
                  : 'text-gray-700 bg-white border-gray-300 hover:bg-gray-50'}`}
            >
              Next
            </button>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default UsersList;
