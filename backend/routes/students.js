const express = require('express');
const router = express.Router();

const { verifyAdmin, verifyCounsellors } = require('../middleware/verify');
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

// Getting student by parent id

router.get('/parent/:parent_id', async (req, res) => {
    try {
        const { rowCount, rows } = await studentHandler.getStudentbyparentid(req.params.parent_id);

        if (rowCount <= 0) {
            res.status(404).json({ error: 'No student found !' });
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
        console.log(paid);

        // generate password
        const password = generatePassword({ length: 8, lowercase: true, uppercase: true, numbers: true, symbols: false });
        const encryptedPass = await encryptPassword(password);

        await studentHandler.addStudent(name, email, phone, encryptedPass, counsellor_id, paid);

        await emailService.sendEmail(email, 'Email and Passwords', JSON.stringify({ email, password }));

        res.status(202).send({ message: 'Student Created!' });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// Getting student using counsellor id in counsellor dashboard

router.get('/counsellor/:counsellor_id', verifyCounsellors, async (req, res) => {
    try {
        const { rowCount, rows } = await studentHandler.getStudentbycounsellorid(req.params.counsellor_id);
        const data = rows.map(row => {
            delete row.password;
            return row;
        });

        res.status(200).json({ rowCount, rows: data });

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// UPDATE student
router.patch('/:id', verifyCounsellors, async (req, res) => {
    const { id } = req.params;

    try {
        const newStudent = req.body;
        await studentHandler.updateStudent(id, newStudent);
        res.status(200).send({ message: 'Updated Student!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// DELETE parent
router.delete('/:id', verifyAdmin, async (req, res) => {
    const { id } = req.params;

    try {
        await studentHandler.deleteStudent(id);
        res.status(200).send({ message: 'Delete Student!' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: err.message });
    }
});


module.exports = router;