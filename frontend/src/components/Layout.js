import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/products', label: 'Products', icon: '⚡' },
    { path: '/inventory', label: 'Inventory', icon: '📦' },
    { path: '/purchase', label: 'Purchase', icon: '📥' },
    { path: '/sales', label: 'Sales', icon: '💰' },
  ];

  const handleLogout = () => {
    // Clear auth token logic here
    navigate('/');
  };

  // Don't show layout on Login page
  if (location.pathname === '/') return <>{children}</>;

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{ 
        width: '260px', 
        backgroundColor: 'var(--bg-card)', 
        borderRight: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        height: '100%',
        zIndex: 10
      }}>
        <div style={{ padding: '2rem', borderBottom: '1px solid var(--border-color)' }}>
          <h2 style={{ color: 'var(--accent-color)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            ⚡ ElectroMate
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '0.5rem' }}>Inventory Management</p>
        </div>

        <nav style={{ flex: 1, padding: '1.5rem 1rem' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1rem', 
                    padding: '0.875rem 1rem', 
                    borderRadius: '0.5rem',
                    backgroundColor: location.pathname === item.path ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
                    color: location.pathname === item.path ? 'var(--accent-color)' : 'var(--text-muted)',
                    fontWeight: location.pathname === item.path ? '600' : '400',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div style={{ padding: '1rem', borderTop: '1px solid var(--border-color)' }}>
          <button 
            onClick={handleLogout}
            style={{ 
              width: '100%', 
              background: 'transparent', 
              border: '1px solid var(--border-color)', 
              color: 'var(--text-muted)',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
            onMouseOver={(e) => {
              e.target.style.borderColor = 'var(--danger)';
              e.target.style.color = 'var(--danger)';
            }}
            onMouseOut={(e) => {
              e.target.style.borderColor = 'var(--border-color)';
              e.target.style.color = 'var(--text-muted)';
            }}
          >
            ❌ Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ 
        flex: 1, 
        marginLeft: '260px', 
        padding: '2rem',
        maxWidth: '1600px',
        width: '100%'
      }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.875rem' }}>
            {menuItems.find(i => i.path === location.pathname)?.label || 'Overview'}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: 'var(--text-muted)' }}>Hello, Owner</span>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              EO
            </div>
          </div>
        </header>

        <div className="fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
