const nodemailer = require('nodemailer');
const generateOtp = require('../utils/otpGen');

const mailerId = process.env.MAILER_ID;
const mailerPass = process.env.MAILER_PASS;

if (!mailerId) {
    console.error('Please define MAILER_ID in env.');
    process.exit(1);
}
if (!mailerPass) {
    console.error('Please define MAILER_PASS in env.');
    process.exit(1);
}

// create transporter object using the gmail SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: mailerId,
        pass: mailerPass
    }
});

const sendEmail = (email, subject, body) => {
    return transporter.sendMail({
        to: email,
        subject,
        html: body
    });
};

const sendOtp = (email) => {
    let otp = generateOtp();
    sendEmail(email, 'OTP for verification', `OTP: ${otp}`)
        .then(() => console.log(`OTP: ${otp} sent to ${email}`))
        .catch(err => console.error(err));
    return otp;
};

module.exports = { sendEmail, sendOtp };