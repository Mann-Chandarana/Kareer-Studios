const db = require('../db')

module.exports = {
    getallfeedback: async (counsellor_id) => {
        console.log("Hello")
        return db.query('SELECT * FROM counsellors where id =$1',[counsellor_id])
    },
};