const nodemailer = require("nodemailer");
const nodemailerConfig = require('./nodemailerConfiguration');

const sendEmail = async ({ to, subject, html}) => {
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport(nodemailerConfig);

    // send mail with defined transport object
    return transporter.sendMail({
        from: '"engrnacfil22@gmail.com',
        to,
        subject,
        html
    });
}

    module.exports = sendEmail;