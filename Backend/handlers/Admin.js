const db = require('../db');

module.exports = {
    addAdmin: async (email, password) => {
        db.query("INSERT INTO admins (email,password) values ($1,$2)", [email, password]);
    },
    getAdminByEmail: async (email) => {
        return db.query('SELECT * FROM admins WHERE email=$1', [email]);
    }
};