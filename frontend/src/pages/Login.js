import React, { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);

    const handleGoogleLogin = () => {
        // Redirect to backend Google Auth
        window.location.href = 'http://localhost:5000/api/auth/google';
    };

    return (
        <div className="login-page">
            <div className="glass-card" style={{ padding: '2rem', maxWidth: '360px' }}>
                <div className="login-header" style={{ marginBottom: '1.25rem' }}>
                    <h1 style={{ fontSize: '1.8rem', marginBottom: '0.2rem' }}>ElectroMate</h1>
                    <p style={{ fontSize: '0.85rem' }}>{isLogin ? 'Sign in to your account' : 'Create your free account'}</p>
                </div>

                <div className="auth-form" style={{ gap: '0.75rem' }}>
                    <button
                        onClick={handleGoogleLogin}
                        className="btn btn-google"
                        style={{ height: '45px', fontSize: '0.9rem' }}
                    >
                        <FaGoogle style={{ marginRight: '0.75rem' }} />
                        Continue with Google
                    </button>

                    <div className="divider" style={{ margin: '0.75rem 0', fontSize: '0.8rem' }}>or</div>

                    <input
                        type="email"
                        className="form-control input-glass"
                        placeholder="Email address"
                        style={{ height: '42px', fontSize: '0.9rem' }}
                    />

                    <input
                        type="password"
                        className="form-control input-glass"
                        placeholder="Password"
                        style={{ height: '42px', fontSize: '0.9rem' }}
                    />

                    <button className="btn btn-primary" style={{ width: '100%', height: '45px', marginTop: '0.5rem' }}>
                        {isLogin ? 'Sign In' : 'Sign Up'}
                    </button>

                    <p style={{ textAlign: 'center', marginTop: '1rem', color: '#94a3b8', fontSize: '0.8rem' }}>
                        {isLogin ? "Need an account?" : "Already a member?"}
                        <span
                            onClick={() => setIsLogin(!isLogin)}
                            style={{ color: 'var(--secondary-color)', cursor: 'pointer', marginLeft: '0.4rem', fontWeight: '600' }}
                        >
                            {isLogin ? 'Sign Up' : 'Login'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
