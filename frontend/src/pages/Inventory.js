import React, { useMemo } from 'react';
import { useInventory } from '../context/InventoryContext';

const Inventory = () => {
    const { products } = useInventory();

    const inventoryStatus = useMemo(() => {
        return products.map(p => {
            let status = 'In Stock';
            if (p.quantity === 0) status = 'Out of Stock';
            else if (p.quantity <= (p.minStock || 10)) status = 'Low Stock';
            return { ...p, status };
        });
    }, [products]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'In Stock': return '#10b981';
            case 'Low Stock': return '#f59e0b';
            case 'Out of Stock': return '#ef4444';
            default: return '#64748b';
        }
    };

    return (
        <div>
            <h1>Inventory Status</h1>
            <p className="mb-4" style={{ color: 'var(--text-secondary)' }}>Current stock levels and status alerts.</p>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Current Stock</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventoryStatus.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.category}</td>
                                <td>{item.quantity}</td>
                                <td>
                                    <span style={{
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '999px',
                                        fontSize: '0.875rem',
                                        fontWeight: 500,
                                        backgroundColor: `${getStatusColor(item.status)}20`,
                                        color: getStatusColor(item.status)
                                    }}>
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Inventory;
