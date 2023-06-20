const db = require('../db');

module.exports = {

    //academics
    addAcademicScore: async (student_id, ssc_board, ssc_school, ssc_year, ssc_score, ssc_type, ssc_backlog, hsc_board, hsc_school, hsc_year, hsc_score, hsc_type, hsc_backlog, diploma_uni, diploma_college, diploma_year, diploma_score, diploma_type, diploma_backlog, ug_uni, ug_college, ug_year, ug_score, ug_type, ug_backlog) => {
        return db.query('INSERT INTO academic_scores (student_id, ssc_board, ssc_school, ssc_year, ssc_score, ssc_type, ssc_backlog, hsc_board, hsc_school, hsc_year, hsc_score, hsc_type, hsc_backlog, diploma_uni, diploma_college, diploma_year, diploma_score, diploma_type, diploma_backlog, ug_uni, ug_college, ug_year, ug_score, ug_type, ug_backlog) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25)', [student_id, ssc_board, ssc_school, ssc_year, ssc_score, ssc_type, ssc_backlog, hsc_board, hsc_school, hsc_year, hsc_score, hsc_type, hsc_backlog, diploma_uni, diploma_college, diploma_year, diploma_score, diploma_type, diploma_backlog, ug_uni, ug_college, ug_year, ug_score, ug_type, ug_backlog]);
    },

    getAcademicScore: async (student_id) => {
        return db.query('SELECT * FROM academic_scores WHERE student_id=$1', [student_id]);
    },

    updateAcademicScore: async(student_id, ssc_board, ssc_school, ssc_year, ssc_score, ssc_type, ssc_backlog, hsc_board, hsc_school, hsc_year, hsc_score, hsc_type, hsc_backlog, diploma_uni, diploma_college, diploma_year, diploma_score, diploma_type, diploma_backlog, ug_uni, ug_college, ug_year, ug_score, ug_type, ug_backlog) => {
        return db.query('UPDATE academic_scores SET ssc_board=$2, ssc_school=$3, ssc_year=$4, ssc_score=$5, ssc_type=$6, ssc_backlog=$7, hsc_board=$8, hsc_school=$9, hsc_year=$10, hsc_score=$11, hsc_type=$12, hsc_backlog=$13, diploma_uni=$14, diploma_college=$15, diploma_year=$16, diploma_score=$17, diploma_type=$18, diploma_backlog=$19, ug_uni=$20, ug_college=$21, ug_year=$22, ug_score=$23, ug_type=$24, ug_backlog=$25 WHERE student_id=$1', [student_id, ssc_board, ssc_school, ssc_year, ssc_score, ssc_type, ssc_backlog, hsc_board, hsc_school, hsc_year, hsc_score, hsc_type, hsc_backlog, diploma_uni, diploma_college, diploma_year, diploma_score, diploma_type, diploma_backlog, ug_uni, ug_college, ug_year, ug_score, ug_type, ug_backlog]);

    },

    deleteAcademicScore: async (student_id) => {
        return db.query('DELETE FROM academic_scores WHERE student_id=$1', [student_id]);
    },


    //ielts
    addIeltsScore: async (student_id, ielts_listening_score, ielts_reading_score, ielts_writing_score, ielts_speaking_score, ielts_overall, ielts_date) => {
        return db.query('INSERT INTO ielts_scores (student_id,ielts_listening_score, ielts_reading_score, ielts_writing_score, ielts_speaking_score, ielts_overall, ielts_date) VALUES ($1, $2, $3, $4, $5, $6, $7)', [student_id,ielts_listening_score, ielts_reading_score, ielts_writing_score, ielts_speaking_score, ielts_overall, ielts_date]);
    },

    getIeltsScore: async (student_id) => {
        return db.query('SELECT * FROM ielts_scores WHERE student_id=$1', [student_id]);
    },

    updateIeltsScore: async(id, ielts_listening_score, ielts_reading_score, ielts_writing_score, ielts_speaking_score, ielts_overall, ielts_date) => {
        return db.query('UPDATE ielts_scores SET ielts_listening_score=$2, ielts_reading_score=$3, ielts_writing_score=$4, ielts_speaking_score=$5, ielts_overall=$6, ielts_date=$7 WHERE id=$1', [id, ielts_listening_score, ielts_reading_score, ielts_writing_score, ielts_speaking_score, ielts_overall, ielts_date]);

    },

    deleteIeltsScore: async (id) => {
        return db.query('DELETE FROM ielts_scores WHERE id=$1', [id]);
    },


    //pte
    addPteScore: async (student_id, pte_listening_score, pte_reading_score, pte_writing_score, pte_speaking_score, pte_overall, pte_date) => {
        return db.query('INSERT INTO pte_scores (student_id, pte_listening_score, pte_reading_score, pte_writing_score, pte_speaking_score, pte_overall, pte_date) VALUES ($1, $2, $3, $4, $5, $6, $7)', [student_id, pte_listening_score, pte_reading_score, pte_writing_score, pte_speaking_score, pte_overall, pte_date]);
    },

    getPteScore: async (student_id) => {
        return db.query('SELECT * FROM pte_scores WHERE student_id=$1', [student_id]);
    },

    updatePteScore: async(id, pte_listening_score, pte_reading_score, pte_writing_score, pte_speaking_score, pte_overall, pte_date) => {
        return db.query('UPDATE pte_scores SET pte_listening_score=$2, pte_reading_score=$3, pte_writing_score=$4, pte_speaking_score=$5, pte_overall=$6, pte_date=$7 WHERE id=$1', [id, pte_listening_score, pte_reading_score, pte_writing_score, pte_speaking_score, pte_overall, pte_date]);

    },

    deletePteScore: async (id) => {
        return db.query('DELETE FROM pte_scores WHERE id=$1', [id]);
    },


    //gre
    addGreScore: async (student_id, gre_verbal_score, gre_quant_score, gre_writing_score, gre_overall, gre_date) => {
        return db.query('INSERT INTO gre_scores (student_id, gre_verbal_score, gre_quant_score, gre_writing_score, gre_overall, gre_date) VALUES ($1, $2, $3, $4, $5, $6)', [student_id, gre_verbal_score, gre_quant_score, gre_writing_score, gre_overall, gre_date]);
    },

    getGreScore: async (student_id) => {
        return db.query('SELECT * FROM gre_scores WHERE student_id=$1', [student_id]);
    },

    updateGreScore: async(id, gre_verbal_score, gre_quant_score, gre_writing_score, gre_overall, gre_date) => {
        return db.query('UPDATE gre_Scores SET gre_verbal_score=$2, gre_quant_score=$3, gre_writing_score=$4, gre_overall=$5, gre_date=$6 WHERE id=$1', [id, gre_verbal_score, gre_quant_score, gre_writing_score, gre_overall, gre_date]);

    },

    deleteGreScore: async (id) => {
        return db.query('DELETE FROM gre_scores WHERE id=$1', [id]);
    },


    //sat
    addSatScore: async (student_id, sat_math_score, sat_english_score, sat_essay_score, sat_overall, sat_date) => {
        return db.query('INSERT INTO sat_scores (student_id, sat_math_score, sat_english_score, sat_essay_score, sat_overall, sat_date) VALUES ($1, $2, $3, $4, $5, $6)', [student_id, sat_math_score, sat_english_score, sat_essay_score, sat_overall, sat_date]);
    },

    getSatScore: async (student_id) => {
        return db.query('SELECT * FROM sat_scores WHERE student_id=$1', [student_id]);
    },

    updateSatScore: async(id, sat_math_score, sat_english_score, sat_essay_score, sat_overall, sat_date) => {
        return db.query('UPDATE sat_scores SET sat_math_score=$2, sat_english_score=$3, sat_essay_score=$4, sat_overall=$5, sat_date=$6 WHERE id=$1', [id, sat_math_score, sat_english_score, sat_essay_score, sat_overall, sat_date]);

    },

    deleteSatScore: async (id) => {
        return db.query('DELETE FROM sat_scores WHERE id=$1', [id]);
    },

    
    //gmat
    addGmatScore: async (student_id, gmat_verbal_score, gmat_quant_score, gmat_writing_score, gmat_overall, gmat_date) => {
        return db.query('INSERT INTO gmat_scores (student_id, gmat_verbal_score, gmat_quant_score, gmat_writing_score, gmat_overall, gmat_date) VALUES ($1, $2, $3, $4, $5, $6)', [student_id, gmat_verbal_score, gmat_quant_score, gmat_writing_score, gmat_overall, gmat_date]);
    },

    getGmatScore: async (student_id) => {
        return db.query('SELECT * FROM gmat_scores WHERE student_id=$1', [student_id]);
    },

    updateGmatScore: async(id, gmat_verbal_score, gmat_quant_score, gmat_writing_score, gmat_overall, gmat_date) => {
        return db.query('UPDATE gmat_scores SET gmat_verbal_score=$2, gmat_quant_score=$3, gmat_writing_score=$4, gmat_overall=$5, gmat_date=$6 WHERE id=$1', [id, gmat_verbal_score, gmat_quant_score, gmat_writing_score, gmat_overall, gmat_date]);

    },

    deleteGmatScore: async (id) => {
        return db.query('DELETE FROM gmat_scores WHERE id=$1', [id]);
    },


    //toefl
    addToeflScore: async (student_id, toefl_listening_score, toefl_reading_score, toefl_writing_score, toefl_speaking_score, toefl_overall, toefl_date) => {
        return db.query('INSERT INTO toefl_scores (student_id, toefl_listening_score, toefl_reading_score, toefl_writing_score, toefl_speaking_score, toefl_overall, toefl_date) VALUES ($1, $2, $3, $4, $5, $6, $7)', [student_id, toefl_listening_score, toefl_reading_score, toefl_writing_score, toefl_speaking_score, toefl_overall, toefl_date]);
    },

    getToeflScore: async (student_id) => {
        return db.query('SELECT * FROM toefl_scores WHERE student_id=$1', [student_id]);
    },

    updateToeflScore: async(id, toefl_listening_score, toefl_reading_score, toefl_writing_score, toefl_speaking_score, toefl_overall, toefl_date) => {
        return db.query('UPDATE toefl_scores SET toefl_listening_score=$2, toefl_reading_score=$3, toefl_writing_score=$4, toefl_speaking_score=$5, toefl_overall=$6, toefl_date=$7 WHERE id=$1', [id, toefl_listening_score, toefl_reading_score, toefl_writing_score, toefl_speaking_score, toefl_overall, toefl_date]);

    },

    deleteToeflScore: async (id) => {
        return db.query('DELETE FROM toefl_scores WHERE id=$1', [id]);
    },



};