const express = require('express');
const feedbackHandler = require('../handlers/feedback');

const router = express.Router();


router.post('/student', async (req, res) => {
    try {
        const { rating, overall_experience, referal } = req.body;
        
        res.end();
    } catch (err) {
        return res.status(500).send({ error: err.message });
    }
});

module.exports = router;