import React, { useRef, useState } from 'react';
import client from '../api';
import Modal from './Modal';
import ModalButton from './ModalButton';
import PasswordChanged from './modals/PasswordChanged';

export const ChangePassword = () => {
    const openButton = useRef();

    const [formState, setFormState] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFormState({ ...formState, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { oldPassword, newPassword, confirmNewPassword } = formState;
        if (newPassword !== confirmNewPassword) {
            return;
        }

        try {
            await client.patch('/auth/changepassword', { oldPassword, newPassword });
            openButton.current.click();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Modal id="password-changed">
                <PasswordChanged />
            </Modal>
            <ModalButton id="password-changed" className="d-none" refer={openButton}></ModalButton>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <label htmlFor="currentPassword" className="col-md-4 col-lg-3 col-form-label">
                        Current Password
                    </label>
                    <div className="col-md-8 col-lg-9">
                        <input
                            name="oldPassword"
                            type="password"
                            className="form-control"
                            id="currentPassword"
                            value={formState.oldPassword}
                            onChange={handleChange}
                        />
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
                            className="form-control"
                            id="newPassword"
                            value={formState.newPassword}
                            onChange={handleChange}
                        />
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
                            id="renewPassword"
                            value={formState.confirmNewPassword}
                            onChange={handleChange}
                        />
                    </div>
                    {formState.confirmNewPassword !== '' && formState.confirmNewPassword !== formState.newPassword && (
                        <p className="text-danger">Confirm password dosen't match with New Password!</p>
                    )}
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                        Change Password
                    </button>
                </div>
            </form>
        </>
    );
};
