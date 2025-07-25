import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card">
            <div className="card-body">
              <h3 className="text-xl font-semibold mb-2">Users</h3>
              <p className="text-gray-600">Manage user accounts</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h3 className="text-xl font-semibold mb-2">Vendors</h3>
              <p className="text-gray-600">Approve and manage vendors</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h3 className="text-xl font-semibold mb-2">Orders</h3>
              <p className="text-gray-600">Monitor all orders</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h3 className="text-xl font-semibold mb-2">Analytics</h3>
              <p className="text-gray-600">Platform performance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;