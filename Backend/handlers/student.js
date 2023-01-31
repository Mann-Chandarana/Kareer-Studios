const db = require('../db');

module.exports = {
    addStudent: async (name, email, phone, password, counsellor_id) => {
        return db.query('INSERT INTO students (name, email, phone, password, counsellor_id) VALUES ($1, $2, $3, $4, $5)', [name, email, phone, password, counsellor_id]);
    },
    getStudent: async (student_id) => {
        return db.query('SELECT * FROM students WHERE id=$1', [student_id]);
    },
    getStudentByEmail: async (email) => {
        return db.query('SELECT * FROM students WHERE email=$1', [email]);
    }
};