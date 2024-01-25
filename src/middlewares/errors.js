module.exports = (error, req, res, next) => {
    console.log("erro")
    return res.status(error.status).json({ error: error.message });
}