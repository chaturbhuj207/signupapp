import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [userdata, setUserdata] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setUserdata({ ...userdata, [e.target.name]: e.target.value })

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:1300/login", userdata);
            // let result = JSON.stringify(res.data);
            console.log("res is ", res.data.message)
            if (res.data.userlogin === true) {
                localStorage.setItem('usertoken', res.data.userExist.token)
                toast.success(res.data.message);
                navigate('/profile');
            }
            if (res.data.codeStutas === 1)
                toast.error(res.data.message)
        } catch (error) {
            toast.error("error in sending data", error)
        }
    };
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' id="email" value={userdata?.email} onChange={handleChange} required />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name='password' value={userdata?.password} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                    <p><Link to="/register">New user? Register here</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Login;
