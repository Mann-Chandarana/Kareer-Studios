const express = require("express");
const { verifyStudents, verifyCounsellors } = require("../middleware/verify");
const router = express.Router();
const recordHandler = require('../handlers/record');

// POST: http://localhost:8080/api/records/addAcademicScore/:id 

router.post('/addAcademicScore/:student_id', verifyStudents, async(req, res) => {

    try {
        const { rowCount, rows } = await recordHandler.getAcademicScore(req.params.student_id);
        if (rowCount > 0) {
            res.status(404).json({ error: 'Record already exists.' });
            return;
        }
        else {

            const { student_id } = req.params;

            const { ssc_board, ssc_school, ssc_year, ssc_score, ssc_type, ssc_backlog, hsc_board, hsc_school, hsc_year, hsc_score, hsc_type, hsc_backlog, diploma_uni, diploma_college, diploma_year, diploma_score, diploma_type, diploma_backlog, ug_uni, ug_college, ug_year, ug_score, ug_type, ug_backlog } = req.body;

            console.log(req.body);
            console.log(student_id);

            await recordHandler.addAcademicScore(student_id, ssc_board, ssc_school, ssc_year, ssc_score, ssc_type, ssc_backlog, hsc_board, hsc_school, hsc_year, hsc_score, hsc_type, hsc_backlog, diploma_uni, diploma_college, diploma_year, diploma_score, diploma_type, diploma_backlog, ug_uni, ug_college, ug_year, ug_score, ug_type, ug_backlog);

            res.status(202).send({ message: 'Record added...' });
            
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err.message });
    }
})

// POST: http://localhost:8080/api/records/addIeltsScore/:id 

router.post('/addIeltsScore/:student_id', verifyStudents, async(req, res) => {

    try {        
            const { student_id } = req.params;

            const { ielts_listening_score, ielts_reading_score, ielts_writing_score, ielts_speaking_score, ielts_overall, ielts_date } = req.body;

            console.log(req.body);
            console.log(student_id);

            await recordHandler.addIeltsScore(student_id, ielts_listening_score, ielts_reading_score, ielts_writing_score, ielts_speaking_score, ielts_overall, ielts_date);

            res.status(202).send({ message: 'Record added...' });
            
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err.message });
    }
})

// POST: http://localhost:8080/api/records/addPteScore/:id 

router.post('/addPteScore/:student_id', verifyStudents, async(req, res) => {

    try {      

            const { student_id } = req.params;

            const { pte_listening_score, pte_reading_score, pte_writing_score, pte_speaking_score, pte_overall, pte_date } = req.body;

            console.log(req.body);
            console.log(student_id);

            await recordHandler.addPteScore(student_id, pte_listening_score, pte_reading_score, pte_writing_score, pte_speaking_score, pte_overall, pte_date);

            res.status(202).send({ message: 'Record added...' });
            
        
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err.message });
    }
})

// POST: http://localhost:8080/api/records/addGreScore/:id 

router.post('/addGreScore/:student_id', verifyStudents, async(req, res) => {

    try {
     
            const { student_id } = req.params;

            const { gre_verbal_score, gre_quant_score, gre_writing_score, gre_overall, gre_date } = req.body;

            console.log(req.body);
            console.log(student_id);

            await recordHandler.addGreScore(student_id, gre_verbal_score, gre_quant_score, gre_writing_score, gre_overall, gre_date);

            res.status(202).send({ message: 'Record added...' });
            
        
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err.message });
    }
})

// POST: http://localhost:8080/api/records/addSatScore/:id 

router.post('/addSatScore/:student_id', verifyStudents, async(req, res) => {

    try {

            const { student_id } = req.params;

            const { sat_math_score, sat_english_score, sat_essay_score, sat_overall, sat_date } = req.body;

            console.log(req.body);
            console.log(student_id);

            await recordHandler.addSatScore(student_id, sat_math_score, sat_english_score, sat_essay_score, sat_overall, sat_date);

            res.status(202).send({ message: 'Record added...' });
            
    
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err.message });
    }
})

// POST: http://localhost:8080/api/records/addGmatScore/:id 

router.post('/addGmatScore/:student_id', verifyStudents, async(req, res) => {

    try {
       
            const { student_id } = req.params;

            const { gmat_verbal_score, gmat_quant_score, gmat_writing_score, gmat_overall, gmat_date } = req.body;

            console.log(req.body);
            console.log(student_id);

            await recordHandler.addGmatScore(student_id, gmat_verbal_score, gmat_quant_score, gmat_writing_score, gmat_overall, gmat_date);

            res.status(202).send({ message: 'Record added...' });
            
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err.message });
    }
})

// POST: http://localhost:8080/api/records/addToeflScore/:id 

router.post('/addToeflScore/:student_id', verifyStudents, async(req, res) => {

    try {        
            const { student_id } = req.params;

            const { toefl_listening_score, toefl_reading_score, toefl_writing_score, toefl_speaking_score, toefl_overall, toefl_date } = req.body;

            console.log(req.body);
            console.log(student_id);

            await recordHandler.addToeflScore(student_id, toefl_listening_score, toefl_reading_score, toefl_writing_score, toefl_speaking_score, toefl_overall, toefl_date);

            res.status(202).send({ message: 'Record added...' });
            
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err.message });
    }
})



