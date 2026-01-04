import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';

const Purchase = () => {
    const { products, updateProduct } = useInventory();
    const [purchaseData, setPurchaseData] = useState({ productId: '', quantity: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const product = products.find(p => p.id === purchaseData.productId);
        if (product) {
            const newQuantity = parseInt(product.quantity) + parseInt(purchaseData.quantity);
            await updateProduct(product.id, { ...product, quantity: newQuantity });
            setPurchaseData({ productId: '', quantity: '' });
            alert('Stock added successfully!');
        }
    };

    return (
        <div>
            <h1>Purchase / Restock</h1>
            <p className="mb-4 text-secondary">Add stock to inventory</p>
            <div className="card" style={{ maxWidth: '600px' }}>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Select Product</label>
                        <select
                            className="form-control"
                            value={purchaseData.productId}
                            onChange={e => setPurchaseData({ ...purchaseData, productId: e.target.value })}
                            required
                        >
                            <option value="">-- Choose Product --</option>
                            {products.map(p => (
                                <option key={p.id} value={p.id}>
                                    {p.name} (Current Stock: {p.quantity})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Quantity to Add</label>
                        <input
                            type="number"
                            className="form-control"
                            min="1"
                            value={purchaseData.quantity}
                            onChange={e => setPurchaseData({ ...purchaseData, quantity: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Add Stock</button>
                </form>
            </div>
        </div>
    );
};

export default Purchase;
