const express = require('express');
const router = express.Router();

const { verifyAdmin, verifyStudents } = require('../middleware/verify');
const counsellorHandler = require('../handlers/counsellor');
const student = require('../handlers/student');

// Getting counsellor by student id

router.get('/counsellor/:student_id', verifyStudents, async (req, res) => {
    try {
        const { rowCount, rows } = await student.getCounsellor(req.params.student_id);

        if (rowCount <= 0) {
            res.status(404).json({ error: 'Counsellor not found!' })
            return;
        }
        else {
            delete rows[0].password;
            res.status(200).json({ rowCount, rows: rows[0] });
        }
    } catch (err) {
        res.status(500).send({error:err.message});
    }
})

// GET all counsellors
router.get('/', verifyAdmin, async (req, res) => {
    try {
        const { rowCount, rows } = await counsellorHandler.getAllCounsellors();
        const data = rows.map(row => {
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
        const data = rows.map(row => {
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
router.post('/', verifyAdmin, (req, res) => {

});


// UPDATE counsellor
router.patch('/:id', (req, res) => {

});


// DELETE counsellor
router.delete('/:id', verifyAdmin, async (req, res) => {
    const { id } = req.params;

    try {
        const data = await counsellorHandler.deleteCounsellor(id);
        console.log(data);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});


module.exports = router;