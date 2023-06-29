const pdf = require('html-pdf');
const ejs = require('ejs');
const fs = require('fs');

const html = fs.readFileSync('./templates/receipt.ejs', 'utf8');

const generateReceiptBuffer = (order_id, amount, name, email, phone, purpose) => {
    const date = new Date().toDateString().split(' ').slice(1).join(' ');

    return new Promise((resolve, reject) => {
        const renderedHtml = ejs.render(html, {
            name,
            amount,
            email,
            phone,
            date,
            order_id,
            purpose,
        });
        pdf.create(renderedHtml, { format: 'A4' }).toBuffer((err, buffer) => {
            if (err) {
                reject(err);
            } else {
                resolve(buffer);
            }
        });
    });
};

module.exports = { generateReceiptBuffer };
