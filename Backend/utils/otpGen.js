const generateOtp = () => {
    let otp = ((1000 + Math.floor((Math.random() * 10000))).toString()).substr(0, 4);
    return otp;
}


module.exports = generateOtp;