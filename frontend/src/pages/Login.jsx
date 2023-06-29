import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const customstyle = {
        paddingLeft: '2.5rem',
        paddingRight: '2.5rem',
    };
    const currentyear = new Date().getFullYear();

    const [input, setinput] = useState({
        email: '',
        password: '',
        role: '',
    });

    let name, value;
    const handleSelectChange = (e) => {
        name = e.target.name;
        value = e.target.value;
        setinput({ ...input, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = input;
        try {
            const response = await axios.post('http://localhost:8000/api/auth/login', {
                email,
                password,
            });
            localStorage.setItem('token', response.data.token);

            window.location.href = '/';
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <section className="vh-100">
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="KareerLogo">
                            <center>
                                {/* <img src={logo} alt="img" style={{ maxWidth: '200px', display: 'inline' }} /> */}
                            </center>
                        </div>
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="img-fluid"
                                alt="Sample"
                            />
                        </div>
                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                            <form onSubmit={handleSubmit}>
                                <div className="form-outline mb-4">
                                    <input
                                        type="email"
                                        id="form3Example3"
                                        className="form-control form-control-md"
                                        placeholder="Enter email address"
                                        name="email"
                                        value={input.email}
                                        onChange={handleSelectChange}
                                        required
                                    />
                                    <label className="form-label" htmlFor="form3Example3"></label>
                                </div>

                                <div className="form-outline mb-3">
                                    <input
                                        type="password"
                                        id="form3Example4"
                                        className="form-control form-control-md"
                                        placeholder="Enter password"
                                        name="password"
                                        value={input.password}
                                        onChange={handleSelectChange}
                                        required
                                    />
                                    <label className="form-label" htmlFor="form3Example4"></label>
                                </div>

                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-lg"
                                        style={customstyle}
                                        onClick={handleSubmit}
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-md-row text-center text-md-start justify-content-center py-4 px-4 px-xl-5 bg-primary">
                    <div className="text-white mb-3 mb-md-0">Copyright © {currentyear}. All rights reserved.</div>
                </div>
            </section>
        </>
    );
};

export default Login;
