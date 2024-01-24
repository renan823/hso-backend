module.exports = (error, req, res, next) => {
    return res.status(error.status).json({ error: error.message });
}