import React, { useMemo, useState, useEffect } from 'react';
import { FaBox, FaShoppingCart, FaChartLine, FaExclamationTriangle, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useInventory } from '../context/InventoryContext';

const Dashboard = () => {
    const { products, sales } = useInventory();
    const navigate = useNavigate();
    const [showBanner, setShowBanner] = useState(false);

    const stats = useMemo(() => {
        const totalProducts = products.length;
        const totalStock = products.reduce((sum, p) => sum + parseInt(p.quantity || 0), 0);
        const stockValue = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);

        // Low Stock Items (using product-specific minStock)
        const lowStockCount = products.filter(p => (p.quantity || 0) <= (p.minStock || 0)).length;

        // Today's Sales
        const today = new Date().toISOString().split('T')[0];
        const todaySales = sales.filter(s => s.date.split('T')[0] === today);
        const todayRevenue = todaySales.reduce((sum, s) => sum + s.total, 0);

        return { totalProducts, totalStock, stockValue, lowStockCount, todayRevenue };
    }, [products, sales]);

    // Show banner whenever lowStockCount changes and is greater than 0
    useEffect(() => {
        if (stats.lowStockCount > 0) {
            setShowBanner(true);
        } else {
            setShowBanner(false);
        }
    }, [stats.lowStockCount]);

    return (
        <div className="fade-in">
            {showBanner && (
                <div className="banner-alert">
                    <div className="banner-content">
                        <FaExclamationTriangle size={20} />
                        <div>
                            Warning: <span>{stats.lowStockCount}</span> product{stats.lowStockCount > 1 ? 's are' : ' is'} running low on stock!
                            <button
                                onClick={() => navigate('/low-stock')}
                                style={{
                                    background: 'none',
                                    color: '#b45309',
                                    textDecoration: 'underline',
                                    marginLeft: '10px',
                                    fontWeight: '600'
                                }}
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                    <button className="close-btn" onClick={() => setShowBanner(false)}>
                        <FaTimes />
                    </button>
                </div>
            )}

            <h1>Dashboard Analytics</h1>
            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>Real-time overview of your business.</p>

            <div className="grid-3">
                <div className="card summary-card">
                    <div className="icon-container">
                        <FaBox />
                    </div>
                    <div className="summary-info">
                        <h3>Total Products</h3>
                        <p>{stats.totalProducts}</p>
                    </div>
                </div>

                <div className="card summary-card">
                    <div className="icon-container" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                        <FaShoppingCart />
                    </div>
                    <div className="summary-info">
                        <h3>Stock Value</h3>
                        <p>₹{stats.stockValue.toLocaleString()}</p>
                    </div>
                </div>

                <div className="card summary-card">
                    <div className="icon-container" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                        <FaChartLine />
                    </div>
                    <div className="summary-info">
                        <h3>Today's Revenue</h3>
                        <p>₹{stats.todayRevenue.toLocaleString()}</p>
                    </div>
                </div>

                <div
                    className="card summary-card"
                    onClick={() => navigate('/low-stock')}
                    style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <div className="icon-container" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
                        <FaExclamationTriangle />
                    </div>
                    <div className="summary-info">
                        <h3>Low Stock Alerts</h3>
                        <p className={stats.lowStockCount > 0 ? 'text-danger' : ''}>{stats.lowStockCount}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
