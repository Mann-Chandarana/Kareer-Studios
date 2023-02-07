const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const symbols = '!@#$%^&*()+_-=}{[]|:;"/?.><,`~';

const generatePassword = (options) => {

    options = options || {};
    if (!Object.prototype.hasOwnProperty.call(options, 'length')) options.length = 16;
    if (!Object.prototype.hasOwnProperty.call(options, 'numbers')) options.numbers = false;
    if (!Object.prototype.hasOwnProperty.call(options, 'symbols')) options.symbols = false;
    if (!Object.prototype.hasOwnProperty.call(options, 'exclude')) options.exclude = '';
    if (!Object.prototype.hasOwnProperty.call(options, 'uppercase')) options.uppercase = true;
    if (!Object.prototype.hasOwnProperty.call(options, 'lowercase')) options.lowercase = true;


    // Generate character pool
    let pool = '';

    // lowercase
    if (options.lowercase) {
        pool += lowercase;
    }

    // uppercase
    if (options.uppercase) {
        pool += uppercase;
    }
    // numbers
    if (options.numbers) {
        pool += numbers;
        if (options.uppercase && options.lowercase) {
            pool += numbers + numbers;
        }
    }
    // symbols
    if (options.symbols) {
        if (typeof options.symbols === 'string') {
            pool += options.symbols;
        } else {
            pool += symbols;
        }
    }

    // Throw error if pool is empty.
    if (!pool) {
        throw new TypeError('At least one rule for pools must be true');
    }

    let password = '';
    for (let i = 0; i < options.length; i++) {
        password += pool[Math.floor(Math.random() * pool.length)];
    }
    return password;
};

module.exports = generatePassword;