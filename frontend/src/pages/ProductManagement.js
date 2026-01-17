import React, { useState, useMemo } from 'react';
import { FaTrash, FaEdit, FaExclamationCircle } from 'react-icons/fa';
import { useInventory } from '../context/InventoryContext';
import Modal from '../components/Modal';

const ProductManagement = () => {
    const { products, addProduct, updateProduct, deleteProduct } = useInventory();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ name: '', category: '', price: '', quantity: '', minStock: 10 });

    // Filtering Logic
    const filteredProducts = useMemo(() => {
        return products.filter(p =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (filterCategory === '' || p.category.toLowerCase() === filterCategory.toLowerCase())
        );
    }, [products, searchTerm, filterCategory]);

    const categories = [...new Set(products.map(p => p.category))];

    const handleOpenModal = (product = null) => {
        if (product) {
            setEditingId(product._id);
            setFormData(product);
        } else {
            setEditingId(null);
            setFormData({ name: '', category: '', price: '', quantity: '', minStock: 10 });
        }
        setIsModalOpen(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (editingId) {
            await updateProduct(editingId, formData);
        } else {
            await addProduct(formData);
        }
        setIsModalOpen(false);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await deleteProduct(id);
        }
    };

    return (
        <div>
            <div className="flex-between mb-4">
                <h1>Product Management</h1>
                <button onClick={() => handleOpenModal()} className="btn btn-primary">
                    + Add New Product
                </button>
            </div>

            <div className="toolbar">
                <input
                    type="text"
                    placeholder="Search products..."
                    className="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    className="filter-select"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr key={product._id}>
                                <td>
                                    {product.name}
                                    {product.quantity <= (product.minStock || 0) && (
                                        <span className="stock-warning" style={{ fontSize: '0.8em', marginLeft: '0.5rem', color: 'var(--danger)' }}>
                                            <FaExclamationCircle /> Low
                                        </span>
                                    )}
                                </td>
                                <td>{product.category}</td>
                                <td>₹{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>
                                    <div className="flex" style={{ gap: '0.5rem' }}>
                                        <button className="btn btn-primary" style={{ padding: '0.5rem' }} onClick={() => handleOpenModal(product)}><FaEdit /></button>
                                        <button className="btn btn-danger" style={{ padding: '0.5rem' }} onClick={() => handleDelete(product._id)}><FaTrash /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredProducts.length === 0 && <tr><td colSpan="5" className="text-center">No products found.</td></tr>}
                    </tbody>
                </table>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingId ? "Edit Product" : "Add Product"}
            >
                <form onSubmit={handleSave}>
                    <div className="form-group">
                        <label className="form-label">Name</label>
                        <input required className="form-control" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Category</label>
                        <input required className="form-control" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} />
                    </div>
                    <div className="grid-3" style={{ gridTemplateColumns: '1fr 1fr' }}>
                        <div className="form-group">
                            <label className="form-label">Price</label>
                            <input type="number" required className="form-control" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Quantity</label>
                            <input type="number" required className="form-control" value={formData.quantity} onChange={e => setFormData({ ...formData, quantity: e.target.value })} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Minimum Stock Alert</label>
                        <input type="number" className="form-control" value={formData.minStock} onChange={e => setFormData({ ...formData, minStock: e.target.value })} />
                    </div>
                    <div className="modal-actions">
                        <button type="button" className="btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default ProductManagement;
