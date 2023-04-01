const db = require('../db');

module.exports = {
	getallfeedback: async (counsellor_id) => {
		console.log('Hello');
		return db.query('SELECT * FROM counsellors where id =$1', [counsellor_id]);
	},
	addStudentFeedback: async (student_id, counsellor_id, referal, rating, overall_exp) => {
		return db.query(
			'INSERT INTO student_feedbacks (student_id, counsellor_id, referral, rating, overall_experience) VALUES ($1, $2, $3, $4, $5)',
			[student_id, counsellor_id, referal, parseInt(rating), overall_exp]
		);
	},
	getCounsellorFeedback: async (student_id) => {
		return db.query('SELECT * FROM counsellor_feedbacks WHERE student_id=$1', [student_id]);
	},
};
