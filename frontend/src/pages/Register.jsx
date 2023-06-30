import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import client from '../api';

const Register = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // console.log(id);

    const [show, setshow] = useState(false);

    // 60 seconds Timer Code
    const [isStarted, setIsStarted] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(60);
    // states that stores user inputs
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        mobileOtp: '',
        emailOtp: '',
    });

    useEffect(() => {
        let intervalId;

        if (isStarted && secondsLeft > 0) {
            intervalId = setInterval(() => {
                setSecondsLeft((secondsLeft) => secondsLeft - 1);
            }, 1000);
        } else if (secondsLeft === 0) {
            setIsStarted(false);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [isStarted, secondsLeft]);

    // On change handle
    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({ ...user, [name]: value });
    };

    // Otp Handler
    const SendOtp = async () => {
        let { email, phone } = user;

        user.emailOtp = '';
        user.mobileOtp = '';

        const toastId = toast.loading('Sending OTP...');

        try {
            await client.post('/api/otp/send', {
                email,
                phoneNumber: phone,
            });

            setshow(true);

            if (secondsLeft === 0) {
                setSecondsLeft(60);
                setIsStarted(true);
            } else {
                setIsStarted(!isStarted);
            }

            toast.update(toastId, {
                render: 'OTP sent succesfully!',
                type: 'success',
                isLoading: false,
                autoClose: 2000,
            });
        } catch (error) {
            console.error(error);
            toast.update(toastId, {
                render: 'Error sending OTP: ' + error.message,
                type: 'error',
                isLoading: false,
                autoClose: 2000,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, phone, mobileOtp, emailOtp } = user;
        const toatId = toast.loading('Registering new user...');
        try {
            await client.post('/link/register/' + id, {
                name,
                email,
                phone,
                mobileOtp,
                emailOtp,
            });

            toast.update(toatId, {
                render: 'Registration successful!',
                type: 'success',
                isLoading: false,
                autoClose: 2000,
            });

            setTimeout(() => {
                navigate('/');
            }, 1000);
        } catch (error) {
            console.error(error);
            toast.update(toatId, {
                render: 'Error in Registration: ' + error.response.data.error,
                type: 'error',
                isLoading: false,
                autoClose: 2000,
            });
        }
    };

    // Patterns for validations
    const showLink = user.phone.length === 10 && user.name.length >= 3 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email);

    return (
        <>
            <section className='vh-100' style={{ backgroundColor: '#eee' }}>
                <div className='h-100 container'>
                    <div className='row d-flex justify-content-center align-items-center h-100'>
                        <div className='col-lg-12 col-xl-11'>
                            <div className='card text-black' style={{ borderRadius: '25px' }}>
                                <div className='p-md-5'>
                                    <div className='row justify-content-center'>
                                        <div className='col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1'>
                                            <p className='text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4'>Sign up</p>

                                            <form className='mx-1 mx-md-4' onSubmit={handleSubmit}>
                                                <div className='d-flex flex-row align-items-center mb-4'>
                                                    <div className='form-outline flex-fill mb-0'>
                                                        <label className='form-label' htmlFor='name'>
                                                            Name:
                                                        </label>
                                                        <input type='text' id='name' className='form-control' autoComplete='off' name='name' value={user.name} onChange={handleChange} required placeholder='Enter your Name' />
                                                    </div>
                                                </div>

                                                <div className='d-flex flex-row align-items-center mb-4'>
                                                    <div className='form-outline flex-fill mb-0'>
                                                        <label className='form-label' htmlFor='email'>
                                                            Email:
                                                        </label>
                                                        <input type='email' id='email' className='form-control' autoComplete='off' name='email' value={user.email} onChange={handleChange} required placeholder='Enter your Email' />
                                                    </div>
                                                </div>

                                                <div className='d-flex flex-row align-items-center mb-4'>
                                                    <div className='form-outline flex-fill mb-0'>
                                                        <label className='form-label' htmlFor='phone'>
                                                            Phone:
                                                        </label>
                                                        <input type='tel' id='phone' className='form-control' maxLength={10} autoComplete='off' name='phone' value={user.phone} onChange={handleChange} placeholder='Enter your Phone number' required />
                                                    </div>
                                                </div>

                                                <div className='form-outline flex-fill mb-0'>
                                                    {secondsLeft !== 0 ? show ? <input type='tel' id='form3Example4c OTP' className='form-control' maxLength={6} autoComplete='off' placeholder='Enter your Phone OTP here' required name='mobileOtp' value={user.mobileOtp} onChange={handleChange} /> : null : null}
                                                    <br />
                                                </div>
                                                <div className='form-outline flex-fill mb-0'>
                                                    {secondsLeft !== 0 ? show ? <input type='tel' id='form3Example4c OTP' className='form-control' maxLength={6} autoComplete='off' placeholder='Enter your Email OTP here' required name='emailOtp' value={user.emailOtp} onChange={handleChange} /> : null : null}
                                                    <br />
                                                </div>

                                                <div></div>

                                                <div className='d-flex justify-content-center mb-3' id='OTPbtn'>
                                                    {secondsLeft !== 0 && show ? (
                                                        <p style={{ color: 'red' }}>{`Enter OTP in : ${secondsLeft} seconds`}</p>
                                                    ) : (
                                                        <a
                                                            onClick={SendOtp}
                                                            style={{
                                                                cursor: 'pointer',
                                                                textDecoration: 'none',
                                                            }}
                                                            className='OtpSender'
                                                        >
                                                            {(user.name && user.email && user.phone) === '' ? null : secondsLeft >= 1 && secondsLeft < 15 ? null : !showLink ? null : 'Send OTP'}
                                                        </a>
                                                    )}
                                                </div>

                                                <div className='d-flex justify-content-center mx-4 mb-3 mb-lg-4'>
                                                    <button type='submit' className='btn btn-primary btn-lg'>
                                                        Register
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
                                                }}
                                            />
                                        </div>
                                        <div className='col-md-10 col-lg-6 col-xl-7'>
                                            <img src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' style={{ marginTop: '5vh' }} className='img-fluid' alt='Sample image' />
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

export default Register;
