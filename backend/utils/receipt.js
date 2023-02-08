const pdf = require('html-pdf');
const ejs = require('ejs');
const fs = require('fs');


const html = fs.readFileSync('receipt_template.ejs', 'utf8');

const generateReceiptBuffer = ({ name, amount, email, phone, payment_id }) => {

    const date = new Date().toDateString().split(' ').slice(1).join(' ');

    return new Promise((resolve, reject) => {
        const renderedHtml = ejs.render(html, { name, amount, email, phone, date, payment_id });
        pdf.create(renderedHtml).toBuffer((err, buffer) => {
            if (err) {
                reject(err);
            } else {
                resolve(buffer);
            }
        });
    });
};

module.exports = { generateReceiptBuffer };