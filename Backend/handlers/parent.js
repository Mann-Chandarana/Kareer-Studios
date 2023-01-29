const db = require('../db');

module.exports = {
    addParent: async (name, email, password) => {
        return db.query('INSERT INTO parents (name, email, password) VALUES ($1, $2, $3)', [name, email, password]);
    },
    getParent: async (parent_id) => {
        return db.query('SELECT * FROM parents WHERE id=$1', [parent_id]);
    }
};