import React, { useContext, useRef, useState } from 'react';
import client from '../../api';
import SessionContext from '../../contexts/SessionContext';
import SmallSpinner from '../SmallSpinner';

const UpdateStudent = () => {
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
        } catch (error) {
            console.log(error);
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
                        value={formState.name}
                        required
                    />
                    <div class="invalid-feedback">Please enter a valid username.</div>
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="address" className="col-md-4 col-lg-3 col-form-label">
                    Address
                </label>
                <div className="col-md-8 col-lg-9">
                    <textarea
                        onChange={handleChange}
                        value={formState.address}
                        name="address"
                        className="form-control"
                        id="address"
                        style={{ height: '100px' }}
                        required
                    ></textarea>
                    <div class="invalid-feedback">Please enter a valid address.</div>
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="city" className="col-md-4 col-lg-3 col-form-label">
                    City
                </label>
                <div className="col-md-8 col-lg-9">
                    <input
                        onChange={handleChange}
                        value={formState.city}
                        type="text"
                        pattern="^[a-z A-Z]*$"
                        name="city"
                        className="form-control"
                        id="city"
                        required
                    />
                    <div class="invalid-feedback">Please enter a valid city.</div>
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
                        value={formState.phone}
                        required
                    />
                    <div class="invalid-feedback">Please enter a valid phone.</div>
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="whatsapp" className="col-md-4 col-lg-3 col-form-label">
                    WhatsApp
                </label>
                <div className="col-md-8 col-lg-9">
                    <input
                        onChange={handleChange}
                        name="whatsapp"
                        type="tel"
                        pattern="[0-9]{10}"
                        className="form-control"
                        id="whatsapp"
                        value={formState.whatsapp}
                        required
                    />
                    <div class="invalid-feedback">Please enter a valid whatsapp.</div>
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="pincode" className="col-md-4 col-lg-3 col-form-label">
                    Pin Code
                </label>
                <div className="col-md-8 col-lg-9">
                    <input
                        onChange={handleChange}
                        name="pincode"
                        type="text"
                        pattern="[0-9]{6}"
                        className="form-control"
                        id="pincode"
                        value={formState.pincode}
                        required
                    />
                    <div class="invalid-feedback">Please enter a valid pincode.</div>
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

export default UpdateStudent;
