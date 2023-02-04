const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const encryptPassword = async (password) => {
    return bcrypt.hash(password, SALT_ROUNDS);
};

module.exports = encryptPassword;