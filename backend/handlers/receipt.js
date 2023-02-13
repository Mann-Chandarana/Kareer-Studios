const db = require('../db');

module.exports = {
    addReceipt: async (payment_id, student_id, pdfBuffer) => {
        return db.query('INSERT INTO receipts (id, student_id, pdf) VALUES ($1, $2, $3)', [payment_id, student_id, pdfBuffer]);
    },
    getReceipt: async (id) => {
        return db.query('SELECT * FROM receipts WHERE student_id = $1', [id]);
    }
};