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
    },
    updateStudent: async (student_id, newStudent) => {
        const { name, email, counsellor_id, phone, whatsapp, city, address, pincode, parent_added, gender, paid } = newStudent;

        return db.query('UPDATE students SET name=$2, email=$3, counsellor_id=$4, phone=$5, whatsapp=$6, city=$7, address=$8, pincode=$9, parent_added=$10, gender=$11, paid=$12 WHERE id=$1', [student_id, name, email, counsellor_id, phone, whatsapp, city, address, pincode, parent_added, gender, paid]);
    },
    setAddParent: async (email) => {
        return db.query('UPDATE students SET parent_added = TRUE WHERE email =$1', [email]);
    },
    changePassword: async (id, newPassword) => {
        return db.query('UPDATE students SET password=$1 WHERE id=$2', [newPassword, id]);
    }
};