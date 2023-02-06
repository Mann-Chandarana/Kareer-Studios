const db = require('../db');

module.exports = {
    addReceipt: async (id, pdfBuffer) => {
        return db.query('INSERT INTO receipts (student_id, pdf) VALUES ($1, $2)', [id, pdfBuffer]);
    },
    getReceipt: async (id) => {
        return db.query('SELECT * FROM receipts WHERE student_id = $1', [id]);
    }
};