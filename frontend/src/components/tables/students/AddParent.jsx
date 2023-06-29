import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../../../api';
import SessionContext from '../../../contexts/SessionContext';

function AddParent() {
	const { user, renewUser } = useContext(SessionContext);

	const navigate = useNavigate();

	const [parent, setParent] = useState({
		name: '',
		email: '',
		phone: '',
		gender: 'father',
	});

	const formRef = useRef();

	if (user.parent_added) {
		navigate('/');
	}

	const handleChange = (event) => {
		const { name, value } = event.target;
		setParent((prev) => {
			return {
				...prev,
				[name]: value,
			};
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		formRef.current.classList.add('was-validated');
		if (!formRef.current.checkValidity()) {
			return;
		}

		parent.student_id = user.id;

		try {
			await client.post('/parents', parent);
			setParent({
				name: '',
				email: '',
				phone: '',
				gender: '',
			});
			await renewUser();
			formRef.current.classList.remove('was-validated');
			navigate('/parent');
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<main id='main' className='d-flex align-items-center'>
			<div className='container'>
				<h4 style={{ margin: '1rem 0', fontSize: '2rem' }}>Add Parent</h4>
				<form className='d-flex flex-column gap-2' onSubmit={handleSubmit} ref={formRef} noValidate>
					<div className='input-group mb-3'>
						<span className='input-group-text'>
							<i className='fa fa-user icon' style={{ marginRight: '10px' }}></i>
						</span>
						<input
							type='text'
							className='form-control'
							name='name'
							pattern='^[a-z A-Z]*$'
							value={parent.name}
							placeholder='Enter your parent name'
							onChange={handleChange}
							required
						/>
						<div className='invalid-feedback'>Please enter a valid username.</div>
					</div>

					<div className='input-group mb-3'>
						<span className='input-group-text'>
							<i className='fa fa-envelope' style={{ marginRight: '10px' }}></i>
						</span>
						<input
							type='email'
							className='form-control'
							name='email'
							value={parent.email}
							placeholder='Enter your parent email'
							onChange={handleChange}
							required
						/>
						<div className='invalid-feedback'>Please enter a valid email.</div>
					</div>

					<div className='input-group mb-3'>
						<span className='input-group-text'>
							<i className='fa fa-solid fa-phone icon' style={{ marginRight: '10px' }}></i>
						</span>
						<input
							type='tel'
							className='form-control'
							name='phone'
							pattern='[0-9]{10}'
							value={parent.phone}
							placeholder='Enter your parent phone number'
							onChange={handleChange}
							required
						/>
						<div className='invalid-feedback'>Please enter a phone number.</div>
					</div>

					<h4>Select Role</h4>
					<div className='input-group mb-3'>
						<br />
						<div className='btn-group' role='group'>
							<input
								type='radio'
								className='btn-check'
								name='gender'
								value='father'
								id='btnradio1'
								onChange={handleChange}
								checked={parent.gender === 'father'}
							/>
							<label className='btn btn-outline-primary' for='btnradio1'>
								Father
							</label>

							<input
								type='radio'
								className='btn-check'
								name='gender'
								value='mother'
								id='btnradio2'
								onChange={handleChange}
								checked={parent.gender === 'mother'}
							/>
							<label className='btn btn-outline-primary' for='btnradio2'>
								Mother
							</label>

							<input
								type='radio'
								className='btn-check'
								name='gender'
								value='guardian'
								id='btnradio3'
								onChange={handleChange}
								checked={parent.gender === 'guardian'}
							/>
							<label className='btn btn-outline-primary' for='btnradio3'>
								Guardian
							</label>
						</div>
					</div>

					<button type='submit' className='btn btn-primary mt-3' style={{ width: 'fit-content' }}>
						Submit
					</button>
				</form>
			</div>
		</main>
	);
}

export default AddParent;
