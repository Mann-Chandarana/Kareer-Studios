const db = require('../db');

module.exports = {


    //academics
    addAcademicScore: async (student_id, ssc_board, ssc_year, ssc_score, ssc_backlog, hsc_board, hsc_year, hsc_score, hsc_backlog, diploma_uni, diploma_year, diploma_score, diploma_backlog, ug_uni, ug_year, ug_score, ug_backlog) => {
        return db.query('INSERT INTO academic_scores (student_id, ssc_board, ssc_year, ssc_score, ssc_backlog, hsc_board, hsc_year, hsc_score, hsc_backlog, diploma_uni, diploma_year, diploma_score, diploma_backlog, ug_uni, ug_year, ug_score, ug_backlog) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)', [student_id, ssc_board, ssc_year, ssc_score, ssc_backlog, hsc_board, hsc_year, hsc_score, hsc_backlog, diploma_uni, diploma_year, diploma_score, diploma_backlog, ug_uni, ug_year, ug_score, ug_backlog]);
    },

    getAcademicScore: async (student_id) => {
        return db.query('SELECT * FROM academic_scores WHERE student_id=$1', [student_id]);
    },

    updateAcademicScore: async(student_id, ssc_board, ssc_year, ssc_score, ssc_backlog, hsc_board, hsc_year, hsc_score, hsc_backlog, diploma_uni, diploma_year, diploma_score, diploma_backlog, ug_uni, ug_year, ug_score, ug_backlog) => {
        return db.query('UPDATE academic_scores SET ssc_board=$2, ssc_year=$3, ssc_score=$4, ssc_backlog=$5, hsc_board=$6, hsc_year=$7, hsc_score=$8, hsc_backlog=$9, diploma_uni=$10, diploma_year=$11, diploma_score=$12, diploma_backlog=$13, ug_uni=$14, ug_year=$15, ug_score=$16, ug_backlog=$17 WHERE student_id=$1', [student_id, ssc_board, ssc_year, ssc_score, ssc_backlog, hsc_board, hsc_year, hsc_score, hsc_backlog, diploma_uni, diploma_year, diploma_score, diploma_backlog, ug_uni, ug_year, ug_score, ug_backlog]);

    },

    deleteAcademicScore: async (student_id) => {
        return db.query('DELETE FROM academic_scores WHERE student_id=$1', [student_id]);
    },


    //ielts
    addIeltsScore: async (student_id, ielts_listening_score, ielts_reading_score, ielts_writing_score, ielts_speaking_score, ielts_date) => {
        return db.query('INSERT INTO ielts_scores (student_id,ielts_listening_score, ielts_reading_score, ielts_writing_score, ielts_speaking_score, ielts_date) VALUES ($1, $2, $3, $4, $5, $6)', [student_id,ielts_listening_score, ielts_reading_score, ielts_writing_score, ielts_speaking_score, ielts_date]);
    },

    getIeltsScore: async (student_id) => {
        return db.query('SELECT * FROM ielts_scores WHERE student_id=$1', [student_id]);
    },

    updateIeltsScore: async(id, ielts_listening_score, ielts_reading_score, ielts_writing_score, ielts_speaking_score, ielts_date) => {
        return db.query('UPDATE ielts_scores SET ielts_listening_score=$2, ielts_reading_score=$3, ielts_writing_score=$4, ielts_speaking_score=$5, ielts_date=$6 WHERE id=$1', [id, ielts_listening_score, ielts_reading_score, ielts_writing_score, ielts_speaking_score, ielts_date]);

    },

    deleteIeltsScore: async (id) => {
        return db.query('DELETE FROM ielts_scores WHERE id=$1', [id]);
    },


    //pte
    addPteScore: async (student_id, pte_listening_score, pte_reading_score, pte_writing_score, pte_speaking_score, pte_date) => {
        return db.query('INSERT INTO pte_scores (student_id,pte_listening_score, pte_reading_score, pte_writing_score, pte_speaking_score, pte_date) VALUES ($1, $2, $3, $4, $5, $6)', [student_id, pte_listening_score, pte_reading_score, pte_writing_score, pte_speaking_score, pte_date]);
    },

    getPteScore: async (student_id) => {
        return db.query('SELECT * FROM pte_scores WHERE student_id=$1', [student_id]);
    },

    updatePteScore: async(id, pte_listening_score, pte_reading_score, pte_writing_score, pte_speaking_score, pte_date) => {
        return db.query('UPDATE pte_scores SET pte_listening_score=$2, pte_reading_score=$3, pte_writing_score=$4, pte_speaking_score=$5, pte_date=$6 WHERE id=$1', [id, pte_listening_score, pte_reading_score, pte_writing_score, pte_speaking_score, pte_date]);

    },

    deletePteScore: async (id) => {
        return db.query('DELETE FROM pte_scores WHERE id=$1', [id]);
    },


    //gre
    addGreScore: async (student_id, gre_verbal_score, gre_quant_score, gre_writing_score, gre_date) => {
        return db.query('INSERT INTO gre_scores (student_id,gre_verbal_score, gre_quant_score, gre_writing_score, gre_date) VALUES ($1, $2, $3, $4, $5)', [student_id,gre_verbal_score, gre_quant_score, gre_writing_score, gre_date]);
    },

    getGreScore: async (student_id) => {
        return db.query('SELECT * FROM gre_scores WHERE student_id=$1', [student_id]);
    },

    updateGreScore: async(id, gre_verbal_score, gre_quant_score, gre_writing_score, gre_date) => {
        return db.query('UPDATE gre_Scores SET gre_verbal_score=$2, gre_quant_score=$3, gre_writing_score=$4, gre_date=$5 WHERE id=$1', [id, gre_verbal_score, gre_quant_score, gre_writing_score, gre_date]);

    },

    deleteGreScore: async (id) => {
        return db.query('DELETE FROM gre_scores WHERE id=$1', [id]);
    },


    //sat
    addSatScore: async (student_id, sat_math_score, sat_english_score, sat_essay_score, sat_date) => {
        return db.query('INSERT INTO sat_scores (student_id, sat_math_score, sat_english_score, sat_essay_score, sat_date) VALUES ($1, $2, $3, $4, $5)', [student_id, sat_math_score, sat_english_score, sat_essay_score, sat_date]);
    },

    getSatScore: async (student_id) => {
        return db.query('SELECT * FROM sat_scores WHERE student_id=$1', [student_id]);
    },

    updateSatScore: async(id, sat_math_score, sat_english_score, sat_essay_score, sat_date) => {
        return db.query('UPDATE sat_scores SET sat_math_score=$2, sat_english_score=$3, sat_essay_score=$4, sat_date=$5 WHERE id=$1', [id, sat_math_score, sat_english_score, sat_essay_score, sat_date]);

    },

    deleteSatScore: async (id) => {
        return db.query('DELETE FROM sat_scores WHERE id=$1', [id]);
    },

    
    //gmat
    addGmatScore: async (student_id, gmat_verbal_score, gmat_quant_score, gmat_writing_score, gmat_date) => {
        return db.query('INSERT INTO gmat_scores (student_id, gmat_verbal_score, gmat_quant_score, gmat_writing_score, gmat_date) VALUES ($1, $2, $3, $4, $5)', [student_id, gmat_verbal_score, gmat_quant_score, gmat_writing_score, gmat_date]);
    },

    getGmatScore: async (student_id) => {
        return db.query('SELECT * FROM gmat_scores WHERE student_id=$1', [student_id]);
    },

    updateGmatScore: async(id, gmat_verbal_score, gmat_quant_score, gmat_writing_score, gmat_date) => {
        return db.query('UPDATE gmat_scores SET gmat_verbal_score=$2, gmat_quant_score=$3, gmat_writing_score=$4, gmat_date=$5 WHERE id=$1', [id, gmat_verbal_score, gmat_quant_score, gmat_writing_score, gmat_date]);

    },

    deleteGmatScore: async (id) => {
        return db.query('DELETE FROM gmat_scores WHERE id=$1', [id]);
    },



};