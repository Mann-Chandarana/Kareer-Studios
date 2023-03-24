import React, { useContext, useRef, useState } from 'react';
import client from '../../api';
import SessionContext from '../../contexts/SessionContext';
import SmallSpinner from '../SmallSpinner';

const UpdateAdmin = () => {
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
                <label htmlFor="name" ref={formRef} className="col-md-4 col-lg-3 col-form-label">
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

export default UpdateAdmin;