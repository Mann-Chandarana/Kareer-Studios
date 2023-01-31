const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;

const client = require('twilio')(accountSid, authToken);
const generateOtp = require('../utils/otpGen');

const IND_STD_CODE = '+91';


const sendSMS = (phoneNumber, body) => {
    return client.messages
        .create({
            body,
            messagingServiceSid,
            to: IND_STD_CODE + phoneNumber
        });
};

const sendOtp = (phoneNumber) => {
    const otp = generateOtp();
    sendSMS(phoneNumber, `OTP: ${otp}`)
        .then(() => console.log(`OTP: ${otp} sent to ${phoneNumber}`))
        .catch(err => console.error(err));
    return otp;
};

module.exports = { sendSMS, sendOtp };