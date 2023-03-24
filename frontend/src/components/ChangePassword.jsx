import React, { useRef, useState } from 'react';
import client from '../api';
import Modal from './Modal';
import ModalButton from './ModalButton';
import PasswordChanged from './modals/PasswordChanged';
import SmallSpinner from './SmallSpinner';

export const ChangePassword = () => {
    const openButton = useRef();

    const [formState, setFormState] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });

    const [loading, setLoading] = useState(false);

    const formRef = useRef();

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormState({ ...formState, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        formRef.current.classList.add('was-validated');
        if (!formRef.current.checkValidity()) {
            return;
        }
        const { oldPassword, newPassword, confirmNewPassword } = formState;
        if (newPassword !== confirmNewPassword) {
            return;
        }

        setLoading(true);
        try {
            await client.patch('/auth/changepassword', { oldPassword, newPassword });
            openButton.current.click();
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    return (
        <>
            <Modal id="password-changed">
                <PasswordChanged />
            </Modal>
            <ModalButton id="password-changed" className="d-none" refer={openButton}></ModalButton>
            <form onSubmit={handleSubmit} ref={formRef} noValidate>
                <div className="row mb-3">
                    <label htmlFor="currentPassword" className="col-md-4 col-lg-3 col-form-label">
                        Current Password
                    </label>
                    <div className="col-md-8 col-lg-9">
                        <input
                            name="oldPassword"
                            type="password"
                            minLength={5}
                            className="form-control"
                            id="currentPassword"
                            value={formState.oldPassword}
                            onChange={handleChange}
                            required
                        />
                        <div className="invalid-feedback">Please enter a old password.</div>
                    </div>
                </div>

                <div className="row mb-3">
                    <label htmlFor="newPassword" className="col-md-4 col-lg-3 col-form-label">
                        New Password
                    </label>
                    <div className="col-md-8 col-lg-9">
                        <input
                            name="newPassword"
                            type="password"
                            minLength={5}
                            className="form-control"
                            id="newPassword"
                            value={formState.newPassword}
                            onChange={handleChange}
                            required
                        />
                        <div className="invalid-feedback">Please enter a valid new password.</div>
                    </div>
                </div>

                <div className="row mb-3">
                    <label htmlFor="renewPassword" className="col-md-4 col-lg-3 col-form-label">
                        Confirm Password
                    </label>
                    <div className="col-md-8 col-lg-9">
                        <input
                            name="confirmNewPassword"
                            type="password"
                            className="form-control"
                            pattern={formState.newPassword}
                            id="renewPassword"
                            value={formState.confirmNewPassword}
                            onChange={handleChange}
                            required
                        />
                        <div className="invalid-feedback">do not match with new password.</div>
                    </div>
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? (
                            <>
                                <span style={{ marginRight: '10px' }}>Changing...</span>
                                <SmallSpinner color="white" />
                            </>
                        ) : (
                            'Change Password'
                        )}
                    </button>
                </div>
            </form>
        </>
    );
};
