import React, { useContext, useState } from 'react';
import client from '../../api';
import SessionContext from '../../contexts/SessionContext';
import SmallSpinner from '../SmallSpinner';

const UpdateStudent = () => {
    const { user, renewUser } = useContext(SessionContext);
    const [loading, setLoading] = useState(false);
    const [formState, setFormState] = useState(user);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);
            await client.patch('/auth/editprofile', formState);
            await renewUser();
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="row mb-3">
                <label htmlFor="name" className="col-md-4 col-lg-3 col-form-label">
                    Full Name
                </label>
                <div className="col-md-8 col-lg-9">
                    <input
                        onChange={handleChange}
                        name="name"
                        type="text"
                        className="form-control"
                        id="name"
                        value={formState.name}
                    />
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
                    ></textarea>
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="city" className="col-md-4 col-lg-3 col-form-label">
                    City
                </label>
                <div className="col-md-8 col-lg-9">
                    <textarea
                        onChange={handleChange}
                        value={formState.city}
                        name="city"
                        className="form-control"
                        id="city"
                        style={{ height: '100px' }}
                    ></textarea>
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
                        className="form-control"
                        id="phone"
                        value={formState.phone}
                    />
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
                        className="form-control"
                        id="whatsapp"
                        value={formState.whatsapp}
                    />
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
                        className="form-control"
                        id="pincode"
                        value={formState.pincode}
                    />
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
