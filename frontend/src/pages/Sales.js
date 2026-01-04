import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';

const Sales = () => {
    const { products, addSale, sales, deleteSale } = useInventory();
    const [saleData, setSaleData] = useState({ productId: '', quantity: '', customerName: '' });

    const selectedProduct = products.find(p => p.id === saleData.productId);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addSale(saleData);
        setSaleData({ productId: '', quantity: '', customerName: '' });
    };

    return (
        <div className="grid-3" style={{ gridTemplateColumns: 'minmax(300px, 1fr) 2fr', alignItems: 'start' }}>

            {/* Form Section */}
            <div>
                <h1>New Sale</h1>
                <p className="mb-4 text-secondary">Record a transaction</p>
                <div className="card">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Select Product</label>
                            <select
                                className="form-control"
                                value={saleData.productId}
                                onChange={e => setSaleData({ ...saleData, productId: e.target.value })}
                                required
                            >
                                <option value="">-- Choose Product --</option>
                                {products.map(p => (
                                    <option key={p.id} value={p.id} disabled={p.quantity === 0}>
                                        {p.name} (Stock: {p.quantity}) - ₹{p.price}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {selectedProduct && (
                            <div className="mb-4 p-2 bg-slate-50 rounded border">
                                <p><strong>Price:</strong> ₹{selectedProduct.price}</p>
                                <p><strong>Available:</strong> {selectedProduct.quantity}</p>
                            </div>
                        )}

                        <div className="form-group">
                            <label className="form-label">Quantity</label>
                            <input
                                type="number"
                                className="form-control"
                                min="1"
                                max={selectedProduct ? selectedProduct.quantity : 100}
                                value={saleData.quantity}
                                onChange={e => setSaleData({ ...saleData, quantity: e.target.value })}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Customer Name</label>
                            <input
                                className="form-control"
                                value={saleData.customerName}
                                onChange={e => setSaleData({ ...saleData, customerName: e.target.value })}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={!saleData.productId}>
                            Complete Sale
                        </button>
                    </form>
                </div>
            </div>

            {/* History Section */}
            <div>
                <h2 className="mb-4">Recent Sales</h2>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Product</th>
                                <th>Qty</th>
                                <th>Total</th>
                                <th>Customer</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sales.slice().reverse().map(sale => (
                                <tr key={sale.id}>
                                    <td>{new Date(sale.date).toLocaleDateString()}</td>
                                    <td>{sale.productName}</td>
                                    <td>{sale.quantity}</td>
                                    <td>₹{sale.total}</td>
                                    <td>{sale.customerName || '-'}</td>
                                    <td>
                                        <button className="btn btn-danger" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }} onClick={() => deleteSale(sale.id)}>Undo</button>
                                    </td>
                                </tr>
                            ))}
                            {sales.length === 0 && <tr><td colSpan="6" className="text-center">No sales recorded yet.</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Sales;
