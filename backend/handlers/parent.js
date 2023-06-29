const db = require('../db');

module.exports = {
    getParentbystudentid: async (student_id) => {
        return db.query('SELECT * FROM parents WHERE student_id=$1', [student_id]);
    },
    addParent: async (name, email, password, gender, student_id) => {
        return db.query('INSERT INTO parents (name, email, password, gender, student_id) VALUES ($1, $2, $3, $4, $5)', [name, email, password, gender, student_id]);
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
    },
    changePassword: async (id, newPassword) => {
        return db.query('UPDATE parents SET password=$1 WHERE id=$2', [newPassword, id]);
    },
    updateParent: async (id, newParnet) => {
        let { student_id, no_of_childs, occupation, family_type, salary, name, gender, phone } = newParnet;
        no_of_childs = no_of_childs || 0;
        salary = salary || 0;
        return db.query('UPDATE parents SET student_id=$1, no_of_childs=$2, occupation=$3, family_type=$4, salary=$5, name=$6, gender=$7, phone=$8 WHERE id=$9', [parseInt(student_id), parseInt(no_of_childs), occupation, family_type, parseInt(salary), name, gender, phone, id]);
    }
};