// GET: http://localhost:8080/records/academic/:id
router.get('/academic/:student_id', async(req, res) => {

    try {
        const { rowCount, rows } = await recordHandler.getAcademicScore(req.params.student_id);
        
        if (rowCount <= 0) {
            res.status(404).json({ error: 'Record does not exist, please add one.' });
            return;
        }
        else {
            res.status(200).json({ rowCount, rows: rows });
        }
    } catch (error) {        
        res.status(500).send({ error: error.message });
    }

})

// GET: http://localhost:8080/records/ielts/:id
router.get('/ielts/:student_id', async(req, res) => {

    try {
        const { rowCount, rows } = await recordHandler.getIeltsScore(req.params.student_id);
        if (rowCount <= 0) {
            res.status(404).json({ error: 'Record does not exist, please add one.' });
            return;
        }
        else {
            res.status(200).json({ rowCount, rows: rows });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }

})

// GET: http://localhost:8080/records/pte/:id
router.get('/pte/:student_id', async(req, res) => {

    try {
        const { rowCount, rows } = await recordHandler.getPteScore(req.params.student_id);
        if (rowCount <= 0) {
            res.status(404).json({ error: 'Record does not exist, please add one.' });
            return;
        }
        else {
            res.status(200).json({ rowCount, rows: rows });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }

})

// GET: http://localhost:8080/records/gre/:id
router.get('/gre/:student_id', async(req, res) => {

    try {
        const { rowCount, rows } = await recordHandler.getGreScore(req.params.student_id);
        if (rowCount <= 0) {
            res.status(404).json({ error: 'Record does not exist, please add one.' });
            return;
        }
        else {
            res.status(200).json({ rowCount, rows: rows });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }

})

// GET: http://localhost:8080/records/sat/:id
router.get('/sat/:student_id', async(req, res) => {

    try {
        const { rowCount, rows } = await recordHandler.getSatScore(req.params.student_id);
        if (rowCount <= 0) {
            res.status(404).json({ error: 'Record does not exist, please add one.' });
            return;
        }
        else {
            res.status(200).json({ rowCount, rows: rows });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }

})

// GET: http://localhost:8080/records/gmat/:id
router.get('/gmat/:student_id', async(req, res) => {

    try {
        const { rowCount, rows } = await recordHandler.getGmatScore(req.params.student_id);
        if (rowCount <= 0) {
            res.status(404).json({ error: 'Record does not exist, please add one.' });
            return;
        }
        else {
            res.status(200).json({ rowCount, rows: rows });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }

})

// GET: http://localhost:8080/records/toefl/:id
router.get('/toefl/:student_id', async(req, res) => {

    try {
        const { rowCount, rows } = await recordHandler.getToeflScore(req.params.student_id);
        if (rowCount <= 0) {
            res.status(404).json({ error: 'Record does not exist, please add one.' });
            return;
        }
        else {
            res.status(200).json({ rowCount, rows: rows });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }

})


// PUT: http://localhost:8080/records/updateAcademicScore/:id
router.put('/updateAcademicScore/:student_id', verifyStudents, async(req, res) => {

    try {  
            const { student_id } = req.params;

            const { ssc_board, ssc_school, ssc_year, ssc_score, ssc_type, ssc_backlog, hsc_board, hsc_school, hsc_year, hsc_score, hsc_type, hsc_backlog, diploma_uni, diploma_college, diploma_year, diploma_score, diploma_type, diploma_backlog, ug_uni, ug_college, ug_year, ug_score, ug_type, ug_backlog } = req.body;

            await recordHandler.updateAcademicScore(student_id, ssc_board, ssc_school, ssc_year, ssc_score, ssc_type, ssc_backlog, hsc_board, hsc_school, hsc_year, hsc_score, hsc_type, hsc_backlog, diploma_uni, diploma_college, diploma_year, diploma_score, diploma_type, diploma_backlog, ug_uni, ug_college, ug_year, ug_score, ug_type, ug_backlog);
        
            res.status(200).send({ message: 'Record updated...'});  
           

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

// PUT: http://localhost:8080/records/updateIeltsScore/:id
router.put('/updateIeltsScore/:id', verifyStudents, async(req, res) => {

    try {  
            const { id } = req.params;

            const { ielts_listening_score, ielts_reading_score, ielts_writing_score, ielts_speaking_score, ielts_overall, ielts_date } = req.body;

            await recordHandler.updateIeltsScore(id, ielts_listening_score, ielts_reading_score, ielts_writing_score, ielts_speaking_score, ielts_overall, ielts_date);
        
            res.status(200).send({ message: 'Record updated...'});  
           

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

// PUT: http://localhost:8080/records/updatePteScore/:id
router.put('/updatePteScore/:id', verifyStudents, async(req, res) => {

    try {  
            const { id } = req.params;

            const { pte_listening_score, pte_reading_score, pte_writing_score, pte_speaking_score, pte_overall, pte_date } = req.body;

            await recordHandler.updatePteScore(id, pte_listening_score, pte_reading_score, pte_writing_score, pte_speaking_score, pte_overall, pte_date);
        
            res.status(200).send({ message: 'Record updated...'});  
           

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

// PUT: http://localhost:8080/records/updateGreScore/:id
router.put('/updateGreScore/:id', verifyStudents, async(req, res) => {

    try {  
            const { id } = req.params;

            const { gre_verbal_score, gre_quant_score, gre_writing_score, gre_overall, gre_date } = req.body;

            await recordHandler.updateGreScore(id, gre_verbal_score, gre_quant_score, gre_writing_score, gre_overall, gre_date);
        
            res.status(200).send({ message: 'Record updated...'});  
           

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

// PUT: http://localhost:8080/records/updateGmatScore/:id
router.put('/updateSatScore/:id', verifyStudents, async(req, res) => {

    try {  
            const { id } = req.params;

            const { sat_math_score, sat_english_score, sat_essay_score, sat_overall, sat_date } = req.body;

            await recordHandler.updateSatScore(id, sat_math_score, sat_english_score, sat_essay_score, sat_overall, sat_date);
        
            res.status(200).send({ message: 'Record updated...'});  
           

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

// PUT: http://localhost:8080/records/updateIeltsScore/:id
router.put('/updateGmatScore/:id', verifyStudents, async(req, res) => {

    try {  
            const { id } = req.params;

            const { gmat_verbal_score, gmat_quant_score, gmat_writing_score, gmat_overall, gmat_date } = req.body;

            await recordHandler.updateGmatScore(id, gmat_verbal_score, gmat_quant_score, gmat_writing_score, gmat_overall, gmat_date);
        
            res.status(200).send({ message: 'Record updated...'});  
           

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

// PUT: http://localhost:8080/records/updateToeflScore/:id
router.put('/updateToeflScore/:id', verifyStudents, async(req, res) => {

    try {  
            const { id } = req.params;

            const { toefl_listening_score, toefl_reading_score, toefl_writing_score, toefl_speaking_score, toefl_overall, toefl_date } = req.body;

            await recordHandler.updateToeflScore(id, toefl_listening_score, toefl_reading_score, toefl_writing_score, toefl_speaking_score, toefl_overall, toefl_date);
        
            res.status(200).send({ message: 'Record updated...'});  
           

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

// DELETE: http://localhost:8080/records/delAcademic/:id
router.delete('/delAcademic/:id', verifyStudents, async(req, res) => {

    try {

        const { id } = req.params;

        await recordHandler.deleteAcademicScore(id);
        
        res.status(200).send({ message: 'Record deleted...'});  

    } catch (error) {
        res.status(500).send({ error: error.message });
    }

})

// DELETE: http://localhost:8080/records/delIelts/:id
router.delete('/delIelts/:id', verifyStudents, async(req, res) => {

    try {

        const { id } = req.params;

        await recordHandler.deleteIeltsScore(id);
        
        res.status(200).send({ message: 'Record deleted...'});  

    } catch (error) {
        res.status(500).send({ error: error.message });
    }

})

// DELETE: http://localhost:8080/records/delPte/:id
router.delete('/delPte/:id', verifyStudents, async(req, res) => {

    try {

        const { id } = req.params;

        await recordHandler.deletePteScore(id);
        
        res.status(200).send({ message: 'Record deleted...'});  

    } catch (error) {
        res.status(500).send({ error: error.message });
    }

})

// DELETE: http://localhost:8080/records/delGre/:id
router.delete('/delGre/:id', verifyStudents, async(req, res) => {

    try {

        const { id } = req.params;

        await recordHandler.deleteGreScore(id);
        
        res.status(200).send({ message: 'Record deleted...'});  

    } catch (error) {
        res.status(500).send({ error: error.message });
    }

})

// DELETE: http://localhost:8080/records/delSat/:id
router.delete('/delSat/:id', verifyStudents, async(req, res) => {

    try {

        const { id } = req.params;

        await recordHandler.deleteSatScore(id);
        
        res.status(200).send({ message: 'Record deleted...'});  

    } catch (error) {
        res.status(500).send({ error: error.message });
    }

})
// DELETE: http://localhost:8080/records/delGmat/:id
router.delete('/delGmat/:id', verifyStudents, async(req, res) => {

    try {

        const { id } = req.params;

        await recordHandler.deleteGmatScore(id);
        
        res.status(200).send({ message: 'Record deleted...'});  

    } catch (error) {
        res.status(500).send({ error: error.message });
    }

})

// DELETE: http://localhost:8080/records/delToefl/:id
router.delete('/delToefl/:id', verifyStudents, async(req, res) => {

    try {

        const { id } = req.params;

        await recordHandler.deleteToeflScore(id);
        
        res.status(200).send({ message: 'Record deleted...'});  

    } catch (error) {
        res.status(500).send({ error: error.message });
    }

})


module.exports = router;