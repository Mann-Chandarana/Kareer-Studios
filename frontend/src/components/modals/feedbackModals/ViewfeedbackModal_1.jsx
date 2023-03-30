import React from 'react'

const ViewfeedbackModal_1 = () => {
    return (
        <form className="modal-content" >
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                    <p className="h3">Feed back from Mann Chandarana</p>
                </h5>
                <button type="button" className="close btn btn-sm btn-danger" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">X</span>
                </button>
            </div>
            <div className="modal-body">
                <div className="row">
                    <div className="col-xs-4 col-xs-offset-4">
                        <div className="floating-label-group">
                            <label className="floating-label">Refferal</label>
                            <input
                                value="Hello"
                                type="text"                                
                                name="refferal"
                                className="form-control"
                            />
                        </div>
                        <div className="floating-label-group">
                            <label className="floating-label">Rating</label>
                            <input
                                value="5 stars"
                                type="text"                                
                                name="refferal"
                                className="form-control"
                            />
                        </div>
                        <div className="floating-label-group">
                            <label className="floating-label">Overall Experience</label>
                            <input
                                value="Hello My name is Mann Chandarana"
                                type="text"                                
                                name="refferal"
                                className="form-control"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                </button>
                
            </div>
        </form>
    )
}

export default ViewfeedbackModal_1