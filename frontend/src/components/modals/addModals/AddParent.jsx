import React, { useRef, useState } from 'react';
import client from '../../../api';
import SmallSpinner from '../../SmallSpinner';

function AddParent({ callback }) {
    const closeButton = useRef();

    const [formState, setFormState] = useState({
        name: '',
        email: '',
        student_id: '',
    });
    const [loading, setLoading] = useState(false);
    const formRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        formRef.current.classList.add('was-validated');
        if (!formRef.current.checkValidity()) {
            return;
        }

        setLoading(true);

        try {
            const res = await client.post('/parents', formState);
            console.log(res);
            closeButton.current.click();
            if (callback) {
                callback();
            }
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    return (
        <form className="modal-content" onSubmit={handleSubmit} ref={formRef} noValidate>
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                    <p className="h3">Add Parent</p>
                </h5>
                <button
                    type="button"
                    className="close btn btn-sm btn-danger"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                >
                    <span aria-hidden="true">X</span>
                </button>
            </div>
            <div className="modal-body">
                <div className="row">
                    <div className="col-xs-4 col-xs-offset-4">
                        <div className="floating-label-group">
                            <label className="floating-label">Name</label>
                            <input
                                onChange={handleChange}
                                value={formState.name}
                                type="text"
                                pattern="^[a-z A-Z]*$"
                                name="name"
                                className="form-control"
                                autoComplete="off"
                                autoFocus
                                required
                            />
                            <div className="invalid-feedback">Please enter a valid username.</div>
                        </div>

                        <div className="floating-label-group ">
                            <label className="floating-label">Email</label>
                            <input
                                onChange={handleChange}
                                value={formState.email}
                                type="email"
                                name="email"
                                className="form-control"
                                autoComplete="off"
                                required
                            />
                            <div className="invalid-feedback">Please enter a valid email.</div>
                        </div>

                        <div className="floating-label-group ">
                            <label className="floating-label">Student ID</label>
                            <input
                                onChange={handleChange}
                                value={formState.student_id}
                                type="text"
                                pattern="^[0-9]*$"
                                name="student_id"
                                className="form-control"
                                autoComplete="off"
                                required
                            />
                            <div className="invalid-feedback">Please enter a valid student id.</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeButton}>
                    Close
                </button>
                <button type="submit" className="btn btn-success" disabled={loading}>
                    {loading ? (
                        <>
                            Creating <SmallSpinner />
                        </>
                    ) : (
                        'ADD'
                    )}
                </button>
            </div>
        </form>
    );
}

export default AddParent;
