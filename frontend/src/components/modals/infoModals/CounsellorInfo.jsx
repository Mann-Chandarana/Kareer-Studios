import React from 'react';

export const CounsellorInfo = ({ counsellorData, role }) => {
    return (
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                    <p className="h3">Details of {counsellorData.name}</p>
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
                                <i class="fa-solid fa-user-tie fa-5x"></i>
                                <h5 class="mt-4">{counsellorData.name}</h5>
                                <p class="text-muted mb-2">Counsellor</p>
                                <p className="text-secondary">
                                    Counselling {counsellorData.number_of_students} students
                                </p>
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
                                            <p class="text-muted mb-0">{counsellorData.name}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="row">
                                        <div class="col">
                                            <p class="mb-0">Email</p>
                                        </div>
                                        <div class="col">
                                            <p class="text-muted mb-0">{counsellorData.email}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="row">
                                        <div class="col">
                                            <p class="mb-0">Phone</p>
                                        </div>
                                        <div class="col">
                                            <p class="text-muted mb-0">{counsellorData.phone}</p>
                                        </div>
                                    </div>
                                    {role !== 'student' && (
                                        <>
                                            <hr />
                                            <div class="row">
                                                <div class="col">
                                                    <p class="mb-0">Salary</p>
                                                </div>
                                                <div class="col">
                                                    <p class="text-muted mb-0">&#8377;{counsellorData.salary}</p>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    <hr />
                                    <div class="row">
                                        <div class="col">
                                            <p class="mb-0">Address</p>
                                        </div>
                                        <div class="col">
                                            <p class="text-muted mb-0">{counsellorData.address}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="row">
                                        <div class="col">
                                            <p class="mb-0">Experience</p>
                                        </div>
                                        <div class="col">
                                            <p class="text-muted mb-0">{counsellorData.experience} yr</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="row">
                                        <div class="col">
                                            <p class="mb-0">Qualification</p>
                                        </div>
                                        <div class="col">
                                            <p class="text-muted mb-0">{counsellorData.qualifiction}</p>
                                        </div>
                                    </div>
                                    {role !== 'student' && (
                                        <>
                                            <hr />
                                            <div class="row">
                                                <div class="col">
                                                    <p class="mb-0">Bank Name</p>
                                                </div>
                                                <div class="col">
                                                    <p class="text-muted mb-0">{counsellorData.bank_name}</p>
                                                </div>
                                            </div>
                                            <hr />
                                            <div class="row">
                                                <div class="col">
                                                    <p class="mb-0">IFSC Code</p>
                                                </div>
                                                <div class="col">
                                                    <p class="text-muted mb-0">{counsellorData.bank_ifsc}</p>
                                                </div>
                                            </div>
                                            <hr />
                                            <div class="row">
                                                <div class="col">
                                                    <p class="mb-0">Account No.</p>
                                                </div>
                                                <div class="col">
                                                    <p class="text-muted mb-0">{counsellorData.bank_ac}</p>
                                                </div>
                                            </div>
                                            <hr />
                                            <div class="row">
                                                <div class="col">
                                                    <p class="mb-0">Bank MICR</p>
                                                </div>
                                                <div class="col">
                                                    <p class="text-muted mb-0">{counsellorData.bank_micr}</p>
                                                </div>
                                            </div>
                                        </>
                                    )}
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
};
