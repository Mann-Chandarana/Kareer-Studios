import React from 'react'
import { useState } from 'react';

const ViewfeedbacModal = ({overall_experience,rating,referral}) => {
    const [feedback, setFeedback] = useState({
        rating: rating,
        referal: referral,
        overall_experience: overall_experience,
    });
    return (
        <div className="modal-content">
                <div style={{ background: '#4154f1' }} className="modal-header card-header ">
                    <h5 className="card-title text-white mt-2 mx-3 " id="exampleModalLabel">
                        Feedback from Mann Chandarana
                    </h5>
                </div>
                <div className="modal-body" style={{ padding: '2rem', fontSize: "25px" }}>
    
                    <div style={{ marginBottom: "2rem" }} >
                        <label htmlFor="rating" className="form-label d-flex align-items-center">
                            Rating:
                            <div className="d-flex justify-content-center align-items-center text-warning mx-2">
                                {feedback.rating >= 1 && <i className="fa-solid fa-star"></i>}
                                {feedback.rating >= 2 && <i className="fa-solid fa-star"></i>}
                                {feedback.rating >= 3 && <i className="fa-solid fa-star"></i>}
                                {feedback.rating >= 4 && <i className="fa-solid fa-star"></i>}
                                {feedback.rating >= 5 && <i className="fa-solid fa-star"></i>}
                            </div>
                            ({feedback.rating} {feedback.rating === '1' ? 'star' : 'stars'})
                        </label>
                    </div>
                    <hr />
                    <div style={{ marginBottom: "2rem" }} className=" mt-3 mb-3  align-items-center ">
                        <label htmlFor="rating" className="form-label">Overall Experience:</label>
                        <textarea
                            className="form-control"
                            style={{ fontSize: '14px', resize: 'vertical', minHeight: '100px' }}
                            rows="6"
                            name="overall_experience"
                            value={feedback.overall_experience} 
                            disabled
                        ></textarea>
                    </div>
    
                </div>
                <div className="modal-footer">
                    <button style={{ background: '#4154f1', color: 'white' }} type="button" className="btn" data-bs-dismiss="modal">
                        OK
                    </button>
                </div>
            </div>
    )
}

export default ViewfeedbacModal