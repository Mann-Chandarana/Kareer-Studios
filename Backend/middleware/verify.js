const jwt = require('jsonwebtoken');


/***** Verify Students  *****/

const verifyStudents = (req, res, next) => {
    const { token } = req.body;
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).send({ error: err.message });
        } else {
            if (decoded.role === 'student') {
                req.user = decoded;
                next();
            } else {
                res.status(403).send({ error: 'Unauthorized!' });
            }
        }
    });
};

/***** Verify Parents  *****/

const verifyParents = (req, res, next) => {
    const { token } = req.body;
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).send({ error: err.message });
        } else {
            if (decoded.role === 'parent') {
                req.user = decoded;
                next();
            } else {
                res.status(403).send({ error: 'Unauthorized!' });
            }
        }
    });
};

/***** Verify Counsellors  *****/

const verifyCounsellors = (req, res, next) => {
    const { token } = req.body;
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).send({ error: err.message });
        } else {
            if (decoded.role === 'counsellor') {
                req.user = decoded;
                next();
            } else {
                res.status(403).send({ error: 'Unauthorized!' });
            }
        }
    })
}

/***** Verify Admin  *****/

const verifyAdmin = (req, res, next) => {
    const { token } = req.body;
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).send({ error: err.message });
        } else {
            if (decoded.role === 'admin') {
                req.user = decoded;
                next();
            } else {
                res.status(403).send({ error: 'Unauthorized!' })
            }
        }
    })
}

module.exports = { verifyStudents, verifyParents,verifyCounsellors,verifyAdmin };