const db = require('../db');

module.exports = {
    addAdmin: async (email, password) => {
        return db.query("INSERT INTO admins (email,password) values ($1,$2)", [email, password]);
    },
    getAdminByEmail: async (email) => {
        return db.query('SELECT * FROM admins WHERE email=$1', [email]);
    },
    changePassword: async (id, newPassword) => {
        return db.query('UPDATE admins SET password=$1 WHERE id=$2', [newPassword, id]);
    },
    updateAdmin: async (id, newAdmin) => {
        const { name } = newAdmin;
        return db.query('UPDATE admins SET name=$1 WHERE id=$2', [name, id]);
    }
};