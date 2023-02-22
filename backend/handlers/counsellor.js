const db = require('../db');

module.exports = {
    getAllCounsellors: async () => {
        return db.query('SELECT * FROM counsellors');
    },
    addCounsellor: async (name, email, password) => {
        return db.query('INSERT INTO counsellors (name, email, password) VALUES ($1, $2, $3)', [name, email, password]);
    },
    getCounsellor: async (counsellor_id) => {
        return db.query('SELECT * FROM counsellors WHERE id=$1', [counsellor_id]);
    },
    getCounsellorByEmail: async (email) => {
        return db.query('SELECT * FROM counsellors WHERE email=$1', [email]);
    },
    deleteCounsellor: async (id) => {
        return db.query('DELETE FROM counsellors WHERE id=$1', [id]);
    }
};