const db = require('../db');

module.exports = {
    addStudent: async (name, email, phone, password) => {
        return db.query('INSERT INTO students (name, email, phone, password) VALUES ($1, $2, $3, $4)', [name, email, phone, password]);
    },
    getStudent: async (student_id) => {
        return db.query('SELECT * FROM students WHERE id=$1', [student_id]);
    }
};