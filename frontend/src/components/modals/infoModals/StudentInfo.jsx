import React from 'react';

function StudentInfo({ studentData }) {
    return (
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                    <p className="h3">Details of {studentData.name}</p>
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
                <div class="w-75 mx-auto py-5">
                    <div className="col">
                        <div class="card mb-4">
                            <div class="card-body text-center pt-4">
                                <i class="fa-solid fa-user-graduate fa-5x"></i>
                                <h5 class="mt-4">{studentData.name}</h5>
                                <p class="text-muted mb-2">Student</p>
                                <div class="d-flex justify-content-center mb-2 gap-2">
                                    <button type="button" class="btn btn-success">
                                        Academics
                                    </button>
                                    <button type="button" class="btn btn-danger">
                                        Non-Academics
                                    </button>
                                    <button type="button" class="btn btn-warning">
                                        Report
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div class="card mb-4">
                                <div class="card-body">
                                    <div class="row pt-3">
                                        <div class="col">
                                            <p class="mb-0">Full Name</p>
                                        </div>
                                        <div class="col">
                                            <p class="text-muted mb-0">{studentData.name}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="row">
                                        <div class="col">
                                            <p class="mb-0">Gender</p>
                                        </div>
                                        <div class="col">
                                            <p class="text-muted mb-0">{studentData.gender}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="row">
                                        <div class="col">
                                            <p class="mb-0">Email</p>
                                        </div>
                                        <div class="col">
                                            <p class="text-muted mb-0">{studentData.email}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="row">
                                        <div class="col">
                                            <p class="mb-0">Phone</p>
                                        </div>
                                        <div class="col">
                                            <p class="text-muted mb-0">{studentData.phone}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="row">
                                        <div class="col">
                                            <p class="mb-0">Whatsapp</p>
                                        </div>
                                        <div class="col">
                                            <p class="text-muted mb-0">{studentData.whatsapp}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="row">
                                        <div class="col">
                                            <p class="mb-0">Address</p>
                                        </div>
                                        <div class="col">
                                            <p class="text-muted mb-0">{studentData.address}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="row">
                                        <div class="col">
                                            <p class="mb-0">Pin-Code</p>
                                        </div>
                                        <div class="col">
                                            <p class="text-muted mb-0">{studentData.pincode}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="row">
                                        <div class="col">
                                            <p class="mb-0">Fees Paid?</p>
                                        </div>
                                        <div class="col">
                                            <p class="text-muted mb-0">
                                                {studentData.paid ? (
                                                    <i className="fa-solid fa-check"></i>
                                                ) : (
                                                    <i className="fa-solid fa-xmark"></i>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="row">
                                        <div class="col">
                                            <p class="mb-0">Counsellor</p>
                                        </div>
                                        <div class="col">
                                            <p class="text-muted mb-0">{studentData.counsellor_name}</p>
                                        </div>
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
    );
}

export default StudentInfo;
