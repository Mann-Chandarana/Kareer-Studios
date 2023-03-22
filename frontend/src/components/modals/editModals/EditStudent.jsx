import React, { useRef, useState } from 'react';
import client from '../../../api';

function EditStudent({ callback, studentData }) {
    const closeButton = useRef();

    const [formState, setFormState] = useState(studentData);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await client.patch('/students/' + formState.id, formState);
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

    const handleToggle = (e) => {
        setFormState({ ...formState, paid: !formState.paid });
    };

    return (
        <form className="modal-content" onSubmit={handleSubmit}>
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                    <p className="h3">Edit Student</p>
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
                            <label className="floating-label">Counsellor ID</label>
                            <input
                                onChange={handleChange}
                                value={formState.counsellor_id}
                                type="text"
                                name="counsellor_id"
                                className="form-control"
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div className="floating-label-group ">
                            <label className="floating-label">Phone</label>
                            <input
                                onChange={handleChange}
                                value={formState.phone}
                                type="text"
                                name="phone"
                                className="form-control"
                                autoComplete="off"
                                required
                            />
                        </div>
                        <div className="floating-label-group my-2">
                            <label className="form-check-label">Paid Fees: </label>
                            <input
                                onChange={handleToggle}
                                checked={formState.paid}
                                type="checkbox"
                                name="paid"
                                autoComplete="off"
                                className="form-check-input mx-1"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={closeButton}>
                    Close
                </button>
                <button type="submit" className="btn btn-warning" disabled={loading}>
                    Edit
                </button>
            </div>
        </form>
    );
}

export default EditStudent;
