const NUMBERS = "0123456789";

const generateOtp = (length = 4) => {
    const otp = "";

    for (let i = 0; i < length; i++) {
        otp += NUMBERS[Math.floor(Math.random() * NUMBERS.length)];
    }

    return otp;
};

module.exports = generateOtp;