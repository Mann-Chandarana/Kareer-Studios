import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import client from '../api';

export const Payment = ({ user, renewUser }) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const verifyPayment = async (payment_id, payment_request_id) => {
        setLoading(true);
        try {
            const res = await client.post('/payment/verify', { payment_id, payment_request_id, student_id: user.id });
            await renewUser();
            navigate('/profile');
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };
    useEffect(() => {
        const payment_id = searchParams.get('payment_id');
        const payment_request_id = searchParams.get('payment_request_id');
        if (payment_id) {
            verifyPayment(payment_id, payment_request_id);
        }
        // eslint-disable-next-line
    }, []);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const res = await client.post('/payment/create', {
                email: user.email,
                amount: 5000,
                phone: user.phone,
                name: user.name,
                redirect_url: 'http://localhost:3000/',
                purpose: 'Test',
            });

            window.location.href = res.data.url;
        } catch (err) {
            console.error(err);
        }
        // setLoading(false);
    };
    return (
        <div
            className="container"
            style={{ width: '500px', height: '600px', boxShadow: '5px 5px 15px,-5px -5px 15px', marginTop: '8%' }}
        >
            <div className="KareerLogo">
                <center>
                    <img src="/assets/img/logo.png" alt="img" style={{ maxWidth: '150px', display: 'inline' }} />
                </center>
            </div>
            <center>
                <big>
                    <b>
                        <h2 className="my-5" style={{ color: '#2B3467' }}>
                            PAY REGISTRATION FEES
                        </h2>
                    </b>
                </big>
            </center>
            <form>
                <fieldset disabled="disabled">
                    <div className="form-outline mb-4">
                        <div className="col-xs-4">
                            <center>
                                <input
                                    type="email"
                                    placeholder="Enter email address"
                                    id="form2Example1"
                                    value={user.email}
                                    className="form-control"
                                    style={{ width: '60%' }}
                                    required
                                />
                            </center>

                            <label className="form-label" htmlfor="form2Example1"></label>
                        </div>
                    </div>

                    <div className="form-outline mb-4">
                        <div className="col-xs-4">
                            <center>
                                <input
                                    type="text"
                                    id="form2Example2"
                                    value={5000}
                                    className="form-control"
                                    placeholder="Enter the Amount"
                                    style={{ width: '60%' }}
                                    required
                                />
                            </center>
                            <label className="form-label" htmlfor="form2Example2"></label>
                        </div>
                    </div>
                </fieldset>
                <center>
                    <button
                        rel="noopener noreferrer"
                        type="button"
                        className="App-link btn btn-primary"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : 'Make Payment'}
                    </button>
                </center>
            </form>
        </div>
    );
};
