const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;



module.exports = (password) => {
    return bcrypt.hashSync(password, SALT_ROUNDS);
};