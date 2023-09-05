const db = require('../db');
const student = require('./student');

module.exports = {
  addDocument: async (student_id, fileName, fileUrl, fileid) => {

    const filename = "doc" + fileid + "name";
    const fileurl = "doc" + fileid + "url";

    console.log(filename);
    console.log(fileurl);

    return db.query(
      `INSERT INTO documents (student_id, ${filename}, ${fileurl}) VALUES ($1, $2, $3)`,
      [student_id, fileName, fileUrl]
    );
  },
  getDocuments: async (student_id) => {
    return db.query('SELECT * FROM documents WHERE student_id = $1', [
      student_id,
    ]);
  },
  updateDocument: async (student_id, fileName, fileUrl, fileid) => {

    const filename = "doc" + fileid + "name";
    const fileurl = "doc" + fileid + "url";

    return db.query(
      `UPDATE documents SET ${filename}=$1, ${fileurl}=$2 WHERE student_id=$3`,
      [fileName, fileUrl, student_id]
    );
  },
};
