const jwt = require('jsonwebtoken');

const createJWT = ({payload}) => jwt.sign(payload, process.env.SECRET);

const isValidToken = (token) => jwt.verify(token, process.env.SECRET);

const attachCookiesToResponse = ({ res, user, refreshToken }) => {
    const accessJWT = createJWT({ payload: user });
    const refreshJWT = createJWT({ payload: {user, refreshToken} });

    const oneDay = 24 * 60 * 60 * 1000;
    const oneWeek = oneDay * oneDay;

    res.cookie('accessToken', accessJWT, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(Date.now() + oneDay),
    });

    res.cookie('refreshToken', refreshJWT, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(Date.now() + oneWeek)
    })
}

module.exports = {
    createJWT,
    isValidToken,
    attachCookiesToResponse
}