const db = require('../db');

module.exports = {
	getallfeedback: async (counsellor_id) => {
		return db.query('SELECT * FROM student_feedbacks sd FULL OUTER JOIN students s ON sd.student_id=s.id where sd.counsellor_id =$1', [counsellor_id]);
	},
	getcounsellorfeedback:async(counsellor_id)=>{
		return db.query('SELECT cf.id,cf.student_id,cf.counsellor_id,cf.performance,cf.planning,cf.feedback,s.name,s.email,s.gender FROM counsellor_feedbacks cf FULL OUTER JOIN students s on cf.student_id=s.id where cf.counsellor_id=$1',[counsellor_id])
	},
	addcounsellorfeedback:async(counsellor_id,student_id,performance,planning,feedback)=>{
		return db.query(
			'INSERT INTO counsellor_feedbacks (counsellor_id,student_id,performance,planning,feedback) VALUES ($1,$2,$3,$4,$5)',
			[counsellor_id,student_id,performance,planning,feedback]
		);
	},
	updatecounsellorfeedback:async(id,performance,planning,feedback)=>{
		return db.query(
			'UPDATE counsellor_feedbacks SET performance=$1,planning=$2,feedback=$3 where id=$4',[performance,planning,feedback,parseInt(id)]
		)
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
