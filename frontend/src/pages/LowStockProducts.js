import React, { useMemo } from 'react';
import { useInventory } from '../context/InventoryContext';
import { FaExclamationTriangle, FaBox } from 'react-icons/fa';

const LowStockProducts = () => {
    const { products, loading } = useInventory();

    const lowStockItems = useMemo(() => {
        return products.filter(p => (p.quantity || 0) <= (p.minStock || 0));
    }, [products]);

    if (loading && products.length === 0) return <div className="p-4">Loading alerts...</div>;

    return (
        <div className="fade-in">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1>Low-Stock Alerts</h1>
                    <p className="text-muted">Products that require immediate restocking.</p>
                </div>
                <div className="card" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(239, 68, 68, 0.1)', borderColor: 'var(--danger)' }}>
                    <FaExclamationTriangle style={{ color: 'var(--danger)' }} />
                    <span style={{ fontWeight: 600, color: 'var(--danger)' }}>{lowStockItems.length} Items Low</span>
                </div>
            </div>

            <div className="card glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
                <table className="inventory-table">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Current Qty</th>
                            <th>Min. Stock</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lowStockItems.length === 0 ? (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>
                                    <FaBox style={{ fontSize: '2rem', color: 'var(--border-color)', marginBottom: '1rem' }} /><br />
                                    All products are well stocked!
                                </td>
                            </tr>
                        ) : (
                            lowStockItems.map((product) => {
                                const isCritical = product.quantity === 0;
                                return (
                                    <tr key={product._id} className={isCritical ? 'critical-stock-row' : 'low-stock-row'}>
                                        <td>
                                            <FaExclamationTriangle className="warning-icon" />
                                            {product.name}
                                        </td>
                                        <td>{product.category}</td>
                                        <td>{product.quantity}</td>
                                        <td>{product.minStock}</td>
                                        <td>
                                            <span className="stock-badge badge-low">
                                                {isCritical ? 'Out of Stock' : 'Low Stock'}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LowStockProducts;
