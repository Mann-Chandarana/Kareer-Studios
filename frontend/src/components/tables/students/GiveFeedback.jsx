import React, { useContext, useState } from 'react';
import client from '../../../api';
import SessionContext from '../../../contexts/SessionContext';

const GiveFeedback = () => {
	const { user } = useContext(SessionContext);

	const [feedback, setFeedback] = useState({
		rating: '1',
		referal: 'Walk in',
		overall_experience: '',
	});
	const [submitted, setSubmitted] = useState(false);

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setFeedback({ ...feedback, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await client.post('/feedbacks/student', {
				...feedback,
				student_id: user.id,
				counsellor_id: user.counsellor_id,
			});
			setSubmitted(true);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<main id='main' className='d-flex align-items-center justify-content-center'>
			<div className='card' style={{ width: '100%', maxWidth: '600px' }}>
				<div style={{ background: '#4154f1' }} className='card-header '>
					<h5 className='card-title text-white mt-2' id='exampleModalLabel'>
						Feedback Form
					</h5>
				</div>
				<div className='modal-body'>
					<div className='text-center' style={{ padding: '2rem' }}>
						<i style={{ color: '#4154f1' }} className='far fa-file-alt fa-4x mb-3'></i>
						<p>
							<strong>Give counsellor's feedback</strong>
						</p>
					</div>

					<form className='px-4' onSubmit={handleSubmit}>
						<div className='mb-3'>
							<label htmlFor='rating' className='form-label d-flex align-items-center'>
								Counsellor Rating:
								<div className='d-flex justify-content-center align-items-center text-warning mx-2'>
									{feedback.rating >= 1 && <i className='fa-solid fa-star'></i>}
									{feedback.rating >= 2 && <i className='fa-solid fa-star'></i>}
									{feedback.rating >= 3 && <i className='fa-solid fa-star'></i>}
									{feedback.rating >= 4 && <i className='fa-solid fa-star'></i>}
									{feedback.rating >= 5 && <i className='fa-solid fa-star'></i>}
								</div>
								({feedback.rating} {feedback.rating === '1' ? 'star' : 'stars'})
							</label>
							<input
								type='range'
								className='form-range'
								min='1'
								max='5'
								step='1'
								id='rating'
								name='rating'
								value={feedback.rating}
								onChange={handleChange}
							/>
						</div>
						<div className='mb-3'>
							<label htmlFor='rating' className='form-label'>
								Referal:
							</label>
							<select
								className='form-select'
								name='referal'
								defaultValue={feedback.referal}
								onChange={handleChange}
							>
								<option value='Walk in'>Walk in</option>
								<option value='YouTube'>YouTube</option>
								<option value='Staff'>Staff</option>
								<option value='Facebook'>Facebook</option>
								<option value='Facebook'>Facebook</option>
								<option value='Instagram'>Instagram</option>
								<option value='Friend'>Friend</option>
								<option value='Event'>Event</option>
								<option value='Others'>Others</option>
							</select>
						</div>
						<hr />

						<label htmlFor='form4Example3' className='text-center w-100 mb-2'>
							<strong>How was your overall experience?</strong>
						</label>

						<div className='form-outline mb-4'>
							<textarea
								className='form-control'
								style={{ fontSize: '14px', resize: 'vertical', minHeight: '100px' }}
								name='overall_experience'
								placeholder='Write your feedback here...'
								value={feedback.overall_experience}
								onChange={handleChange}
								required
							></textarea>
						</div>
						<div className='card-footer'>
							<button
								style={{ background: '#4154f1' }}
								type='submit'
								className='btn text-white'
								disabled={submitted}
							>
								{submitted ? 'Submitted!' : 'Submit'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</main>
	);
};

export default GiveFeedback;
