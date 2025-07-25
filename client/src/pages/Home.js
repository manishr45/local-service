import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-primary-600">Tiffin Management</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect with home chefs and enjoy delicious, homemade meals delivered to your doorstep. 
            A comprehensive platform for tiffin ordering and management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary text-lg px-8 py-3">
              Order Now
            </button>
            <button className="btn-outline text-lg px-8 py-3">
              Become a Vendor
            </button>
          </div>
        </div>
        
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="card text-center">
            <div className="card-body">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🍱</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fresh & Homemade</h3>
              <p className="text-gray-600">
                Enjoy authentic homemade meals prepared by local home chefs with love and care.
              </p>
            </div>
          </div>
          
          <div className="card text-center">
            <div className="card-body">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Get your meals delivered hot and fresh to your doorstep with our reliable delivery network.
              </p>
            </div>
          </div>
          
          <div className="card text-center">
            <div className="card-body">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Ordering</h3>
              <p className="text-gray-600">
                Simple and intuitive platform to browse menus, place orders, and track deliveries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;