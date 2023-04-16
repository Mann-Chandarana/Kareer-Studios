const express = require("express");
const { verifyStudents, verifyCounsellors } = require("../middleware/verify");
const router = express.Router();
const reportHandler = require('../handlers/report');

/** POST: http://localhost:8080/api/reports/addReport/:id 
 * @param : {
  "scp_leadership": "", 
  "scp_management":, "",
  "scp_bodybalance": "",
  "scp_logic": "", 
  "scp_bodymovement": "", 
  "scp_senses": "", 
  "scp_rhythm": "", 
  "scp_visual": "", 
  "scp_observation": "", 
  "scp_communication": "", 
  "tp_right": "", 
  "tp_left": "", 
  "as_follower": "", 
  "as_experimental": "", 
  "as_different": "", 
  "as_thoughtful": "", 
  "lc_auditory": "", 
  "lc_visual": "", 
  "lc_physical": "", 
  "wa_intelligent": "", 
  "wa_emotional": "", 
  "wa_visionary": "", 
  "wa_creative": "", 
  "wa_adverse": "", 
  "pt_name": "",
  "pt_info": "", 
  "sc_careers": "", 
  "sc_stream": "", 
  "sc_subjects": "", 
  "additional_note": ""
}
*/

router.post('/addReport/:student_id', verifyCounsellors, async(req, res) => {

    try {
        const { rowCount, rows } = await reportHandler.getReport(req.params.student_id);
        if (rowCount > 0) {
            res.status(404).json({ error: 'Report already exists.' });
            return;
        }
        else {

            const { student_id } = req.params;

            const { scp_leadership, scp_management, scp_bodybalance, scp_logic, scp_bodymovement, scp_senses, scp_rhythm, scp_visual, scp_observation, scp_communication, tp_right, tp_left, as_follower, as_experimental, as_different, as_thoughtful, lc_auditory, lc_visual, lc_physical, wa_intelligent, wa_emotional, wa_visionary, wa_creative, wa_adverse, pt_name, pt_info, sc_careers, sc_stream, sc_subjects, additional_note } = req.body;

            console.log(req.body);
            console.log(student_id);

            await reportHandler.addReport(student_id, scp_leadership, scp_management, scp_bodybalance, scp_logic, scp_bodymovement, scp_senses, scp_rhythm, scp_visual, scp_observation, scp_communication, tp_right, tp_left, as_follower, as_experimental, as_different, as_thoughtful, lc_auditory, lc_visual, lc_physical, wa_intelligent, wa_emotional, wa_visionary, wa_creative, wa_adverse, pt_name, pt_info, sc_careers, sc_stream, sc_subjects, additional_note);

            res.status(202).send({ message: 'Report added...' });
            
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: err.message });
    }
})


// GET: http://localhost:8080/reports/report/:id
router.get('/report/:student_id', async(req, res) => {

    try {
        const { rowCount, rows } = await reportHandler.getReport(req.params.student_id);
        if (rowCount <= 0) {
            res.status(404).json({ error: 'Report does not exist, please add one.' });
            return;
        }
        else {
            res.status(200).json({ rowCount, rows: rows });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }

})


// update the password when we have valid session
/** PUT: http://localhost:8080/reports/updateReport/:id
 * @param : {
  "scp_leadership": "", 
  "scp_management":, "",
  "scp_bodybalance": ""
  "scp_logic": "", 
  "scp_bodymovement": "", 
  "scp_senses": "", 
  "scp_rhythm": "", 
  "scp_visual": "", 
  "scp_observation": "", 
  "scp_communication": "", 
  "tp_right": "", 
  "tp_left": "", 
  "as_follower": "", 
  "as_experimental": "", 
  "as_different": "", 
  "as_thoughtful": "", 
  "lc_auditory": "", 
  "lc_visual": "", 
  "lc_physical": "", 
  "wa_intelligent": "", 
  "wa_emotional": "", 
  "wa_visionary": "", 
  "wa_creative": "", 
  "wa_adverse": "", 
  "pt_name": "",
  "pt_info": "", 
  "sc_careers": "", 
  "sc_stream": "", 
  "sc_subjects": "", 
  "additional_note": ""
}
*/
router.put('/updateReport/:student_id', verifyCounsellors, async(req, res) => {

    try {  
        const { rowCount, rows } = await reportHandler.getReport(req.params.student_id);
        if (rowCount <= 0) {
            res.status(404).json({ error: 'Report does not exist, please add one.' });
            return;
        }
        else {

            const { student_id } = req.params;

            const { scp_leadership, scp_management, scp_bodybalance, scp_logic, scp_bodymovement, scp_senses, scp_rhythm, scp_visual, scp_observation, scp_communication, tp_right, tp_left, as_follower, as_experimental, as_different, as_thoughtful, lc_auditory, lc_visual, lc_physical, wa_intelligent, wa_emotional, wa_visionary, wa_creative, wa_adverse, pt_name, pt_info, sc_careers, sc_stream, sc_subjects, additional_note } = req.body;

            console.log(req.body);

            await reportHandler.updateReport(student_id, scp_leadership, scp_management, scp_bodybalance, scp_logic, scp_bodymovement, scp_senses, scp_rhythm, scp_visual, scp_observation, scp_communication, tp_right, tp_left, as_follower, as_experimental, as_different, as_thoughtful, lc_auditory, lc_visual, lc_physical, wa_intelligent, wa_emotional, wa_visionary, wa_creative, wa_adverse, pt_name, pt_info, sc_careers, sc_stream, sc_subjects, additional_note);
        
            res.status(200).send({ message: 'Report updated...'});  
        }     

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

module.exports = router;