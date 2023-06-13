const db = require('../db');

module.exports = {
	getallfeedback: async (counsellor_id) => {
		return db.query('SELECT * FROM student_feedbacks sd FULL OUTER JOIN students s ON sd.student_id=s.id where sd.counsellor_id =$1', [counsellor_id]);
	},
	getcounsellorfeedback:async(counsellor_id)=>{
		return db.query('SELECT cf.id,cf.student_id,cf.counsellor_id,cf.performance,cf.comments,cf.status,cf.start_date,s.name,s.email,s.gender,s.phone FROM counsellor_feedbacks cf FULL OUTER JOIN students s on cf.student_id=s.id where cf.counsellor_id=$1',[counsellor_id])
	},
	addcounsellorfeedback:async(counsellor_id,student_id,performance,comments,status,start_date)=>{
		return db.query(
			'INSERT INTO counsellor_feedbacks (counsellor_id,student_id,performance,comments,status,start_date) VALUES ($1,$2,$3,$4,$5,$6)',
			[counsellor_id,student_id,performance,comments,status,start_date]
		);
	},
	updatecounsellorfeedback:async(id,performance,comments,status,start_date)=>{
		return db.query(
			'UPDATE counsellor_feedbacks SET performance=$1,comments=$2,status=$3,start_date=$4 where id=$5',[performance,comments,status,start_date,parseInt(id)]
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
