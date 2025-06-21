import React from 'react';

const SkeletonRow = () => (
  <tr className="bg-white border-b">
    {/* Full Name */}
    <td className="px-6 py-4">
      <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
    </td>
    {/* Username */}
    <td className="px-6 py-4">
      <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
    </td>
    {/* Email */}
    <td className="px-6 py-4">
      <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
    </td>
    {/* Role */}
    <td className="px-6 py-4">
      <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
    </td>
    {/* Actions */}
    <td className="px-6 py-4 flex justify-center space-x-3">
      <div className="h-5 w-5 bg-gray-200 rounded-md animate-pulse"></div>
      <div className="h-5 w-5 bg-gray-200 rounded-md animate-pulse"></div>
    </td>
  </tr>
);

const UserTableSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center">
        <div>
          <div className="h-8 bg-gray-300 rounded w-64 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-80 animate-pulse"></div>
        </div>
        <div className="h-10 bg-gray-300 rounded-md w-36 animate-pulse"></div>
      </div>

      {/* Table Skeleton */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Họ và tên</th>
                <th scope="col" className="px-6 py-3">Tên đăng nhập</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Vai trò</th>
                <th scope="col" className="px-6 py-3 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {/* Render several skeleton rows */}
              {[...Array(5)].map((_, i) => (
                <SkeletonRow key={i} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserTableSkeleton; 