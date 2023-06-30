import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import client from '../api';

const customstyle = {
    paddingLeft: '2.5rem',
    paddingRight: '2.5rem',
};

const Login = () => {
    const [input, setinput] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setinput({ ...input, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = input;
        if (!email || !password) {
            toast.warning('Please fill the Given Details');
            return;
        }

        const toastId = toast.loading('Loggin In...');

        try {
            const response = await client.post('/auth/login', {
                email,
                password,
            });

            localStorage.setItem('token', response.data.token);

            toast.update(toastId, {
                render: 'Login Succesfull!',
                type: 'success',
                isLoading: false,
                autoClose: 2000,
            });

            setTimeout(() => {
                window.location.href = '/';
            }, 1000);
        } catch (error) {
            toast.update(toastId, {
                render: 'Login Failed: ' + error.message,
                type: 'error',
                isLoading: false,
                autoClose: 2000,
            });
        }
    };

    return (
        <>
            <section className='vh-100' style={{ backgroundColor: '#eee' }}>
                <div className='h-100 container'>
                    <div className='row d-flex justify-content-center align-items-center h-100'>
                        <div className='col-lg-12 col-xl-11'>
                            <div className='card text-black' style={{ borderRadius: '15px' }}>
                                <div className='p-md-5'>
                                    <div className='row justify-content-center'>
                                        <div className='col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1'>
                                            <p className='text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4'>LOGIN</p>

                                            <form className='mx-1 mx-md-4' onSubmit={handleSubmit}>
                                                <div className='d-flex flex-row align-items-center mb-2'>
                                                    <div className='form-outline flex-fill mb-0'>
                                                        <input type='email' id='form3Example3c' className='form-control' autoComplete='off' name='email' value={input.email} onChange={handleChange} required placeholder='Enter your Email' />
                                                        <label className='form-label' htmlFor='form3Example3c'></label>
                                                    </div>
                                                </div>
                                                <div className='d-flex flex-row align-items-center mb-2'>
                                                    <div className='form-outline flex-fill mb-0'>
                                                        <input type='password' id='form3Example3c' className='form-control' autoComplete='off' name='password' value={input.password} onChange={handleChange} required placeholder='Enter Password' />
                                                        <label className='form-label' htmlFor='form3Example3c'></label>
                                                    </div>
                                                </div>

                                                <div className='d-flex justify-content-center mx-4 mb-3 mb-lg-4'>
                                                    <button type='submit' className='btn btn-primary btn-md' style={customstyle}>
                                                        Login
                                                    </button>
                                                </div>
                                            </form>
                                        </div>

                                        <div className='KareerLogo'>
                                            <img
                                                src='/assets/img/logo2.png'
                                                alt='img'
                                                style={{
                                                    maxWidth: '200px',
                                                    display: 'inline',
                                                    position: 'absolute',
                                                    top: 30,
                                                    left: 30,
                                                }}
                                            />
                                        </div>

                                        <div className='col-md-9 col-lg-6 col-xl-5'>
                                            <img src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp' className='img-fluid' alt='Sample image' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </>
    );
};

export default Login;
