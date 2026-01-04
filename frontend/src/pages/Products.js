import React, { useState, useEffect } from 'react';
import { API } from '../services/api';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        quantity: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await API.get('/products');
            setProducts(res.data);
        } catch (err) {
            console.error("Failed to fetch products", err);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await API.post('/products/add', formData);
            setShowForm(false);
            setFormData({ name: '', category: '', price: '', quantity: '' });
            fetchProducts(); // Refresh list
        } catch (err) {
            alert("Failed to add product");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem' }}>Product Management</h2>
                <button
                    className="btn-primary"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? 'Cancel' : '+ Add New Product'}
                </button>
            </div>

            {showForm && (
                <div className="card mb-4" style={{ marginBottom: '2rem' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Add New Product</h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                        <input
                            name="name"
                            placeholder="Product Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            name="category"
                            placeholder="Category (e.g. Wiring, Lighting)"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        />
                        <input
                            name="price"
                            type="number"
                            placeholder="Price (₹)"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                        <input
                            name="quantity"
                            type="number"
                            placeholder="Initial Quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                        />
                        <div style={{ gridColumn: '1 / -1' }}>
                            <button type="submit" className="btn-primary" disabled={loading}>
                                {loading ? 'Saving...' : 'Save Product'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                                        No products found. Add one to get started.
                                    </td>
                                </tr>
                            ) : (
                                products.map((p) => (
                                    <tr key={p._id}>
                                        <td style={{ fontWeight: 500 }}>{p.name}</td>
                                        <td>
                                            <span style={{
                                                background: 'rgba(255,255,255,0.1)',
                                                padding: '0.2rem 0.6rem',
                                                borderRadius: '1rem',
                                                fontSize: '0.75rem'
                                            }}>
                                                {p.category}
                                            </span>
                                        </td>
                                        <td>₹{p.price}</td>
                                        <td>{p.quantity}</td>
                                        <td>
                                            {p.quantity < 5 ? (
                                                <span className="text-danger flex items-center gap-1">⚠️ Low Stock</span>
                                            ) : (
                                                <span className="text-success">In Stock</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Products;
