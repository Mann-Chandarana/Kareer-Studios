const db = require('../db');

module.exports = {
    getAllCounsellors: async () => {
        return db.query('SELECT counsellors.*, COUNT(students.id) AS number_of_students FROM counsellors LEFT JOIN students ON (counsellors.id = students.counsellor_id) GROUP BY counsellors.id');
    },
    addCounsellor: async (name, email, password, salary = 0, phone = '') => {
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
        return db.query('UPDATE counsellors SET password=$1 WHERE id=$2', [newPassword, id]);
    },
    updateCounsellor: async (id, newCounsellor) => {
        const { name, salary, address, phone, qualifiction, bank_name, bank_ifsc, bank_micr, bank_ac } = newCounsellor;
        const experience = newCounsellor.experience || 0;
        return db.query('UPDATE counsellors SET name=$1, salary=$2, address=$3, phone=$4, experience=$5, qualifiction=$6, bank_name=$7, bank_ifsc=$8, bank_micr=$9, bank_ac=$10 WHERE id=$11', [name, parseInt(salary), address, phone, parseInt(experience), qualifiction, bank_name, bank_ifsc, bank_micr, bank_ac, id]);
    },
};
