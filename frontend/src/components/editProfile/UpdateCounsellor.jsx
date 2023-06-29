import React, { useContext, useRef, useState } from 'react';
import client from '../../api';
import SessionContext from '../../contexts/SessionContext';
import SmallSpinner from '../SmallSpinner';

const UpdateCounsellor = () => {
    const { user, renewUser } = useContext(SessionContext);
    const [loading, setLoading] = useState(false);
    const [formState, setFormState] = useState(user);
    const formRef = useRef();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        formRef.current.classList.add('was-validated');
        if (!formRef.current.checkValidity()) {
            return;
        }

        setLoading(true);
        try {
            await client.patch('/auth/editprofile', formState);
            await renewUser();
            formRef.current.classList.remove('was-validated');
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} ref={formRef} noValidate>
            <div className="row mb-3">
                <label htmlFor="name" className="col-md-4 col-lg-3 col-form-label">
                    Full Name
                </label>
                <div className="col-md-8 col-lg-9">
                    <input
                        onChange={handleChange}
                        name="name"
                        type="text"
                        pattern="^[a-z A-Z]*$"
                        className="form-control"
                        id="name"
                        value={formState.name || ''}
                        required
                    />
                    <div className="invalid-feedback">Please enter a valid username.</div>
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="address" className="col-md-4 col-lg-3 col-form-label">
                    Address
                </label>
                <div className="col-md-8 col-lg-9">
                    <textarea
                        onChange={handleChange}
                        value={formState.address || ''}
                        name="address"
                        className="form-control"
                        id="address"
                        style={{ height: '100px' }}
                        required
                    ></textarea>
                    <div className="invalid-feedback">Please enter a valid address.</div>
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="phone" className="col-md-4 col-lg-3 col-form-label">
                    Phone
                </label>
                <div className="col-md-8 col-lg-9">
                    <input
                        onChange={handleChange}
                        name="phone"
                        type="tel"
                        pattern="[0-9]{10}"
                        className="form-control"
                        id="phone"
                        value={formState.phone || ''}
                        required
                    />
                    <div className="invalid-feedback">Please enter a valid phone number.</div>
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="qualifiction" className="col-md-4 col-lg-3 col-form-label">
                    Qualification
                </label>
                <div className="col-md-8 col-lg-9">
                    <input
                        onChange={handleChange}
                        name="qualifiction"
                        type="text"
                        className="form-control"
                        id="qualifiction"
                        value={formState.qualifiction || ''}
                        required
                    />
                    <div className="invalid-feedback">Please enter a valid qualification.</div>
                </div>
            </div>

            <hr />

            <div className="row mb-3">
                <label htmlFor="bank_name" className="col-md-4 col-lg-3 col-form-label">
                    Bank Name
                </label>
                <div className="col-md-8 col-lg-9">
                    <input
                        onChange={handleChange}
                        name="bank_name"
                        type="text"
                        className="form-control"
                        id="bank_name"
                        value={formState.bank_name || ''}
                        required
                    />
                    <div className="invalid-feedback">Please enter a valid bank name.</div>
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="bank_ifsc" className="col-md-4 col-lg-3 col-form-label">
                    Bank IFSC
                </label>
                <div className="col-md-8 col-lg-9">
                    <input
                        onChange={handleChange}
                        name="bank_ifsc"
                        type="text"
                        className="form-control"
                        id="bank_ifsc"
                        value={formState.bank_ifsc || ''}
                        required
                    />
                    <div className="invalid-feedback">Please enter a valid bank ifsc.</div>
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="bank_ac" className="col-md-4 col-lg-3 col-form-label">
                    Bank Account Number
                </label>
                <div className="col-md-8 col-lg-9">
                    <input
                        onChange={handleChange}
                        name="bank_ac"
                        type="text"
                        minLength={10}
                        maxLength={20}
                        pattern="^[0-9]*$"
                        className="form-control"
                        id="bank_ac"
                        value={formState.bank_ac || ''}
                        required
                    />
                    <div className="invalid-feedback">Please enter a valid account number.</div>
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="bank_micr" className="col-md-4 col-lg-3 col-form-label">
                    Bank MICR
                </label>
                <div className="col-md-8 col-lg-9">
                    <input
                        onChange={handleChange}
                        name="bank_micr"
                        type="text"
                        className="form-control"
                        id="bank_micr"
                        value={formState.bank_micr || ''}
                        required
                    />
                    <div className="invalid-feedback">Please enter a valid account micr.</div>
                </div>
            </div>

            <div className="text-center">
                <button onClick={handleSubmit} type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? (
                        <>
                            Saving... <SmallSpinner color="#122" />
                        </>
                    ) : (
                        'Save Changes'
                    )}
                </button>
            </div>
        </form>
    );
};

export default UpdateCounsellor;
