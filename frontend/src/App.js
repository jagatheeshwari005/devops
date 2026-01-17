import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import AuthSuccess from './pages/AuthSuccess';
import Dashboard from './pages/Dashboard';
import ProductManagement from './pages/ProductManagement';
import Purchase from './pages/Purchase';
import Sales from './pages/Sales';
import Inventory from './pages/Inventory';
import LowStockProducts from './pages/LowStockProducts';
import { InventoryProvider, useInventory } from './context/InventoryContext';

const Layout = ({ children }) => {
  const location = useLocation();
  const showSidebar = location.pathname !== '/';
  const { loading, notification } = useInventory(); // Access loading/toast state

  return (
    <div className="app-container">
      {/* Global Loading Spinner */}
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}

      {/* Global Toast Notification */}
      {notification && (
        <div className="toast-container">
          <div className={`toast ${notification.type}`}>
            {notification.message}
          </div>
        </div>
      )}

      {showSidebar && <Sidebar />}
      <div className="main-content" style={{ padding: showSidebar ? '2rem' : '0' }}>
        {children}
      </div>
    </div>
  );
};

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// Need a wrapper to use the hook inside Layout
const AppContent = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/auth/success" element={<AuthSuccess />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/products" element={<ProtectedRoute><ProductManagement /></ProtectedRoute>} />
          <Route path="/purchase" element={<ProtectedRoute><Purchase /></ProtectedRoute>} />
          <Route path="/sales" element={<ProtectedRoute><Sales /></ProtectedRoute>} />
          <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
          <Route path="/low-stock" element={<ProtectedRoute><LowStockProducts /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

function App() {
  return (
    <InventoryProvider>
      <AppContent />
    </InventoryProvider>
  );
}

export default App;
