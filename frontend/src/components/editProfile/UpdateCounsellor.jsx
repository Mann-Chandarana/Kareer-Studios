import React, { useContext, useState } from 'react';
import client from '../../api';
import SessionContext from '../../contexts/SessionContext';
import SmallSpinner from '../SmallSpinner';

const UpdateCounsellor = () => {
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
                        value={formState.qualifiction}
                    />
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
                        value={formState.bank_name}
                    />
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
                        value={formState.bank_ifsc}
                    />
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
                        className="form-control"
                        id="bank_ac"
                        value={formState.bank_ac}
                    />
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
                        value={formState.bank_micr}
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

export default UpdateCounsellor;
