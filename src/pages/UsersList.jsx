import React, { useState } from 'react';
import Layout from '../components/Layout';
import { users } from '../Samples/users';

/**
 * UsersList Component
 *
 * Displays a sortable and paginated table of users.
 * Features:
 * - Column sorting (by ID, name, email, role, and status)
 * - Pagination with ellipses for better UX
 */

const UsersList = () => {
  // ---------- State Management ----------
  const [currentPage, setCurrentPage] = useState(1); // Tracks current page for pagination
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' }); // Sorting state

  // ---------- Sorting Logic ----------
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

  // ---------- Pagination Logic ----------
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  // ---------- UI Render ----------
  return (
    <div>
      <Layout>
        <div className='p-6 bg-white rounded-xl shadow-sm border border-gray-100'>
          <div className='overflow-x-auto'>
            {/* ---------- User Table ---------- */}
            <table className='w-full'>
              <thead className='bg-gray-50'>
                <tr>
                  {/* Table Headers with Sort Handlers */}
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
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                    >
                      <div className="flex items-center gap-1">
                        {label}
                        {/* Show sort icon if current sort key */}
                        {sortConfig.key === key && (sortConfig.direction === 'asc' ? '▲' : '▼')}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* ---------- Table Body ---------- */}
              <tbody className='divide-y divide-gray-200'>
                {currentItems.map((user) => (
                  <tr key={user.id} className='hover:bg-gray-50 transition-colors'>
                    <td className='px-6 py-4 text-sm text-gray-900'>{user.id}</td>
                    <td className='px-6 py-4 text-sm text-gray-900'>{user.name}</td>
                    <td className='px-6 py-4 text-sm text-gray-600'>{user.email}</td>
                    <td className='px-6 py-4'>
                      <span className='px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800'>
                        {user.role}
                      </span>
                    </td>
                    <td className='px-6 py-4'>
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
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

          {/* ---------- Pagination Controls ---------- */}
          <div className="mt-6 flex justify-between items-center">

            {/* Previous Button */}
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {/* Page Numbers */}
            <div className="text-sm text-gray-700 flex gap-1 items-center">
              {totalPages <= 5 ? (
                // Show all pages if total is 5 or fewer
                [...Array(totalPages).keys()].map((page) => (
                  <span
                    key={page}
                    className={`px-3 py-2 border border-gray-100 cursor-pointer ${currentPage === page + 1 ? 'bg-gray-200' : ''}`}
                    onClick={() => setCurrentPage(page + 1)}
                  >
                    {page + 1}
                  </span>
                ))
              ) : (
                // Ellipsis-based pagination for >5 pages
                <>
                  {/* First Page */}
                  <span
                    className={`px-3 py-2 border border-gray-100 cursor-pointer ${currentPage === 1 ? 'bg-gray-200' : ''}`}
                    onClick={() => setCurrentPage(1)}
                  >
                    1
                  </span>

                  {/* Left Ellipsis */}
                  {currentPage > 3 && <span className="px-2">...</span>}

                  {/* Dynamic middle pages */}
                  {Array.from({ length: 3 }, (_, i) => {
                    const page = currentPage === totalPages ? totalPages - 2 + i : currentPage - 1 + i;
                    if (page > 1 && page < totalPages) {
                      return (
                        <span
                          key={page}
                          className={`px-3 py-2 border border-gray-100 cursor-pointer ${currentPage === page ? 'bg-gray-200' : ''}`}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </span>
                      );
                    }
                  })}

                  {/* Right Ellipsis */}
                  {currentPage < totalPages - 2 && <span className="px-2">...</span>}

                  {/* Last Page */}
                  <span
                    className={`px-3 py-2 border border-gray-100 cursor-pointer ${currentPage === totalPages ? 'bg-gray-200' : ''}`}
                    onClick={() => setCurrentPage(totalPages)}
                  >
                    {totalPages}
                  </span>
                </>
              )}
            </div>

            {/* Next Button */}
            <button
              onClick={() => setCurrentPage(p => p + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
