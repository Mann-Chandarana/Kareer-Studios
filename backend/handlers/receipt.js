const db = require('../db');

module.exports = {
    addReceipt: async (payment_id, student_id, amount, pdfBuffer) => {
        return db.query('INSERT INTO receipts (id, student_id, amount, pdf) VALUES ($1, $2, $3, $4)', [payment_id, student_id, amount, pdfBuffer]);
    },
    getReceipt: async (id) => {
        return db.query('SELECT * FROM receipts WHERE student_id = $1', [id]);
    }
};