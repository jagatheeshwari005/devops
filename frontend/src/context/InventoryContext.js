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
        try {
            // In a real app, we'd call await api.addSale(saleData);
            // For this implementation, we update the local state to trigger the low-stock alert
            const updatedProducts = products.map(p => {
                if (p.id === saleData.productId || p._id === saleData.productId) {
                    return { ...p, quantity: parseInt(p.quantity) - parseInt(saleData.quantity) };
                }
                return p;
            });
            setProducts(updatedProducts);

            const newSale = {
                ...saleData,
                id: Date.now().toString(),
                date: new Date().toISOString(),
                total: (products.find(p => p.id === saleData.productId || p._id === saleData.productId)?.price || 0) * saleData.quantity,
                productName: products.find(p => p.id === saleData.productId || p._id === saleData.productId)?.name || 'Unknown Product'
            };
            setSales([...sales, newSale]);
            showNotification('success', 'Sale recorded and stock updated');
        } catch (error) {
            showNotification('error', 'Failed to record sale');
        }
    };

    const deleteSale = async (id) => {
        const saleToDelete = sales.find(s => s.id === id);
        if (saleToDelete) {
            const updatedProducts = products.map(p => {
                if (p.id === saleToDelete.productId || p._id === saleToDelete.productId) {
                    return { ...p, quantity: parseInt(p.quantity) + parseInt(saleToDelete.quantity) };
                }
                return p;
            });
            setProducts(updatedProducts);
            setSales(sales.filter(s => s.id !== id));
            showNotification('success', 'Sale deleted and stock restored');
        }
    };

    const addPurchase = async (purchaseData) => {
        try {
            // Similar logic for purchases
            const updatedProducts = products.map(p => {
                if (p.id === purchaseData.productId || p._id === purchaseData.productId) {
                    return { ...p, quantity: parseInt(p.quantity) + parseInt(purchaseData.quantity) };
                }
                return p;
            });
            setProducts(updatedProducts);

            const newPurchase = {
                ...purchaseData,
                id: Date.now().toString(),
                date: new Date().toISOString(),
                total: purchaseData.costPrice * purchaseData.quantity,
                productName: products.find(p => p.id === purchaseData.productId || p._id === purchaseData.productId)?.name || 'Unknown Product'
            };
            setPurchases([...purchases, newPurchase]);
            showNotification('success', 'Purchase recorded and stock updated');
        } catch (error) {
            showNotification('error', 'Failed to record purchase');
        }
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
