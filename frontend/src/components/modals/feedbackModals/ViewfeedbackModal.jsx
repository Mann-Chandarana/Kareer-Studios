import React from 'react'

const ViewfeedbackModal = ({ user, Feedback }) => {
  return (
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          <p className="h3">Feedback from Mann Chandarana</p>
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

        <div className="col">
          <div className="col">
            <div className="card mb-4">
              <div className="card-body">
                <div className="row pt-3">
                  <div className="col">
                    <p className="mb-0">Refferal</p>
                  </div>
                  <div className="col">
                    <p className="text-muted mb-0">Hello</p>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="row pt-3">
                  <div className="col">
                    <p className="mb-0">Rating</p>
                  </div>
                  <div className="col">
                    <p className="text-muted mb-0">5</p>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="row pt-3">
                  <div className="col">
                    <p className="mb-0">Overall experience</p>
                  </div>
                  <div className="col">
                    <p className="text-muted mb-0">My name is mann chandarana</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-success" data-bs-dismiss="modal">
          OK
        </button>
      </div>
    </div>
  )
}

export default ViewfeedbackModal