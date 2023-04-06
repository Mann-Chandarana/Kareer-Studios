import React, { useRef, useState } from 'react';
import SmallSpinner from '../../SmallSpinner';
import client from '../../../api';

const AddFeedback = ({ counsellor_id, Fetch_Feedback }) => {
	const closeButton = useRef();

	const [feedback, setfeedback] = useState({
		student_id: '',
		counsellor_id: counsellor_id,
		performance: '',
		planning: '',
		feedback: '',
	});

	const [loading, setloading] = useState(false);

	const handleChange = (event) => {
		const { name, value } = event.target;

		setfeedback({ ...feedback, [name]: value });
	};

	const handlesubmit = async (event) => {
		event.preventDefault();
		setloading(true);
		try {
			await client.post('/feedbacks/addCounsellorFeed', feedback);
			closeButton.current.click();
			Fetch_Feedback();
			setfeedback({
				student_id: '',
				counsellor_id: counsellor_id,
				performance: '',
				planning: '',
				feedback: '',
			});
		} catch (error) {
			console.log(error);
		}
		setloading(false);
	};

	return (
		<form className='modal-content' noValidate onSubmit={handlesubmit}>
			<div className='modal-header'>
				<h5 className='modal-title' id='exampleModalLabel'>
					<p className='h3'>Add Feedback</p>
				</h5>
				<button
					type='button'
					className='close btn btn-sm btn-danger'
					data-bs-dismiss='modal'
					aria-label='Close'
				>
					<span aria-hidden='true'>X</span>
				</button>
			</div>
			<div className='modal-body'>
				<div className='row'>
					<div className='col-xs-4 col-xs-offset-4'>
						<div className='floating-label-group'>
							<label className='floating-label mb-1'>Student ID</label>
							<input
								type='text'
								pattern='^[a-z A-Z]*$'
								name='student_id'
								value={feedback.student_id}
								onChange={handleChange}
								className='form-control'
								autoComplete='off'
								autoFocus
								required
							/>
						</div>
						<div className='floating-label-group mt-2'>
							<label className='floating-label '>Performance</label>
							<textarea
								className='form-control'
								style={{ fontSize: '14px', resize: 'vertical' }}
								rows='3'
								name='performance'
								value={feedback.performance}
								onChange={handleChange}
								autoComplete='off'
								autoFocus
								required
							></textarea>
						</div>

						<div className='floating-label-group mt-2'>
							<label className='floating-label '>Planning</label>
							<textarea
								className='form-control'
								style={{ fontSize: '14px', resize: 'vertical' }}
								rows='3'
								name='planning'
								value={feedback.planning}
								onChange={handleChange}
								autoComplete='off'
								autoFocus
								required
							></textarea>
						</div>

						<div className='floating-label-group mt-2'>
							<label className='floating-label '>Feedback</label>
							<textarea
								className='form-control'
								style={{ fontSize: '14px', resize: 'vertical' }}
								rows='3'
								name='feedback'
								value={feedback.feedback}
								onChange={handleChange}
								autoComplete='off'
								autoFocus
								required
							></textarea>
						</div>
					</div>
				</div>
			</div>
			<div className='modal-footer'>
				<button type='button' className='btn btn-secondary' data-bs-dismiss='modal' ref={closeButton}>
					Close
				</button>
				<button type='submit' className='btn btn-success' disabled={loading}>
					{loading ? (
						<>
							Adding <SmallSpinner />
						</>
					) : (
						'ADD'
					)}
				</button>
			</div>
		</form>
	);
};

export default AddFeedback;
