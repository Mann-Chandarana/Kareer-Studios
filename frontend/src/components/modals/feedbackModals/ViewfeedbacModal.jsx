import React from 'react';
import { useState } from 'react';

const ViewfeedbacModal = ({ comment,pdf }) => {
	const [feedback, setFeedback] = useState({
		comment: comment,
		pdf:pdf
	});
	return (
		<div className='modal-content'>
			<div style={{ background: '#4154f1' }} className='modal-header card-header '>
				<h5 className='card-title text-white mt-2 mx-3 ' id='exampleModalLabel'>
					Feedback from Mann Chandarana
				</h5>
			</div>
			<div className='modal-body' style={{ padding: '2rem', fontSize: '25px' }}>
				
				<hr />
				<div style={{ marginBottom: '2rem' }} className=' mt-3 mb-3  align-items-center '>
					<label htmlFor='rating' className='form-label'>
						Comment from Student
					</label>
					<textarea
						className='form-control'
						style={{ fontSize: '14px', resize: 'vertical', minHeight: '100px' }}
						rows='6'
						name='overall_experience'
						value={feedback.comment}
						disabled
					></textarea>
				</div>
			</div>
			<div className='modal-footer'>
				<button
					style={{ background: '#4154f1', color: 'white' }}
					type='button'
					className='btn'
					data-bs-dismiss='modal'
				>
					OK
				</button>
			</div>
		</div>
	);
};

export default ViewfeedbacModal;
