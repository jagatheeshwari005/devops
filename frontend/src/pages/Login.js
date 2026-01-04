import React, { useState } from 'react';
// import { login } from '../services/api';

const Login = () => {
    const [error] = useState('');

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#e2e8f0' }}>
            <div className="card" style={{ width: '400px', padding: '2rem', textAlign: 'center' }}>
                <h2 className="text-center mb-4">Inventory Login</h2>
                {error && <div className="alert alert-error mb-4">{error}</div>}

                <p className="mb-4">Sign in to manage your inventory</p>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button
                        onClick={() => window.location.href = 'http://localhost:5000/api/auth/google'}
                        className="btn btn-primary"
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
