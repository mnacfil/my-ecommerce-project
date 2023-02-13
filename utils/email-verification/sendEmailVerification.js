const sendEmail = require('./sendEmail')

const sendEmailVerification = async ({ origin, name, email, verificationToken }) => {

    const link = `${origin}/api/v1/auth/verify-email?verificationToken=${verificationToken}&email=${email}`;
    const message = `
        <h3>Hello, ${name}</h3>
        <br />
        <p>
            Please confirm your email by clicking on the following link :
                <a href="${link}">Verify Email</a>
        </p>
    `;

    return sendEmail({
        to: email,
        subject: 'Confirm Email',
        html: message
    })
}

module.exports = sendEmailVerification;


