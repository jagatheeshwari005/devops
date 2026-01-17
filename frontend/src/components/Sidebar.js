import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaBox, FaShoppingCart, FaClipboardList, FaChartLine, FaSignOutAlt, FaExclamationTriangle } from 'react-icons/fa';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-title">
                <FaChartLine />
                <span>ElectroInv</span>
            </div>
            <nav>
                <NavLink to="/dashboard" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                    <FaHome /> Dashboard
                </NavLink>
                <NavLink to="/products" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                    <FaBox /> Products
                </NavLink>
                <NavLink to="/purchase" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                    <FaShoppingCart /> Purchase
                </NavLink>
                <NavLink to="/sales" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                    <FaChartLine /> Sales
                </NavLink>
                <NavLink to="/inventory" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                    <FaClipboardList /> Inventory
                </NavLink>
                <NavLink to="/low-stock" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                    <FaExclamationTriangle /> Low Stock
                </NavLink>
                <button className="nav-link" onClick={() => { localStorage.removeItem('token'); window.location.href = '/'; }} style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'left' }}>
                    <FaSignOutAlt /> Logout
                </button>
            </nav>
        </div>
    );
};

export default Sidebar;
