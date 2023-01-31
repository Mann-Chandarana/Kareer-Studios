require('dotenv').config();
const nodemailer = require('nodemailer');
const generateOtp = require('../utils/otpGen');


const emailOtp = (email) => {

    let otp = generateOtp();
    var output =
        `Your OTP is ${otp}`;

    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        // service: 'gmail',
        auth: {
            user: process.env.MAIL_IDE,
            pass: process.env.PASSWORD
        }
    });

    var mailOptions = {
        from: 'mannchandarana@gmail.com',
        to: email,
        subject: `OTP verification for Kareer Studios Sign up`,
        text: output
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(`OTP: ${otp} sent to ${email}`)
            res.status(200).send("OTP sent successfully");
        }
    });
}

emailOtp('20cs011@charusat.edu.in');

module.exports = emailOtp;