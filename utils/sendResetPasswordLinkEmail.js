const sendEmail = require('./email-verification/sendEmail');

const sendResetPasswordLinkEmail = ({ name, email, localHost, token}) => {
    const link = `${localHost}/reset-password?token=${token}`;
    const forgotPasswordLink = `${localHost}/forgot-password`;
    const message = `
        <h3>Hi ${name},</h3>

        <p>
            This is to inform you that you’ve requested for forgot password. To proceed, you may click this <a href=${link} target="_blank">link</a> to which will redirect you to a page where you’ll nominate your new password.
        </p>
        <br />
        <p>
            Please be advised that the link will expire after 8 hours. Should you have not be able to nominate a password, please click this <a href=${forgotPasswordLink} target="_blank">link</a>
        </p>
        <br />
        <p>
            If you did not perform this request, please do immediately inform your Administrator.
        </p>
        <br />
        <br />
        <p style={{text-align: center}}>
            This is a system-generated e-mail notification. Please do not reply
        </p>
    `;

    return sendEmail({
        to: email,
        subject: "Forgot Password",
        html: message
    })
}

module.exports = sendResetPasswordLinkEmail;