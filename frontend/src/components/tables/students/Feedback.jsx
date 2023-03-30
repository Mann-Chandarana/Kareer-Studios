import React, { useState } from 'react';

const Feedback = () => {
    const [feedback, setFeedback] = useState({
        rating: 1,
        referal: 'Walk in',
        overall_experience: '',
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setFeedback({ ...feedback, [name]: value });
    };

    return (
        <main id="main" className="d-flex align-items-center justify-content-center">
            <div className="card" style={{ width: '100%', maxWidth: '600px' }}>
                <div style={{ background: '#4154f1' }} className="card-header ">
                    <h5 className="card-title text-white mt-2" id="exampleModalLabel">
                        Feedback Form
                    </h5>
                </div>
                <div className="modal-body">
                    <div className="text-center" style={{ padding: '2rem' }}>
                        <i style={{ color: '#4154f1' }} className="far fa-file-alt fa-4x mb-3"></i>
                        <p>
                            <strong>Give counsellor's feedback</strong>
                        </p>
                    </div>

                    <form className="px-4" action="">
                        <div class="mb-3">
                            <label for="rating" class="form-label">
                                Counsellor Rating: {feedback.rating} stars
                            </label>
                            <input
                                type="range"
                                class="form-range"
                                min="1"
                                max="5"
                                step="1"
                                id="rating"
                                name="rating"
                                value={feedback.rating}
                                onChange={handleChange}
                            />
                        </div>
                        <div class="mb-3">
                            <label for="rating" class="form-label">
                                Referal:
                            </label>
                            <select
                                class="form-select"
                                name="referal"
                                defaultValue={feedback.referal}
                                onChange={handleChange}
                            >
                                <option value="Walk in">Walk in</option>
                                <option value="YouTube">YouTube</option>
                                <option value="Staff">Staff</option>
                                <option value="Facebook">Facebook</option>
                                <option value="Facebook">Facebook</option>
                                <option value="Instagram">Instagram</option>
                                <option value="Friend">Friend</option>
                                <option value="Event">Event</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                        <hr />

                        <label htmlFor="form4Example3" className="text-center w-100 mb-2">
                            <strong>How was your overall experience?</strong>
                        </label>

                        <div className="form-outline mb-4">
                            <textarea
                                className="form-control"
                                style={{ fontSize: '14px', resize: 'vertical', minHeight: '100px' }}
                                name="overall_experience"
                                placeholder="Write your feedback here..."
                                value={feedback.overall_experience}
                                onChange={handleChange}
                                required
                            ></textarea>
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
