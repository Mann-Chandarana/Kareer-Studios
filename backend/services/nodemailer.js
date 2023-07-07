const nodemailer = require('nodemailer');
const generateOtp = require('../utils/otpGen');

const mailerEmail = process.env.MAILER_EMAIL;
const mailerPass = process.env.MAILER_PASS;

if (!mailerEmail) {
    console.error('Please define MAILER_EMAIL in env.');
    process.exit(1);
}
if (!mailerPass) {
    console.error('Please define MAILER_PASS in env.');
    process.exit(1);
}

// create transporter object using the gmail SMTP transport
const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    auth: {
        user: mailerEmail,
        pass: mailerPass,
    },
});

const sendEmail = (email, subject, body, attachments = null) => {
    return new Promise((resolve, reject) => {
        transporter.sendMail(
            {
                from: `"Kareer Studio" <${mailerEmail}>`,
                to: email,
                subject,
                html: body,
                attachments,
            },
            (err, info) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(info);
                }
            }
        );
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
            .catch((err) => reject(err));
    });
};

module.exports = { sendEmail, sendOtp };
