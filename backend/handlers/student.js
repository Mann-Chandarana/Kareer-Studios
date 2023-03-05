const db = require('../db');

module.exports = {
    getStudentbycounsellorid: async (counsellor_id) => {
        return db.query('SELECT * FROM students WHERE counsellor_id = $1', [counsellor_id]);
    },
    getStudentbyparentid: async (parent_id) => {
        return db.query('SELECT * FROM students WHERE id IN (SELECT student_id FROM parents WHERE id =$1)', [parent_id]);
    },
    getCounsellor: async (student_id) => {
        return db.query('SELECT * FROM counsellors WHERE id IN (SELECT counsellor_id FROM students WHERE id = $1)', [student_id]);
    },
    setValidStudent: async (email) => {
        return db.query('UPDATE students SET paid = TRUE WHERE email =$1', [email]);
    },
    addStudent: async (name, email, phone, password, counsellor_id, paid = false) => {
        return db.query('INSERT INTO students (name, email, phone, password, counsellor_id, paid) VALUES ($1, $2, $3, $4, $5, $6)', [name, email, phone, password, counsellor_id, paid]);
    },
    getStudent: async (student_id) => {
        return db.query('SELECT * FROM students WHERE id=$1', [student_id]);
    },
    getStudentByEmail: async (email) => {
        return db.query('SELECT * FROM students WHERE email=$1', [email]);
    },
    getAllStudents: async () => {
        return db.query('SELECT students.*, counsellors.name AS counsellor_name FROM students LEFT JOIN counsellors ON (students.counsellor_id = counsellors.id)');
    },
    deleteStudent: async (student_id) => {
        return db.query('DELETE FROM students WHERE id=$1', [student_id]);
    }
};