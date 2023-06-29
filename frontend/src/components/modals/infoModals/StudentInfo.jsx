import React from 'react';
import { Link } from 'react-router-dom';
import client from '../../../api';
import { toast } from 'react-toastify';

function StudentInfo({ studentData, refreshData }) {
    const formData = new FormData();

    const onFileUpload = async (student_id, event) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }

        formData.set('file', file);
        formData.set('filename', file.name);
        formData.set('student_id', student_id);

        const toastId = toast.loading('Uploading...');

        try {
            await client.post('/suggestprograms/', formData);
            await refreshData();

            toast.update(toastId, {
                render: 'Uploaded!',
                isLoading: false,
                type: 'success',
                autoClose: 1000,
            });
        } catch (err) {
            console.error(err);
            toast.update(toastId, {
                render: err.message,
                isLoading: false,
                type: 'error',
                autoClose: 1000,
            });
        }
    };

    return (
        <div className='modal-content'>
            <div className='modal-header'>
                <h5 className='modal-title' id='exampleModalLabel'>
                    <p className='h3'>Details of {studentData.name}</p>
                </h5>
                <button type='button' className='close btn btn-sm btn-danger' data-bs-dismiss='modal' aria-label='Close'>
                    <span aria-hidden='true'>X</span>
                </button>
            </div>
            <div className='modal-body'>
                <div className='w-75 mx-auto py-5'>
                    <div className='col'>
                        <div className='card mb-4'>
                            <div className='card-body text-center pt-4'>
                                <i className='fa-solid fa-user-graduate fa-5x'></i>
                                <h5 className='mt-4'>{studentData.name}</h5>
                                <p className='text-muted mb-2'>Student</p>
                                <div className='d-flex justify-content-center mb-2 gap-2'>
                                    <button type='button' className='btn btn-success'>
                                        Academics
                                    </button>
                                    <button type='button' className='btn btn-danger'>
                                        Non-Academics
                                    </button>

                                    <Link className='btn btn-warning text-white' to={'/report/' + studentData.id}>
                                        Report
                                    </Link>

                                    <label type='button' className='btn text-white btn-info'>
                                        <input type='file' name='suggested_programs' accept='.xlsx,.csv' multiple={false} onChange={(e) => onFileUpload(studentData.id, e)} style={{ display: 'none' }} />
                                        Suggest Programs
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='col'>
                            <div className='card mb-4'>
                                <div className='card-body'>
                                    <div className='row pt-3'>
                                        <div className='col'>
                                            <p className='mb-0'>Full Name</p>
                                        </div>
                                        <div className='col'>
                                            <p className='text-muted mb-0'>{studentData.name}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className='row'>
                                        <div className='col'>
                                            <p className='mb-0'>Gender</p>
                                        </div>
                                        <div className='col'>
                                            <p className='text-muted mb-0'>{studentData.gender}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className='row'>
                                        <div className='col'>
                                            <p className='mb-0'>Email</p>
                                        </div>
                                        <div className='col'>
                                            <p className='text-muted mb-0'>{studentData.email}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className='row'>
                                        <div className='col'>
                                            <p className='mb-0'>Phone</p>
                                        </div>
                                        <div className='col'>
                                            <p className='text-muted mb-0'>{studentData.phone}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className='row'>
                                        <div className='col'>
                                            <p className='mb-0'>Whatsapp</p>
                                        </div>
                                        <div className='col'>
                                            <p className='text-muted mb-0'>{studentData.whatsapp}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className='row'>
                                        <div className='col'>
                                            <p className='mb-0'>Address</p>
                                        </div>
                                        <div className='col'>
                                            <p className='text-muted mb-0'>{studentData.address}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className='row'>
                                        <div className='col'>
                                            <p className='mb-0'>Pin-Code</p>
                                        </div>
                                        <div className='col'>
                                            <p className='text-muted mb-0'>{studentData.pincode}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className='row'>
                                        <div className='col'>
                                            <p className='mb-0'>Registration Fees</p>
                                        </div>
                                        <div className='col'>
                                            <p className='text-muted mb-0'>{studentData.paid ? <span className='badge rounded-pill text-bg-success'>Paid</span> : <span className='badge rounded-pill text-bg-danger'>Pending</span>}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className='row'>
                                        <div className='col'>
                                            <p className='mb-0'>Counsellor</p>
                                        </div>
                                        <div className='col'>
                                            <p className='text-muted mb-0'>{studentData.counsellor_name}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='modal-footer'>
                <button type='button' className='btn btn-success' data-bs-dismiss='modal'>
                    OK
                </button>
            </div>
        </div>
    );
}

export default StudentInfo;
