module.exports = function (res, callback) {
    try {
        callback()
    } catch (error) {
        return res.status(400).json({ "message": error.message })
    }
}