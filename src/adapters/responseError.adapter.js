module.exports = function (error) {
    return {
        message: error.msg,
        location: error.location,
        field: error.path,
        value: error.value
    }
}
