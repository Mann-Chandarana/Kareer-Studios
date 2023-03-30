import React from 'react';

const Feedback = () => {
    return (
        <main id="main" className="d-flex align-items-center justify-content-center">
            <div className="card" style={{ width: '100%', maxWidth: '500px' }}>
                <div style={{ background: '#4154f1' }} className="card-header ">
                    <h5 className="card-title text-white mt-2" id="exampleModalLabel">
                        Feedback request
                    </h5>
                </div>
                <div className="modal-body">
                    <div className="text-center" style={{ padding: '2rem' }}>
                        <i style={{ color: '#4154f1' }} className="far fa-file-alt fa-4x mb-3"></i>
                        <p>
                            <strong>Give counsellor's feedback</strong>
                        </p>
                        <p>
                            Have some ideas how to improve our product?
                            <br />
                            <strong>Give us your feedback.</strong>
                        </p>
                    </div>

                    <form className="px-4" action="">
                        <hr />

                        <label htmlFor="form4Example3" className="text-center w-100 mb-2">
                            <strong>What could we improve?</strong>
                        </label>

                        <div className="form-outline mb-4">
                            <textarea className="form-control" id="form4Example3" rows="4"></textarea>
                        </div>
                    </form>
                </div>
                <div className="card-footer">
                    <button style={{ background: '#4154f1' }} type="button" className="btn text-white">
                        Submit
                    </button>
                </div>
            </div>
        </main>
    );
};

export default Feedback;
