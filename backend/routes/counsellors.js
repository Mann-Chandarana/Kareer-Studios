const express = require('express');
const router = express.Router();

const { verifyAdmin } = require('../middleware/verify');
const counsellorHandler = require('../handlers/counsellor');


// GET all counsellors
router.get('/', verifyAdmin, async (req, res) => {
    try {
        const { rowCount, rows } = await counsellorHandler.getAllCounsellors();
        const data = rows.map(row => {
            delete row.password;
            return row;
        });

        console.log(data);
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

        console.log(data);

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