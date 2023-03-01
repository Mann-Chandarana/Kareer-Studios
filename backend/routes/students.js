const express = require('express');
const router = express.Router();

const { verifyAdmin } = require('../middleware/verify');
const studentHandler = require('../handlers/student');
const generatePassword = require('../utils/passwordGen');
const encryptPassword = require('../utils/encryptPass');
const emailService = require('../services/nodemailer');


// GET all parents
router.get('/', verifyAdmin, async (req, res) => {
    try {
        const { rowCount, rows } = await studentHandler.getAllStudents();
        const data = rows.map(row => {
            delete row.password;
            return row;
        });

        res.status(200).json({ rowCount, rows: data });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});


// GET parent by id
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const { rowCount, rows } = await studentHandler.getStudent(id);
        const data = rows.map(row => {
            delete row.password;
            return row;
        });

        if (rowCount <= 0) {
            res.status(404).json({ error: 'Student not found!' });
            return;
        }

        res.status(200).json(data[0]);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// CREATE student
router.post('/', verifyAdmin, async (req, res) => {
    try {
        const { counsellor_id, email, name, paid, phone } = req.body;

        // generate password
        const password = generatePassword({ length: 8, lowercase: true, uppercase: true, numbers: true, symbols: false });
        const encryptedPass = await encryptPassword(password);

        await studentHandler.addStudent(name, email, phone, encryptedPass, counsellor_id);

        await emailService.sendEmail(email, 'Email and Passwords', JSON.stringify({ email, password }));

        res.status(202).send({ message: 'Student Created!' });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});


// UPDATE student
router.patch('/:id', (req, res) => {

});


// DELETE parent
router.delete('/:id', verifyAdmin, async (req, res) => {
    const { id } = req.params;

    try {
        const data = await studentHandler.deleteStudent(id);
        console.log(data);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});


module.exports = router;