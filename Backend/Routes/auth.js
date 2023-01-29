const db = require('../db')
const express = require('express');

const dotenv = require('dotenv');
const router = express.Router();

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');


dotenv.config();

// Route-1 /api/auth/kareerStudios/createUser --- for signup

router.post('/createUser',async(req,res)=>{
    
    try {
        // const results = await db.query('SELECT * FROM ADMIN WHERE email=$1',[user.email]);

        // if(results.rowCount>0){
        //     return res.status(409).json({error:'User already exists'})
        // }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt);

        // Create user
        // await db.query(
        //     'INSERT INTO admins (email,password) values ($1,$2)',[user.email,secPass]
        // );

        const data = {
            email:req.body.email,
            role:"admin"
        }

        const authtoken = jwt.sign(data,process.env.JWT_SECRET);
        res.json({authtoken});
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error :");
    }

})


// Route-2 /api/auth/kareerStudios/login --- for login
router.post('/login',async(req,res)=>{

})

module.exports = router;