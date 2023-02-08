const notFoundPage = (req, res) => {
    return res.json({ status: 404, message: 'Resource not found!'})
}

module.exports = notFoundPage