const db = require('../db');
const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const admin_Handler = require('../handlers/Admin');
const student_Handler = require('../handlers/student');
const parent_Handler = require('../handlers/parent');
const counsellor_Handler = require('../handlers/counsellor');



// Route-1 /api/auth/createUser --- for signup

router.post('/createUser', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ error: "Invalid request body." });
    }
    try {
        const results = await admin_Handler.getAdminByEmail(email);

        if (results.rowCount > 0) {
            return res.status(409).json({ error: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const encryptedPass = await bcrypt.hash(req.body.password, salt);

        // Create user
        await admin_Handler(email, encryptedPass);

        const data = {
            email,
            role: "admin"
        };

        const authtoken = jwt.sign(data, process.env.JWT_SECRET);
        res.json({ authtoken });
    } catch (err) {
        console.log("Hello");
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
            result = await admin_Handler.getAdminByEmail(email);
        }
        else if (role === "student") {
            result = await student_Handler.getStudentByEmail(email);
        }
        else if (role === "parent") {
            result = await parent_Handler.getParentByEmail(email);
        }
        else if (role === 'consellor') {
            result = await counsellor_Handler.getCounsellorByEmail(email);
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
        res.status(202).json({ token: authtoken });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({ error: err.message });
    }
});


// Route -3 /api/auth/verify --- for token verification

router.post('/verify', (req, res) => {
    const { token } = req.body;

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).send({ error: err.message });
        }
        else {
            res.status(202).send({ ...decoded });
        }
    });
});

module.exports = router;