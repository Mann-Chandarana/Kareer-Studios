import React from 'react';
import Modal from '../../Modal';
import ModalButton from '../../ModalButton';
import ViewfeedbackModal from '../../modals/feedbackModals/ViewfeedbackModal';

function ViewFeedback() {
	return (
		<>
			<main id='main' className='main'>
				<div className='pagetitle'>
					<h1>Dashboard</h1>
					<nav>
						<ol className='breadcrumb'>
							<li className='breadcrumb-item'>Dashboard</li>
							<li className='breadcrumb-item active'>Students</li>
						</ol>
					</nav>
				</div>

				<section className='section dashboard'>
					<div className='col-12'>
						<div className='card top-selling overflow-auto'>
							<div className='card-body pb-0'>
								<h5 className='card-title'>Feed back of students</h5>
								<table className='table table-bordered table-hover'>
									<thead>
										<tr>
											<>
												<th scope='col'>Student Id</th>
												<th scope='col'>Student Name</th>
												<th scope='col'>Student Email</th>
												<th scope='col'>Feedback</th>
											</>
										</tr>
									</thead>
									<tbody>
										<tr>
											<th scope='row'>1</th>
											<td>Mann Chandarana</td>
											<td>mannchandarana@gmail.com</td>
											<td>
												<Modal id={'view_s_feedback' + 1} large>
													<ViewfeedbackModal />
												</Modal>
												<ModalButton
													id={'view_s_feedback' + 1}
													className='btn btn-sm btn-info text-white'
												>
													View
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
}

export default ViewFeedback;
