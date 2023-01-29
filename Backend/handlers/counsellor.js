const db = require('../db');

module.exports = {
    addCounsellor: async (name, email, password) => {
        return db.query('INSERT INTO counesllors (name, email, password) VALUES ($1, $2, $3)', [name, email, password]);
    },
    getCounsellor: async (counsellor_id) => {
        return db.query('SELECT * FROM counesllors WHERE id=$1', [counsellor_id]);
    },
    getCounsellorByEmail: async (email) => {
        return db.query('SELECT * FROM counesllors WHERE email=$1', [email]);
    }
};