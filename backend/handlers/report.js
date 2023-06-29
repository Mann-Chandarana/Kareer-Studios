const db = require('../db');

module.exports = {

    addReport: async (student_id, scp_leadership, scp_management, scp_bodybalance, scp_logic, scp_bodymovement, scp_senses, scp_rhythm, scp_visual, scp_observation, scp_communication, tp_right, tp_left, as_follower, as_experimental, as_different, as_thoughtful, lc_auditory, lc_visual, lc_physical, wa_intelligent, wa_emotional, wa_visionary, wa_creative, wa_adverse, pt_name, pt_info, sc_careers, sc_stream, sc_subjects, additional_note) => {
        return db.query('INSERT INTO reports (student_id, scp_leadership, scp_management, scp_bodybalance, scp_logic, scp_bodymovement, scp_senses, scp_rhythm, scp_visual, scp_observation, scp_communication, tp_right, tp_left, as_follower, as_experimental, as_different, as_thoughtful, lc_auditory, lc_visual, lc_physical, wa_intelligent, wa_emotional, wa_visionary, wa_creative, wa_adverse, pt_name, pt_info, sc_careers, sc_stream, sc_subjects, additional_note) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31)', [student_id, scp_leadership, scp_management, scp_bodybalance, scp_logic, scp_bodymovement, scp_senses, scp_rhythm, scp_visual, scp_observation, scp_communication, tp_right, tp_left, as_follower, as_experimental, as_different, as_thoughtful, lc_auditory, lc_visual, lc_physical, wa_intelligent, wa_emotional, wa_visionary, wa_creative, wa_adverse, pt_name, pt_info, sc_careers, sc_stream, sc_subjects, additional_note]);
    },
    getReport: async (student_id) => {
        return db.query('SELECT * FROM reports WHERE student_id=$1', [student_id]);
    },
    getAllReports: async () => {
        return db.query('SELECT * FROM reports');
    },
    updateReport: async (student_id, scp_leadership, scp_management, scp_bodybalance, scp_logic, scp_bodymovement, scp_senses, scp_rhythm, scp_visual, scp_observation, scp_communication, tp_right, tp_left, as_follower, as_experimental, as_different, as_thoughtful, lc_auditory, lc_visual, lc_physical, wa_intelligent, wa_emotional, wa_visionary, wa_creative, wa_adverse, pt_name, pt_info, sc_careers, sc_stream, sc_subjects, additional_note) => {
    
        return db.query('UPDATE reports SET scp_leadership=$2, scp_management=$3, scp_bodybalance=$4, scp_logic=$5, scp_bodymovement=$6, scp_senses=$7, scp_rhythm=$8, scp_visual=$9, scp_observation=$10, scp_communication=$11, tp_right=$12, tp_left=$13, as_follower=$14, as_experimental=$15, as_different=$16, as_thoughtful=$17, lc_auditory=$18, lc_visual=$19, lc_physical=$20, wa_intelligent=$21, wa_emotional=$22, wa_visionary=$23, wa_creative=$24, wa_adverse=$25, pt_name=$26, pt_info=$27, sc_careers=$28, sc_stream=$29, sc_subjects=$30, additional_note=$31 WHERE student_id=$1', [student_id, scp_leadership, scp_management, scp_bodybalance, scp_logic, scp_bodymovement, scp_senses, scp_rhythm, scp_visual, scp_observation, scp_communication, tp_right, tp_left, as_follower, as_experimental, as_different, as_thoughtful, lc_auditory, lc_visual, lc_physical, wa_intelligent, wa_emotional, wa_visionary, wa_creative, wa_adverse, pt_name, pt_info, sc_careers, sc_stream, sc_subjects, additional_note]);
    }
};