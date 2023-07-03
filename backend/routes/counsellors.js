const express = require('express');
const router = express.Router();

const { verifyAdmin, verifyStudents } = require('../middleware/verify');
const counsellorHandler = require('../handlers/counsellor');
const student = require('../handlers/student');
const encryptPassword = require('../utils/encryptPass');
const generatePassword = require('../utils/passwordGen');
const emailService = require('../services/nodemailer');

// Getting counsellor by student id

router.get('/student/:student_id', verifyStudents, async (req, res) => {
    try {
        const { rowCount, rows } = await student.getCounsellor(req.params.student_id);

        if (rowCount <= 0) {
            res.status(404).json({ error: 'Counsellor not found!' });
            return;
        } else {
            delete rows[0].password;
            res.status(200).json({ rowCount, rows: rows });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// GET all counsellors
router.get('/', verifyAdmin, async (req, res) => {
    try {
        const { rowCount, rows } = await counsellorHandler.getAllCounsellors();
        const data = rows.map((row) => {
            delete row.password;
            return row;
        });

        ///

        res.status(200).json({ rowCount, rows: data });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// GET counsellor by id
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const { rowCount, rows } = await counsellorHandler.getCounsellor(id);
        const data = rows.map((row) => {
            delete row.password;
            return row;
        });

        if (rowCount <= 0) {
            res.status(404).json({ error: 'Counsellor not found!' });
            return;
        }

        res.status(200).json(data[0]);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// CREATE counsellor
router.post('/', verifyAdmin, async (req, res) => {
    try {
        const { name, email, phone, salary } = req.body;

        // generate password
        const password = generatePassword({ length: 8, lowercase: true, uppercase: true, numbers: true, symbols: false });
        const encryptedPass = await encryptPassword(password);

        await counsellorHandler.addCounsellor(name, email, encryptedPass, salary, phone);

        await emailService.sendEmail(email, 'Email and Passwords', JSON.stringify({ email, password }));

        res.status(202).send({ message: 'Counsellor Created!' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err.message });
    }
});

// UPDATE counsellor
router.patch('/:id', verifyAdmin, async (req, res) => {
    const { id } = req.params;

    try {
        console.log(newCounsellor);
        const newCounsellor = req.body;
        await counsellorHandler.updateCounsellor(id, newCounsellor);
        res.status(200).send({ message: 'Updated Counsellor!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE counsellor
router.delete('/:id', verifyAdmin, async (req, res) => {
    const { id } = req.params;

    try {
        await counsellorHandler.deleteCounsellor(id);
        res.status(200).send({ message: 'Delete Counsellor!' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err.message });
    }
});

module.exports = router;
