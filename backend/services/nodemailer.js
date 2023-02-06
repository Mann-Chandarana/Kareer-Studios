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

const sendEmail = (email, subject, body, attachments = null) => {
    return new Promise((resolve, reject) => {
        transporter.sendMail({
            to: email,
            subject,
            html: body,
            attachments
        }, (err, info) => {
            if (err) {
                reject(err);
            } else {
                resolve(info);
            }
        });
    });
};

const sendOtp = (email) => {
    const otp = generateOtp();
    return new Promise((resolve, reject) => {
        sendEmail(email, 'OTP for verification', `OTP: ${otp}`)
            .then(() => {
                console.log(`OTP: ${otp} sent to ${email}`);
                resolve(otp);
            })
            .catch(err => reject(err));
    });
};

module.exports = { sendEmail, sendOtp };