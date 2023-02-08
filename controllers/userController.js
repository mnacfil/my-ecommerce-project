

const login = async (req, res) => {
    res.json({ status: 200, message: "LOGIN route"});
}

const logout = async (req, res) => {
    res.json({ status: 200, message: "LOGOUT route"});
}

const verifyEmail = async (req, res) => {
    res.json({ status: 200, message: "Verify email route"});
}

const resetPassword = async (req, res) => {
    res.json({ status: 200, message: "Reset Password route"});
}

const forgotPassword = async (req, res) => {
    res.json({ status: 200, message: "Forgot Password route"});
}

const myProfile = async (req, res) => {
    res.json({ status: 200, message: "My Profile route"});
}

module.exports = {
    login,
    logout,
    verifyEmail,
    resetPassword,
    forgotPassword,
    myProfile
}