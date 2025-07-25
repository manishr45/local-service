import React from 'react';

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <div className="text-center">
          <p className="text-gray-600">Register as:</p>
          <div className="mt-4 space-x-4">
            <button className="btn-primary">Customer</button>
            <button className="btn-outline">Vendor</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;