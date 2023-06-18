const db = require("../db");

module.exports = {
  getallfeedback: async (counsellor_id) => {
    return db.query(
      "SELECT * FROM student_feedbacks sd FULL OUTER JOIN students s ON sd.student_id=s.id where sd.counsellor_id =$1",
      [counsellor_id]
    );
  },
  getcounsellorfeedback: async (counsellor_id) => {
    return db.query(
      "SELECT cf.id,cf.student_id,cf.counsellor_id,cf.performance,cf.comments,cf.status,cf.start_date,cf.pdf,s.name,s.email,s.gender,s.phone FROM counsellor_feedbacks cf FULL OUTER JOIN students s on cf.student_id=s.id where cf.counsellor_id=$1",
      [counsellor_id]
    );
  },
  addcounsellorfeedback: async (
    counsellor_id,
    student_id,
    performance,
    comments,
    status,
    start_date,
    pdf
  ) => {
    return db.query(
      "INSERT INTO counsellor_feedbacks (counsellor_id,student_id,performance,comments,status,start_date,pdf) VALUES ($1,$2,$3,$4,$5,$6,$7)",
      [
        counsellor_id,
        student_id,
        performance,
        comments,
        status,
        start_date,
        pdf,
      ]
    );
  },

  /* Update in counsellor table in give feedback */
  updatecounsellorfeedback: async (
    id,
    performance,
    comments,
    status,
    start_date
  ) => {
    return db.query(
      "UPDATE counsellor_feedbacks SET performance=$1,comments=$2,status=$3,start_date=$4 where id=$5",
      [performance, comments, status, start_date, parseInt(id)]
    );
  },

  updateStudentFeedback:async(id,comment,date)=>{
    return db.query("UPDATE student_feedbacks SET comment=$1,date=$2 where id=$3",[comment,date,id]);
  },

  addStudentFeedback: async (student_id, counsellor_id, comment, date) => {
    return db.query(
      "INSERT INTO student_feedbacks (student_id, counsellor_id, comment, date) VALUES ($1, $2, $3, $4)",
      [student_id, counsellor_id, comment, date]
    );
  },
  getCounsellorFeedback: async (student_id) => {
    return db.query("SELECT * FROM counsellor_feedbacks WHERE student_id=$1", [
      student_id,
    ]);
  },
  increaseMessage: async (student_id) => {
    return db.query("SELECT messages from students WHERE id=$1", [student_id]);
  },
  updateStudentmessage: async (student_id, message) => {
    const value = message + 1;
    return db.query("UPDATE students SET messages=$1 WHERE id=$2", [
      value,
      student_id,
    ]);
  },

  /* For student notification */

  messageclear: async (student_id) => {
    const value = 0;
    return db.query("UPDATE students SET messages=$1 where id=$2", [
      value,
      student_id,
    ]);
  },
  
  /* For delete feedback from counsellor/giveFeedback */

  deleteFeedback: async (id) => {
    return db.query("DELETE FROM counsellor_feedbacks WHERE id=$1", [id]);
  },

  /* Student :- Give Feedback */

  getStudFeedback:async(student_id)=>{
    return db.query("SELECT sf.id,sf.student_id,sf.counsellor_id,sf.comment,sf.date,sf.pdf FROM student_feedbacks sf FULL OUTER JOIN students s on sf.student_id=s.id WHERE sf.student_id=$1 ",[student_id])
  },

  deleteFeedbackStudent:async (id)=>{
    return db.query("DELETE FROM student_feedbacks where id=$1",[id])
  }
};
