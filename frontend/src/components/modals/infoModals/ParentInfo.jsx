import React from 'react';

export const ParentInfo = ({ parentData }) => {
    return (
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                    <p className="h3">Details of {parentData.name}</p>
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
                                <h5 class="mt-4">{parentData.name}</h5>
                                <p class="text-muted mb-2">Parent</p>
                                <p className="text-secondary">Parent of student with ID: {parentData.student_id}</p>
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
                                            <p class="text-muted mb-0">{parentData.name}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="row">
                                        <div class="col">
                                            <p class="mb-0">Gender</p>
                                        </div>
                                        <div class="col">
                                            <p class="text-muted mb-0">{parentData.gender}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="row">
                                        <div class="col">
                                            <p class="mb-0">Email</p>
                                        </div>
                                        <div class="col">
                                            <p class="text-muted mb-0">{parentData.email}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="row">
                                        <div class="col">
                                            <p class="mb-0">Phone</p>
                                        </div>
                                        <div class="col">
                                            <p class="text-muted mb-0">{parentData.phone}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="row">
                                        <div class="col">
                                            <p class="mb-0">Earnings</p>
                                        </div>
                                        <div class="col">
                                            <p class="text-muted mb-0">&#8377;{parentData.salary}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="row">
                                        <div class="col">
                                            <p class="mb-0">Occupation</p>
                                        </div>
                                        <div class="col">
                                            <p class="text-muted mb-0">{parentData.occupation}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div class="row">
                                        <div class="col">
                                            <p class="mb-0">Family Type</p>
                                        </div>
                                        <div class="col">
                                            <p class="text-muted mb-0">{parentData.family_type}</p>
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
};
