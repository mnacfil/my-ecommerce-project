const sendMail = require('./email-verification/sendEmail');

const sendPasswordHasBeenChangeEmail = async ({ name, email }) => {
    const message = `
            <h3>Hi ${name},</h3>
            <br />
            <p>
                This is to inform you that you’ve successfully nominated a new password.
            </p>
            <br />
            <p>
                If you did not perform this request, please do immediately inform your Administrator.
            </p>
            <br />
            <br />
            <p>
                This is a system-generated e-mail notification. Please do not reply.
            </p>
    `;
    return sendMail({
        to: email,
        subject: "Nominated New Password",
        html: message
    });
}

module.exports = sendPasswordHasBeenChangeEmail
