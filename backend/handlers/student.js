const db = require('../db');

module.exports = {
    getStudentbycounsellorid: async (counsellor_id) => {
        return db.query('SELECT * FROM students LEFT JOIN suggested_programs ON (students.id = suggested_programs.student_id)  WHERE counsellor_id = $1', [counsellor_id]);
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
    updateStudent: async (id, newStudent) => {
        const { name, counsellor_id, phone, whatsapp, city, address, pincode, parent_added, gender, paid } = newStudent;

        return db.query('UPDATE students SET name=$2, counsellor_id=$3, phone=$4, whatsapp=$5, city=$6, address=$7, pincode=$8, parent_added=$9, gender=$10, paid=$11 WHERE id=$1', [id, name, counsellor_id, phone, whatsapp, city, address, pincode, parent_added, gender, paid]);
    },
    setAddParent: async (email) => {
        return db.query('UPDATE students SET parent_added = TRUE WHERE email =$1', [email]);
    },
    changePassword: async (id, newPassword) => {
        return db.query('UPDATE students SET password=$1 WHERE id=$2', [newPassword, id]);
    },
};
