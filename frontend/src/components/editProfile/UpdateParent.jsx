import React, { useContext, useRef, useState } from 'react';
import client from '../../api';
import SessionContext from '../../contexts/SessionContext';
import SmallSpinner from '../SmallSpinner';

const UpdateParent = () => {
	const { user, renewUser } = useContext(SessionContext);
	const [loading, setLoading] = useState(false);
	const [formState, setFormState] = useState(user);
	const formRef = useRef();

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormState({ ...formState, [name]: value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		formRef.current.classList.add('was-validated');
		if (!formRef.current.checkValidity()) {
			return;
		}

		setLoading(true);
		try {
			await client.patch('/auth/editprofile', formState);
			await renewUser();
			formRef.current.classList.remove('was-validated');
		} catch (error) {
			console.error(error);
		}
		setLoading(false);
		formRef.current.classList.remove('was-validated');
	};

	return (
		<form onSubmit={handleSubmit} ref={formRef} noValidate>
			<div className='row mb-3'>
				<label htmlFor='name' className='col-md-4 col-lg-3 col-form-label'>
					Full Name
				</label>
				<div className='col-md-8 col-lg-9'>
					<input
						onChange={handleChange}
						name='name'
						type='text'
						pattern='^[a-z A-Z]*$'
						className='form-control'
						id='name'
						value={formState.name || ''}
						required
					/>
					<div className='invalid-feedback'>Please enter a valid username.</div>
				</div>
			</div>

			<div className='row mb-3'>
				<label htmlFor='phone' className='col-md-4 col-lg-3 col-form-label'>
					Phone
				</label>
				<div className='col-md-8 col-lg-9'>
					<input
						onChange={handleChange}
						name='phone'
						type='tel'
						pattern='[0-9]{10}'
						className='form-control'
						id='phone'
						value={formState.phone || ''}
						required
					/>
					<div className='invalid-feedback'>Please enter a valid phone number.</div>
				</div>
			</div>

			<div className='row mb-3'>
				<label htmlFor='occupation' className='col-md-4 col-lg-3 col-form-label'>
					Occupation
				</label>
				<div className='col-md-8 col-lg-9'>
					<input
						onChange={handleChange}
						name='occupation'
						type='text'
						className='form-control'
						id='occupation'
						value={formState.occupation || ''}
						required
					/>
					<div className='invalid-feedback'>Please enter a valid occupation.</div>
				</div>
			</div>

			<div className='row mb-3'>
				<label htmlFor='salary' className='col-md-4 col-lg-3 col-form-label'>
					Salary
				</label>
				<div className='col-md-8 col-lg-9'>
					<input
						onChange={handleChange}
						name='salary'
						type='text'
						pattern='^[0-9]*$'
						className='form-control'
						id='salary'
						value={formState.salary || ''}
						required
					/>
					<div className='invalid-feedback'>Please enter a valid salary.</div>
				</div>
			</div>

			<div className='text-center'>
				<button onClick={handleSubmit} type='submit' className='btn btn-primary' disabled={loading}>
					{loading ? (
						<>
							Saving... <SmallSpinner color='#122' />
						</>
					) : (
						'Save Changes'
					)}
				</button>
			</div>
		</form>
	);
};

export default UpdateParent;
