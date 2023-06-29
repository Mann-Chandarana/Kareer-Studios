const db = require('../db');
const student = require('./student');

module.exports = {
  addProgram: async (student_id, fileName, fileUrl) => {
    return db.query(
      'INSERT INTO suggested_programs (student_id, filename, fileurl) VALUES ($1, $2, $3)',
      [student_id, fileName, fileUrl]
    );
  },
  getPrograms: async (student_id) => {
    return db.query('SELECT * FROM suggested_programs WHERE student_id = $1', [
      student_id,
    ]);
  },
  updateProgram: async (student_id, fileName, fileUrl) => {
    return db.query(
      'UPDATE suggested_programs SET filename=$1, fileurl=$2 WHERE student_id=$3',
      [fileName, fileUrl, student_id]
    );
  },
};
