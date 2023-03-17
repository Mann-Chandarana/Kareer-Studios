const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const encryptPassword = (password) => {
    return bcrypt.hashSync(password, SALT_ROUNDS);
};

module.exports = encryptPassword;