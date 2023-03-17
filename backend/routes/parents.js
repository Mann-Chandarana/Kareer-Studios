const express = require('express');
const router = express.Router();

const { verifyAdmin, verifyStudents } = require('../middleware/verify');
const parentHandler = require('../handlers/parent');
const studentHandler = require('../handlers/student');
const encryptPassword = require('../utils/encryptPass');
const generatePassword = require('../utils/passwordGen');
const emailService = require('../services/nodemailer');


// GET all parents
router.get('/', verifyAdmin, async (req, res) => {
    try {
        const { rowCount, rows } = await parentHandler.getAllParents();
        const data = rows.map(row => {
            delete row.password;
            return row;
        });

        res.status(200).json({ rowCount, rows: data });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// Getting parent by student id

router.get('/student/:student_id', verifyStudents, async (req, res) => {
    try {
        const { rowCount, rows } = await parentHandler.getParentbystudentid(req.params.student_id);
        if (rowCount <= 0) {
            res.status(404).json({ error: 'Parent not found !' });
            return;
        }
        else {
            delete rows[0].password;
            res.status(200).json({ rowCount, rows: rows });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


// GET parent by id
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const { rowCount, rows } = await parentHandler.getParent(id);
        const data = rows.map(row => {
            delete row.password;
            return row;
        });

        if (rowCount <= 0) {
            res.status(404).json({ error: 'Parent not found!' });
            return;
        }

        res.status(200).json(data[0]);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// CREATE parent
router.post('/', verifyStudents, async (req, res) => {
    try {
        const { name, email, student_id, gender } = req.body;

        // generate password
        const password = generatePassword({ length: 8, lowercase: true, uppercase: true, numbers: true, symbols: false });
        const encryptedPass = await encryptPassword(password);
        const student = req.user;

        await parentHandler.addParent(name, email, encryptedPass, gender, student_id);
        await studentHandler.setAddParent(student.email);

        await emailService.sendEmail(email, 'Email and Passwords', JSON.stringify({ email, password }));

        res.status(202).send({ message: 'Parent Created!' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err.message });
    }
});


// UPDATE parent
router.patch('/:id', (req, res) => {

});


// DELETE parent
router.delete('/:id', verifyAdmin, async (req, res) => {
    const { id } = req.params;

    try {
        await parentHandler.deleteParent(id);
        res.status(200).send({ message: 'Delete Parent!' });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});


module.exports = router;