const db = require('../db');

module.exports = {
    getParentbystudentid: async (student_id) => {
        return db.query('SELECT * FROM parents WHERE student_id=$1', [student_id]);
    },
    addParent: async (name, email, password, gender, student_id) => {
        return db.query('INSERT INTO parents (name, email, password, gender, student_id) VALUES ($1, $2, $3, $4, $5)', [name, email, password, gender, student_id]);
    },
    getParent: async (parent_id) => {
        return db.query('SELECT * FROM parents WHERE id=$1', [parent_id]);
    },
    getParentByEmail: async (email) => {
        return db.query('SELECT * FROM parents WHERE email=$1', [email]);
    },
    getAllParents: async () => {
        return db.query('SELECT * FROM parents');
    },
    deleteParent: async (parent_id) => {
        return db.query('DELETE FROM parents WHERE id=$1', [parent_id]);
    },
    changePassword: async (id, newPassword) => {
        return db.query('UPDATE parents SET password=$1 WHERE id=$2', [newPassword, id]);
    }
};