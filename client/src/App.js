import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './store';
import { useSelector, useDispatch } from 'react-redux';
import { getProfile } from './store/slices/authSlice';

// Import pages (to be created)
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import VendorDashboard from './pages/VendorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

// Import components
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import LoadingSpinner from './components/UI/LoadingSpinner';
import ProtectedRoute from './components/Auth/ProtectedRoute';

// App content component (inside Redux provider)
function AppContent() {
  const dispatch = useDispatch();
  const { user, token, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    // If we have a token but no user data, fetch the profile
    if (token && !user) {
      dispatch(getProfile());
    }
  }, [token, user, dispatch]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route 
              path="/login" 
              element={user ? <Navigate to="/dashboard" /> : <Login />} 
            />
            <Route 
              path="/register" 
              element={user ? <Navigate to="/dashboard" /> : <Register />} 
            />

            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  {user?.role === 'user' && <Dashboard />}
                  {user?.role === 'vendor' && <VendorDashboard />}
                  {(user?.role === 'admin' || user?.role === 'super-admin') && <AdminDashboard />}
                </ProtectedRoute>
              } 
            />

            {/* User Routes */}
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute allowedRoles={['user']}>
                  <div>User Profile Page</div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/orders" 
              element={
                <ProtectedRoute allowedRoles={['user']}>
                  <div>User Orders Page</div>
                </ProtectedRoute>
              } 
            />

            {/* Vendor Routes */}
            <Route 
              path="/vendor/menu" 
              element={
                <ProtectedRoute allowedRoles={['vendor']}>
                  <div>Vendor Menu Management</div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/vendor/orders" 
              element={
                <ProtectedRoute allowedRoles={['vendor']}>
                  <div>Vendor Orders Page</div>
                </ProtectedRoute>
              } 
            />

            {/* Admin Routes */}
            <Route 
              path="/admin/users" 
              element={
                <ProtectedRoute allowedRoles={['admin', 'super-admin']}>
                  <div>Admin Users Management</div>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/vendors" 
              element={
                <ProtectedRoute allowedRoles={['admin', 'super-admin']}>
                  <div>Admin Vendors Management</div>
                </ProtectedRoute>
              } 
            />

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
        
        {/* Toast notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              theme: {
                primary: '#22c55e',
              },
            },
            error: {
              duration: 5000,
              theme: {
                primary: '#ef4444',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

// Main App component
function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;