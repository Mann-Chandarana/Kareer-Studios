const db = require('../db');

module.exports = {
    getAllCounsellors: async () => {
        return db.query('SELECT counsellors.*, COUNT(counsellors.id) AS number_of_students FROM counsellors LEFT JOIN students ON (counsellors.id = students.counsellor_id) GROUP BY counsellors.id');
    },
    addCounsellor: async (name, email, password, salary = 0, phone = "") => {
        return db.query('INSERT INTO counsellors (name, email, password, salary, phone) VALUES ($1, $2, $3, $4, $5)', [name, email, password, salary, phone]);
    },
    getCounsellor: async (counsellor_id) => {
        return db.query('SELECT * FROM counsellors WHERE id=$1', [counsellor_id]);
    },
    getCounsellorByEmail: async (email) => {
        return db.query('SELECT * FROM counsellors WHERE email=$1', [email]);
    },
    deleteCounsellor: async (id) => {
        return db.query('DELETE FROM counsellors WHERE id=$1', [id]);
    },
    changePassword: async (id, newPassword) => {
        return db.query('UPDATE counsellor SET password=$1 WHERE id=$2', [newPassword, id]);
    }
};