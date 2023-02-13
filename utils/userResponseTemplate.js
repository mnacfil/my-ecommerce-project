const userResponseTemplate = (user) => {
    const { firstName, lastName, role, _id} = user;
    return {
        name: `${firstName} ${lastName}`,
        userID: _id,
        role
    }
}

module.exports = userResponseTemplate;

