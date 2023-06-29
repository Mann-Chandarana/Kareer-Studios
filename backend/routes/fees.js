
const express = require("express");
const { verifyStudents } = require("../middleware/verify");
const router = express.Router();
const receiptHandler = require('../handlers/receipt');

router.get('/:id', verifyStudents, async (req, res) => {
    const student_id = req.params.id;

    try {
        const { rowCount, rows } = await receiptHandler.getReceipt(student_id);
        if (rowCount < 0) {
            res.status(404).json({ error: "No receipt found" });
        }
        else {
            res.status(200).json({ rowCount, rows });
        }

    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

module.exports = router;