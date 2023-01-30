const db = require('../db');
const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const adminHandler = require('../handlers/admin');
const studentHandler = require('../handlers/student');
const parentHandler = require('../handlers/parent');
const counsellorHandler = require('../handlers/counsellor');



// Route-1 /api/auth/createUser --- for signup

router.post('/createUser', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ error: "Invalid request body." });
    }
    try {
        const { rowCount } = await adminHandler.getAdminByEmail(email);

        if (rowCount > 0) {
            return res.status(409).json({ error: 'User already exists' });
        }

        const encryptedPass = await bcrypt.hash(req.body.password, 10);

        // Create user
        await adminHandler.addAdmin(email, encryptedPass);

        res.status(202).json({ email, encryptedPass });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ error: err.message });
    }

});


// Route-2 /api/auth/login --- for login
router.post('/login', async (req, res) => {
    let { email, password, role } = req.body;
    if (!email || !password || !role) {
        return res.status(400).send({ error: "Invalid request body." });
    }

    try {
        let result;
        role = role.toLowerCase();

        if (role === "admin") {
            result = await adminHandler.getAdminByEmail(email);
        }
        else if (role === "student") {
            result = await studentHandler.getStudentByEmail(email);
        }
        else if (role === "parent") {
            result = await parentHandler.getParentByEmail(email);
        }
        else if (role === 'counsellor') {
            result = await counsellorHandler.getCounsellorByEmail(email);
        } else {
            return res.status(400).send({ error: "Role should be one of 'admin', 'student', 'parent', 'counsellor'" });
        }


        if (result.rowCount <= 0) {
            return res.status(401).json({ error: 'Wrong Credentials!' });
        }

        const user = result.rows[0];
        const isSame = await bcrypt.compare(password, user.password);
        if (!isSame) {
            return res.status(400).json({ error: 'Wrong Credentials!' });
        }

        user.role = role;
        delete user.password;

        const authtoken = jwt.sign(user, process.env.JWT_SECRET);
        res.cookie('token', authtoken);
        res.status(202).json({ token: authtoken });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({ error: err.message });
    }
});


// Route -3 /api/auth/verify --- for token verification
router.get('/verify', (req, res) => {
    const { token } = req.cookies;

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).send({ error: err.message });
        }
        else {
            res.status(202).send(decoded);
        }
    });
});

router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).end();
});

module.exports = router;