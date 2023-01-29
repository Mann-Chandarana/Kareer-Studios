const db = require('../db')

module.exports ={
    addAdmin:async(email,password)=>{
        db.query("INSERT INTO admins (email,password) values ($1,$2)",[email,password])
    }
}