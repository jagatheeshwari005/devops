import React, { useMemo } from 'react';
import { FaBox, FaShoppingCart, FaChartLine, FaExclamationTriangle } from 'react-icons/fa';
import { useInventory } from '../context/InventoryContext';

const Dashboard = () => {
    const { products, sales } = useInventory();

    const stats = useMemo(() => {
        const totalProducts = products.length;
        const totalStock = products.reduce((sum, p) => sum + parseInt(p.quantity), 0);
        const stockValue = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);

        // Low Stock Items (Threshold: 10 or minStock if set)
        const lowStockCount = products.filter(p => p.quantity <= (p.minStock || 10)).length;

        // Today's Sales
        const today = new Date().toISOString().split('T')[0];
        const todaySales = sales.filter(s => s.date.split('T')[0] === today);
        const todayRevenue = todaySales.reduce((sum, s) => sum + s.total, 0);

        return { totalProducts, totalStock, stockValue, lowStockCount, todayRevenue };
    }, [products, sales]);

    return (
        <div>
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

                <div className="card summary-card">
                    <div className="icon-container" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
                        <FaExclamationTriangle />
                    </div>
                    <div className="summary-info">
                        <h3>Low Stock Alerts</h3>
                        <p>{stats.lowStockCount}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
