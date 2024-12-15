import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); 

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/auth/login', {
                email,
                password
            });
            const { user } = response.data;
            localStorage.setItem('authToken', response.data.token);
            setMessage('Login successful! Redirecting...');
            navigate("/"); 
        } catch (error) {
            setMessage('Login failed. Please check your credentials.');
            console.error(error.response ? error.response.data : error.message);
        }
    };
    
    return (
        <section className='bg-white vh-100'>
            <div className='container-fluid'>
                <div className="container vh-100">
                    <div className="d-flex justify-content-center align-items-center vh-100">
                        <div className="col-4">
                            <div className="login-form">
                                <div className="login-head text-center">
                                <a href="/" className="anim-logo text-center mb-5"><img src="assets/images/library-logo.png" width="50%" alt="/" /></a>
                                <h4 className="title  mt-4">Login Here !</h4>
                                </div>

                                {message && <p className="text-center">{message}</p>}

                                <form onSubmit={handleLogin}>
                                    <div className="form-group m-b15">
                                        <label className="form-label">Email*</label>
                                        <div className="input-group">
                                            <input
                                                name="email"
                                                required
                                                type="email"
                                                className="form-control"
                                                placeholder="Enter Your Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group mb-5   ">
                                        <label className="form-label">Password*</label>
                                        <div className="input-group search-input">
                                            <input
                                                name="password"
                                                required
                                                type="password"
                                                className="form-control dz-password"
                                                placeholder="Enter a Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <button name="submit" value="submit" type="submit" className="btn btn-primary w-100 d-block btn-hover-2">
                                        <span>Sign In</span>
                                    </button>
                                </form>

                                <p className="text-center m-t30">Not registered?
                                    <Link className="register text-primary font-weight-500 ms-2" to={"/register"} >Register here</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default Login;
