const db = require('../db');

module.exports = {
    getParentbystudentid:async(student_id)=>{
       return db.query('SELECT * FROM parents WHERE student_id=$1',[student_id]);
    },
    addParent: async (name, email, password) => {
        return db.query('INSERT INTO parents (name, email, password) VALUES ($1, $2, $3)', [name, email, password]);
    },
    getParent: async (parent_id) => {
        return db.query('SELECT * FROM parents WHERE id=$1', [parent_id]);
    },
    getParentByEmail: async (email) => {
        return db.query('SELECT * FROM parents WHERE email=$1', [email]);
    },
    getAllParents: async () => {
        return db.query('SELECT * FROM parents');
    },
    deleteParent: async (parent_id) => {
        return db.query('DELETE FROM parents WHERE id=$1', [parent_id]);
    }
};