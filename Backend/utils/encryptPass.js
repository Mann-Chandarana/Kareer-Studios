const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

const encrypt = async (password) => {
    return bcrypt.hash(password, SALT_ROUNDS);
};

module.exports = { encrypt };