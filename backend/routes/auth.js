const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const encryptPassword = require('../utils/encryptPass');

const { verifyAdmin } = require('../middleware/verify');

const adminHandler = require('../handlers/admin');
const studentHandler = require('../handlers/student');
const parentHandler = require('../handlers/parent');
const counsellorHandler = require('../handlers/counsellor');


async function getUserData(email) {
    let result;
    result = await adminHandler.getAdminByEmail(email);
    if (result.rowCount > 0) {
        return { result, role: 'admin' };
    }

    result = await studentHandler.getStudentByEmail(email);
    if (result.rowCount > 0) {
        return { result, role: 'student' };
    }

    result = await parentHandler.getParentByEmail(email);
    if (result.rowCount > 0) {
        return { result, role: 'parent' };
    }

    result = await counsellorHandler.getCounsellorByEmail(email);
    if (result.rowCount > 0) {
        return { result, role: 'counsellor' };
    }

    return { result: null, role: null };
}



// Route-1 /api/auth/createUser --- for signup
router.post('/createUser', async (req, res) => {
    let { email, password, role } = req.body;
    if (!email || !password || !role) {
        return res.status(400).send({ error: "Invalid request body." });
    }
    try {
        // Create user
        role = role.toLowerCase();
        const encryptedPass = encryptPassword(password);
        if (role === "admin") {
            await adminHandler.addAdmin(email, encryptedPass);
        }
        else if (role === "student") {
            await studentHandler.addStudent(null, email, null, encryptedPass, null);
        }
        else if (role === "parent") {
            await parentHandler.addParent(null, email, encryptedPass);
        }
        else if (role === 'counsellor') {
            await counsellorHandler.addCounsellor(null, email, encryptedPass);
        } else {
            return res.status(400).send({ error: "Role should be one of 'admin', 'student', 'parent', 'counsellor'" });
        }

        res.status(202).json({ email, encryptedPass, role });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ error: err.message });
    }

});


// Route-2 /api/auth/login --- for login
router.post('/login', async (req, res) => {
    let { email, password } = req.body;
    console.log()
    if (!email || !password) {
        return res.status(400).send({ error: "Invalid request body." });
    }

    try {
        let { result, role } = await getUserData(email);
        console.log("Hello")

        if (!role) {
            return res.status(400).send({ error: "Role should be one of 'admin', 'student', 'parent', 'counsellor'" });
        }

        if (result.rowCount <= 0) {
            return res.status(401).json({ error: 'Wrong Credentials!' });
        }

        const user = result.rows[0];
        const isSame = await bcrypt.compare(password, user.password);


        if (!isSame) {
            return res.status(401).json({ error: 'Wrong Credentials!' });
        }

        if (role === 'student' && !user.paid) {
            return res.status(400).json({ error: 'Payment not done!' });
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
router.get('/verify', (req, res) => {
    const token = req.headers.authorization;

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).send({ error: err.message });
        }
        else {
            res.status(202).send(decoded);
        }
    });
});

router.get('/renew', (req, res) => {
    const token = req.headers.authorization;

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            res.status(401).send({ error: err.message });
        } else {
            let role = decoded.role.toLowerCase();
            let result;

            if (role === "admin") {
                result = await adminHandler.getAdminByEmail(decoded.email);
            }
            else if (role === "student") {
                result = await studentHandler.getStudentByEmail(decoded.email);
            }
            else if (role === "parent") {
                result = await parentHandler.getParentByEmail(decoded.email);
            }
            else if (role === 'counsellor') {
                result = await counsellorHandler.getCounsellorByEmail(decoded.email);
            } else {
                return res.status(400).send({ error: "Role should be one of 'admin', 'student', 'parent', 'counsellor'" });
            }

            if (result.rowCount <= 0) {
                return res.status(401).json({ error: 'Wrong Credentials!' });
            }

            const user = result.rows[0];
            user.role = role;
            delete user.password;

            const newAuthtoken = jwt.sign(user, process.env.JWT_SECRET);
            res.status(202).json({ token: newAuthtoken, user });

        }
    });
});

router.patch('/changepassword', (req, res) => {
    const token = req.headers.authorization;
    const { oldPassword, newPassword } = req.body;

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            res.status(401).send({ error: err.message });
        } else {
            let role = decoded.role.toLowerCase();
            let result;
            if (role === "admin") {
                result = await adminHandler.getAdminByEmail(decoded.email);
            }
            else if (role === "student") {
                result = await studentHandler.getStudentByEmail(decoded.email);
            }
            else if (role === "parent") {
                result = await parentHandler.getParentByEmail(decoded.email);
            }
            else if (role === 'counsellor') {
                result = await counsellorHandler.getCounsellorByEmail(decoded.email);
            } else {
                return res.status(400).send({ error: "Role should be one of 'admin', 'student', 'parent', 'counsellor'" });
            }

            if (result.rowCount <= 0) {
                return res.status(401).json({ error: 'Wrong Credentials!' });
            }

            const dbPassword = result.rows[0].password;

            const isSame = await bcrypt.compare(oldPassword, dbPassword);
            if (!isSame) {
                return res.status(401).json({ error: 'Incorrect Old Password!' });
            }

            const encryptedPass = encryptPassword(newPassword);

            if (role === "admin") {
                await adminHandler.changePassword(decoded.id, encryptedPass);
            }
            else if (role === "student") {
                await studentHandler.changePassword(decoded.id, encryptedPass);
            }
            else if (role === "parent") {
                await parentHandler.changePassword(decoded.id, encryptedPass);
            }
            else if (role === 'counsellor') {
                await counsellorHandler.changePassword(decoded.id, encryptedPass);
            }


            res.status(202).json({ message: 'Password Updated!' });

        }
    });
});

router.patch('/editprofile', async (req, res) => {
    try {
        const token = req.headers.authorization;
        const newProfile = req.body;

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            let role = decoded.role.toLowerCase();
            if (err) {
                return res.status(401).send({ error: err.message });
            }
            const id = decoded.id;

            if (role === 'admin') {
                await adminHandler.updateAdmin(id, newProfile);
            } else if (role === 'counsellor') {
                await counsellorHandler.updateCounsellor(id, newProfile);
            } else if (role === 'student') {
                await studentHandler.updateStudent(id, newProfile);
            } else if (role === 'parent') {
                await parentHandler.updateParent(id, newProfile);
            }
            res.status(202).json({ message: 'Profile Updated!' });
        });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

module.exports = router;