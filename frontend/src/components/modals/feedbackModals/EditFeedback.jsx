import React, { useRef, useState } from 'react';
import client from '../../../api';
import SmallSpinner from '../../SmallSpinner';

const EditFeedback = ({ id, student_id, Performance, Planning, Feedback, Fetch_Feedback }) => {
	const closeButton = useRef();
	const [obj, setobj] = useState({
		id: id,
		student_id: student_id,
		Performance: Performance,
		Planning: Planning,
		Feedback: Feedback,
	});
	const [loading, setloading] = useState(false);

	const handleChange = async (event) => {
		const { name, value } = event.target;
		setobj({ ...obj, [name]: value });
		console.log(obj);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setloading(true);
		try {
			await client.patch('/feedbacks/updateCounsellorFeed', obj);
			closeButton.current.click();
			Fetch_Feedback();
		} catch (err) {
			console.log({ error: err.message });
		}
		setloading(false);
	};

	return (
		<form className='modal-content' noValidate onSubmit={handleSubmit}>
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
								value={obj.student_id}
								onChange={handleChange}
								className='form-control'
								autoComplete='off'
								autoFocus
								required
								disabled
							/>
						</div>
						<div className='floating-label-group mt-2'>
							<label className='floating-label '>Performance</label>
							<textarea
								className='form-control'
								style={{ fontSize: '14px', resize: 'vertical' }}
								rows='3'
								name='Performance'
								value={obj.Performance}
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
								name='Planning'
								value={obj.Planning}
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
								name='Feedback'
								value={obj.Feedback}
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
				<button type='submit' className='btn btn-warning' disabled={loading}>
					{loading ? (
						<>
							Updating <SmallSpinner />
						</>
					) : (
						'Update'
					)}
				</button>
			</div>
		</form>
	);
};

export default EditFeedback;
