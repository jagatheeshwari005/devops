import React, { createContext, useContext, useState } from 'react';

const InventoryContext = createContext();

export const useInventory = () => useContext(InventoryContext);

export const InventoryProvider = ({ children }) => {
    // Mock Initial Data
    const [products, setProducts] = useState([
        { id: '1', name: 'LED Bulb 9W', category: 'Lighting', price: 100, quantity: 45, minStock: 10 },
        { id: '2', name: 'Fan Regulator', category: 'Accessories', price: 250, quantity: 5, minStock: 15 },
        { id: '3', name: 'Copper Wire 1m', category: 'Wiring', price: 40, quantity: 120, minStock: 50 },
        { id: '4', name: 'Switch 6A', category: 'Switches', price: 35, quantity: 0, minStock: 20 },
    ]);

    const [sales, setSales] = useState([
        { id: '101', productId: '1', productName: 'LED Bulb 9W', quantity: 2, date: new Date().toISOString(), total: 200 },
    ]);

    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState(null); // { type: 'success'|'error', message: '' }

    // Simulate API delay
    const simulateDelay = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        setLoading(false);
    };

    const showNotification = (type, message) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 3000);
    };

    const addProduct = async (product) => {
        await simulateDelay();
        const newProduct = { ...product, id: Date.now().toString() };
        setProducts([...products, newProduct]);
        showNotification('success', 'Product added successfully');
    };

    const updateProduct = async (id, updatedData) => {
        await simulateDelay();
        setProducts(products.map(p => p.id === id ? { ...p, ...updatedData } : p));
        showNotification('success', 'Product updated successfully');
    };

    const deleteProduct = async (id) => {
        await simulateDelay();
        setProducts(products.filter(p => p.id !== id));
        showNotification('success', 'Product deleted successfully');
    };

    const addSale = async (saleData) => {
        await simulateDelay();
        const product = products.find(p => p.id === saleData.productId);
        if (!product) {
            showNotification('error', 'Product not found');
            return;
        }
        if (product.quantity < saleData.quantity) {
            showNotification('error', 'Insufficient stock');
            return;
        }

        // Update stock
        const updatedProduct = { ...product, quantity: product.quantity - parseInt(saleData.quantity) };
        setProducts(products.map(p => p.id === saleData.productId ? updatedProduct : p));

        // Record sale
        const newSale = {
            id: Date.now().toString(),
            ...saleData,
            productName: product.name,
            date: new Date().toISOString(),
            total: product.price * saleData.quantity
        };
        setSales([...sales, newSale]);
        showNotification('success', 'Sale recorded successfully');
    };

    const deleteSale = async (id) => {
        await simulateDelay();
        // Return stock? For simplicity, let's say yes but usually complex business logic.
        const sale = sales.find(s => s.id === id);
        if (sale) {
            const product = products.find(p => p.id === sale.productId);
            if (product) {
                const updatedProduct = { ...product, quantity: product.quantity + parseInt(sale.quantity) };
                setProducts(products.map(p => p.id === sale.productId ? updatedProduct : p));
            }
        }
        setSales(sales.filter(s => s.id !== id));
        showNotification('success', 'Sale deleted and stock reverted');
    };

    const addPurchase = async (purchaseData) => {
        await simulateDelay();
        const product = products.find(p => p.id === purchaseData.productId);
        if (!product) {
            showNotification('error', 'Product not found');
            return;
        }

        // Update stock
        const updatedProduct = { ...product, quantity: product.quantity + parseInt(purchaseData.quantity) };
        setProducts(products.map(p => p.id === purchaseData.productId ? updatedProduct : p));

        // Record purchase
        const newPurchase = {
            id: Date.now().toString(),
            ...purchaseData,
            productName: product.name,
            date: new Date().toISOString()
        };
        setPurchases([...purchases, newPurchase]);
        showNotification('success', 'Purchase recorded successfully');
    };

    return (
        <InventoryContext.Provider value={{
            products, sales, purchases, loading, notification,
            addProduct, updateProduct, deleteProduct,
            addSale, deleteSale, addPurchase
        }}>
            {children}
        </InventoryContext.Provider>
    );
};
