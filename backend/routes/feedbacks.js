const express = require('express');
const { getallfeedback } = require('../handlers/feedbacks');
const router = express.Router();


router.get('/:counsellor_id',async (req,res)=>{
    console.log(req.params.counsellor_id)
    console.log("Hello")
    try {
        const { rowCount ,rows} = await getallfeedback(req.params.counsellor_id);

        if (rowCount<=0) {
            return res.status(404).json({error:'No feedbacks found!'})
        }
        else{
            res.status(200).json({rowCount,rows:rows})
        }
    } catch (err) {
        res.status(500).json({err:err.message})
    }
})

module.exports = router;