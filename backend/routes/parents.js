const express = require('express');
const router = express.Router();

const { verifyAdmin, verifyStudents } = require('../middleware/verify');
const parentHandler = require('../handlers/parent');


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

router.get('/parent/:student_id', verifyStudents, async (req, res) => {
    try {
        const { rowCount, rows } = await parentHandler.getParentbystudentid(req.params.student_id);
        if (rowCount <= 0) {
            res.status(404).json({ error: 'Parent not found !' })
            return;
        }
        else {
            delete rows[0].password
            res.status(200).json({ rowCount, rows: rows[0] });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})


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
router.post('/', verifyAdmin, (req, res) => {

});


// UPDATE parent
router.patch('/:id', (req, res) => {

});


// DELETE parent
router.delete('/:id', verifyAdmin, async (req, res) => {
    const { id } = req.params;

    try {
        const data = await parentHandler.deleteParent(id);
        console.log(data);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});


module.exports = router;