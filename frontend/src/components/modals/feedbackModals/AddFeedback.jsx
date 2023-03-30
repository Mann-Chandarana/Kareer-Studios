import React from 'react'

const AddFeedback = () => {
    return (
        <form className="modal-content" noValidate>
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                    <p className="h3">Add Feedback</p>
                </h5>
                <button type="button" className="close btn btn-sm btn-danger" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">X</span>
                </button>
            </div>
            <div className="modal-body">
                <div className="row">
                    <div className="col-xs-4 col-xs-offset-4">
                        <div className="floating-label-group">
                            <label className="floating-label mb-1">Student ID</label>
                            <input
                                type="text"
                                pattern="^[a-z A-Z]*$"
                                name="name"
                                className="form-control"
                                autoComplete="off"
                                autoFocus
                                required
                            />
                        </div>
                        <div className="floating-label-group mt-2">
                            <label className="floating-label ">Performance</label>
                            <textarea
                                className="form-control"
                                style={{ fontSize: '14px', resize: 'vertical' }}
                                rows="3"
                                name="performance"
                                autoComplete="off"
                                autoFocus
                                required
                            ></textarea>
                        </div>

                        <div className="floating-label-group mt-2">
                            <label className="floating-label ">Planning</label>
                            <textarea
                                className="form-control"
                                style={{ fontSize: '14px', resize: 'vertical'}}
                                rows="3"
                                name="planning"
                                autoComplete="off"
                                autoFocus
                                required
                            ></textarea>
                        </div>

                        <div className="floating-label-group mt-2">
                            <label className="floating-label ">Feedback</label>
                            <textarea
                                className="form-control"
                                style={{ fontSize: '14px', resize: 'vertical' }}
                                rows="3"
                                name="feedback"
                                autoComplete="off"
                                autoFocus
                                required
                            ></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                </button>
                <button type="submit" className="btn btn-success" >
                    Add
                </button>
            </div>
        </form>
    )
}

export default AddFeedback