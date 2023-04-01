import React, { useEffect, useState } from 'react';
import client from '../../../api';

const ViewFeedback = () => {
	const [feedback, setFeedback] = useState({
		performance: '',
		planning: '',
		feedback: '',
	});
	const fetchFeedback = async () => {
		try {
			const { data } = await client.get('/feedbacks/counsellor');
			if (data.rowCount > 0) {
				setFeedback(data.rows[0]);
			}
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchFeedback();
	}, []);

	return (
		<main id='main' className='d-flex align-items-center justify-content-center'>
			<div className='card' style={{ width: '100%', maxWidth: '600px' }}>
				<div style={{ background: '#4154f1' }} className='card-header '>
					<h5 className='card-title text-white mt-2' id='exampleModalLabel'>
						Feedback from counsellor
					</h5>
				</div>
				<div className='modal-body'>
					<div className='text-center' style={{ padding: '2rem' }}>
						<i style={{ color: '#4154f1' }} className='far fa-file-alt fa-4x mb-3'></i>
						<p>
							<strong>Counsellor's feedback</strong>
						</p>
					</div>

					<form className='px-4'>
						<div className='mb-3'>
							<label htmlFor='exampleFormControlTextarea1' className='form-label'>
								Feedback:
							</label>
							<textarea
								className='form-control'
								id='feedback'
								rows='3'
								value={feedback.feedback}
								disabled
							></textarea>
						</div>
						<div className='mb-3'>
							<label htmlFor='exampleFormControlTextarea1' className='form-label'>
								Performance:
							</label>
							<textarea
								className='form-control'
								id='feedback'
								rows='3'
								value={feedback.performance}
								disabled
							></textarea>
						</div>
						<div className='mb-3'>
							<label htmlFor='exampleFormControlTextarea1' className='form-label'>
								Planning:
							</label>
							<textarea
								className='form-control'
								id='feedback'
								rows='3'
								value={feedback.planning}
								disabled
							></textarea>
						</div>
					</form>
				</div>
			</div>
		</main>
	);
};

export default ViewFeedback;
