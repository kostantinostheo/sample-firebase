import './index.css';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // React Router for navigation
import { FIREBASE_AUTH } from '../../config/firebase';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const auth = FIREBASE_AUTH;

    const navigate = useNavigate();

    // Handles the login functionality of the user
    async function handleLogin(e) {
        e.preventDefault(); // Prevent default form submission
        setLoading(true); // Indicate login is in progress
        setError(''); // Clear previous error

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in:", userCredential.user);
            navigate('/courses'); // Navigate to the courses page after successful login
        } catch (error) {
            setError(error.message); // Display the error message
        } finally {
            setLoading(false); // Reset the loading state
        }
    }
  
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                navigate('/courses'); // Navigate to /courses if already logged in
            }
        });

        return () => unsubscribe(); // Cleanup subscription
    }, [navigate, auth]);


    return (
        <div className="login">
            <form onSubmit={handleLogin} className="login-container">
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>} {/* Display error message */}
                <div className="login-row">
                    <label>Email:</label>
                    &nbsp;&nbsp;&nbsp;
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="login-row">
                    <label>Password:</label>
                    &nbsp;&nbsp;&nbsp;
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                <a href="/register">Create new user</a>
            </form>
        </div>
    );
}
