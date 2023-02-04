const generatePassword = (email, phone, name, length = 16) => {
    const ALL = email + phone + name;
    let password = "";

    for (let i = 0; i < length; i++) {
        password += ALL[Math.floor(Math.random() * ALL.length)];
    }

    return password;
};

module.exports = generatePassword;