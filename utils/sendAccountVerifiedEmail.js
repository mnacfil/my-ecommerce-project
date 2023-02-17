const sendEmail = require('./email-verification/sendEmail');

const sendAccountVerifiedEmail = async ({name, email}) => {
    const message = `
    <h2>Hi ${name}</h2>
    <p>
        You successfuly verified youre account.
    </p>

    <p>If you have more question feel free to message or email me.</p>
    <br />
    <br />
    <p>Regards</p>
    <p>Melvin Nacfil</p>
    `;

    return sendEmail({
        to: email,
        subject: "Account Successfully verify",
        html: message
    });
}

module.exports = sendAccountVerifiedEmail;