const pdf = require('html-pdf');
const ejs = require('ejs');
const fs = require('fs');

const html = fs.readFileSync('receipt_template.ejs', 'utf8');
const data = {
    username: 'Vatsal'
};

const renderedHtml = ejs.render(html, data);

pdf.create(renderedHtml).toFile('./receipt.pdf', function (err, res) {
    if (err) {
        console.error(err);
    } else {
        console.log(res);
    }
});


const generateReceipt = (id, name, amount) => {
    const renderedHtml = ejs.render(html, { id, name, amount });

    pdf.create(renderedHtml).toFile('./receipt.pdf', function (err, res) {
        if (err) {
            console.error(err);
        } else {
            console.log(res);
        }
    });
};