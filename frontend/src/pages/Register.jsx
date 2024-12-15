import React, { useState  } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send the registration data to the backend API
            const response = await axios.post('http://localhost:8000/api/auth/register', {
                username: name,
                email,
                password
            });
            // Handle success response
            setMessage('Registration successful! You can now login.');
            navigate("/login")
            console.log(response.data);
        } catch (error) {
            // Handle error response
            setMessage('Registration failed. Please try again.');
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
                                    <h4 className="title  mt-4">Register Here !</h4>
                                    {/* <p>We’d love have you join our 100% remote network of creatord &amp; freelance.</p> */}
                                </div>
                                {message && <p className="text-center">{message}</p>}
                                <form onSubmit={handleSubmit}>
                                <div className="form-group m-b15">
                                    <label className="form-label">Name*</label>
                                    <div className="input-group">
                                        <input name="name" required type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" placeholder="Enter Your Email" />
                                    </div>
                                </div>
                                <div className="form-group m-b15">
                                    <label className="form-label">Email*</label>
                                    <div className="input-group">
                                        <input name="email" required type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Enter Your Email" />
                                    </div>
                                </div>
                                <div className="form-group m-b30 mb-4">
                                    <label className="form-label">Password*</label>
                                    <div className="input-group search-input">
                                        <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control dz-password" placeholder="Enter a Password" />
                                    </div>
                                </div>
                                <button name="submit" value="submit" type="submit" className="btn btn-primary w-100 d-block btn-hover-2"><span>Sign Up</span></button>
                                </form>
                                 <p className="text-center m-t30">Already have an account ?
                                                                    <Link className="register text-primary font-weight-500 ms-2" to={"/login"} >SigIn</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register