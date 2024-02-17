import { useState } from "react";
import axios from 'axios';
import Navbar from "./Navbar";
import { NavLink } from "react-router-dom";

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
             await axios.post(`http://localhost:8000/signup`, {
                username,
                email,
                password
            });
            window.location.href='/login';
            // console.log(response);
        } catch (error) {
            setError("An error occurred. Please try again.");
            console.log(error);
        }
    }

    return (
        <>
        <Navbar showSearchBar={false}/>
        <div className="container">
            <h1 className="mt-4">Register your information</h1>
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
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="form-control"
                        id="username"
                        placeholder="Enter your username..."
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
                <NavLink to='/login'>Already have an account?</NavLink><br/><br/>
                {error && <div className="alert alert-danger mb-3">{error}</div>}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    </>
    );
}

export default Signup;
