import React from 'react';
import Modal from '../../Modal';
import ModalButton from '../../ModalButton';
import AddFeedback from '../../modals/feedbackModals/AddFeedback';
import EditFeedback from '../../modals/feedbackModals/EditFeedback';
import { SearchMenu } from '../../SearchMenu';

const GiveFeedback = () => {
	return (
		<>
			<Modal id='add-feedback'>
				<AddFeedback />
			</Modal>
			<main id='main' className='main'>
				<div className='pagetitle'>
					<h1>Dashboard</h1>
					<nav>
						<ol className='breadcrumb'>
							<li className='breadcrumb-item'>Dashboard</li>
							<li className='breadcrumb-item'>Feedback</li>
							<li className='breadcrumb-item active'>Give feedback</li>
						</ol>
					</nav>
				</div>

				<section className='section dashboard'>
					<div className='col-12'>
						<div className='card top-selling overflow-auto'>
							<div className='filter d-flex align-items-center'>
								<SearchMenu />
								<ModalButton id='add-feedback' className='btn btn-success btn-sm mx-4 text-white'>
									Add Feedback
								</ModalButton>
							</div>
							<div className='card-body pb-0'>
								<h5 className='card-title'>
									Add Feedback of students
									<br />
								</h5>
								<table className='table table-bordered table-hover'>
									<thead>
										<tr>
											<th scope='col'>ID</th>
											<th scope='col'>Name</th>
											<th scope='col'>Email</th>
											<th scope='col'>Parent of Student ID</th>
											<th scope='col'>Edit</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<th scope='row'>1</th>
											<td>Mann Chandarana</td>
											<td>mannchandarana@gmail</td>
											<td className='fw-bold'>1</td>
											<td>
												<Modal id={'edit_s_feededit' + 1}>
													<EditFeedback />
												</Modal>
												<ModalButton id={'edit_s_feededit' + 1} className='icon'>
													<i className='fa-solid fa-pen-to-square'></i>
												</ModalButton>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
};

export default GiveFeedback;
