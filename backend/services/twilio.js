const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);
const generateOtp = require('../utils/otpGen');

const STD_CODE = 'whatsapp:+91';

const sendSMS = (phoneNumber, body) => {
    return client.messages.create({
        body,
        from: 'whatsapp:+14155238886',
        to: STD_CODE + phoneNumber,
    });
};

const sendOtp = async (phoneNumber) => {
    const otp = generateOtp();
    console.log(`OTP: ${otp} sent to ${phoneNumber}`);

    return new Promise((resolve, reject) => {
        sendSMS(phoneNumber, `Your OTP code is: ${otp}`)
            .then(() => {
                console.log(`OTP: ${otp} sent to ${phoneNumber}`);
                resolve(otp);
            })
            .catch((err) => reject(err));
    });
};

module.exports = { sendSMS, sendOtp };
