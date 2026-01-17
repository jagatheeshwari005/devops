import React, { createContext, useContext, useState, useEffect } from 'react';
import * as api from '../services/api';

const InventoryContext = createContext();

export const useInventory = () => useContext(InventoryContext);

export const InventoryProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [sales, setSales] = useState([]);
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        setLoading(true);
        try {
            const prodRes = await api.getProducts();
            setProducts(prodRes.data);
            // sales and purchases can also be fetched here if endpoints exist
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const showNotification = (type, message) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 3000);
    };

    const addProduct = async (productData) => {
        setLoading(true);
        try {
            const res = await api.addProduct(productData);
            setProducts([...products, res.data]);
            showNotification('success', 'Product added successfully');
        } catch (error) {
            showNotification('error', 'Failed to add product');
        } finally {
            setLoading(false);
        }
    };

    const updateProduct = async (id, updatedData) => {
        setLoading(true);
        try {
            const res = await api.updateProduct(id, updatedData);
            setProducts(products.map(p => p._id === id ? res.data : p));
            showNotification('success', 'Product updated successfully');
        } catch (error) {
            showNotification('error', 'Failed to update product');
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id) => {
        setLoading(true);
        try {
            await api.deleteProduct(id);
            setProducts(products.filter(p => p._id !== id));
            showNotification('success', 'Product deleted successfully');
        } catch (error) {
            showNotification('error', 'Failed to delete product');
        } finally {
            setLoading(false);
        }
    };

    const addSale = async (saleData) => {
        // Implementation for sales...
        showNotification('success', 'Sale recorded (Local state)');
    };

    const deleteSale = async (id) => {
        // Implementation for delete sale...
        showNotification('success', 'Sale deleted');
    };

    const addPurchase = async (purchaseData) => {
        // Implementation for purchase...
        showNotification('success', 'Purchase recorded');
    };

    return (
        <InventoryContext.Provider value={{
            products, sales, purchases, loading, notification,
            addProduct, updateProduct, deleteProduct,
            addSale, deleteSale, addPurchase, fetchInitialData
        }}>
            {children}
        </InventoryContext.Provider>
    );
};
