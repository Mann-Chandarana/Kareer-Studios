const generateOtp =(length=4)=>{
    let otp = "";

    let x = 1000+ Math.ceil((Math.random() * 10000) + 1);
    otp = (x.toString()).substr(0,4);


    return otp;
}

module.exports = generateOtp;