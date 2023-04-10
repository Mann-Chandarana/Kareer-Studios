const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;

const client = require('twilio')(accountSid, authToken);
const generateOtp = require('../utils/otpGen');

const STD_CODE = '+91';


const sendSMS = (phoneNumber, body) => {
    return client.messages
        .create({
            body,
            messagingServiceSid,
            to: STD_CODE + phoneNumber
        });
};

const sendOtp = (phoneNumber) => {
    const otp = generateOtp();
    console.log(phoneNumber, otp);
    return new Promise((resolve, reject) => {
        sendSMS(phoneNumber, `OTP: ${otp}`)
            .then(() => {
                console.log(`OTP: ${otp} sent to ${phoneNumber}`);
                resolve(otp);
            })
            .catch(err => reject(err));
    });
};

module.exports = { sendSMS, sendOtp };