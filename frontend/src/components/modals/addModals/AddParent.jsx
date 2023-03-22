import React, { useRef, useState } from 'react';
import client from '../../../api';

function AddParent({ callback }) {
    const closeButton = useRef();

    const [formState, setFormState] = useState({
        name: '',
        email: '',
        student_id: null,
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
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
        <form className="modal-content" onSubmit={handleSubmit}>
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
                                name="name"
                                className="form-control"
                                autoComplete="off"
                                autoFocus
                                required
                            />
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
                        </div>

                        <div className="floating-label-group ">
                            <label className="floating-label">Student ID</label>
                            <input
                                onChange={handleChange}
                                value={formState.student_id}
                                type="text"
                                name="student_id"
                                className="form-control"
                                autoComplete="off"
                                required
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeButton}>
                    Close
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    ADD
                </button>
            </div>
        </form>
    );
}

export default AddParent;
