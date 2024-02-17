import { useState } from "react";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8000/login`, {
                email,
                password
            });
            localStorage.setItem('auth', JSON.stringify(response.data));
            window.location.href = '/';
        } catch (error) {
            setError("Invalid email or password. Please try again.");
        }
    }

    return (<>
        <Navbar />
        <div className="container">
            <h1 className="mb-4 mt-4">Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                        id="email"
                        placeholder="Enter your email..."
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                        id="password"
                        placeholder="Enter your password..."
                        required
                    />
                </div>
                <NavLink to='/signup'>Create an account?</NavLink><br /><br />
                {error && <div className="alert alert-danger mb-3">{error}</div>}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    </>
    );
}

export default Login;
