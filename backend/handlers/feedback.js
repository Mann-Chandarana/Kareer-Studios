const db = require('../db');

module.exports = {
    addStudentFeedback: async (student_id, counsellor_id, referal, rating, overall_exp) => {
        return db.query('INSERT INTO student_feedbacks (student_id, counsellor_id, referral, rating, overall_experience) VALUES ($1, $2, $3, $4, $5)', [student_id, counsellor_id, referal, rating, overall_exp]);
    }
};