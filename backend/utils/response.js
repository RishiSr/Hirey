const resp = (res, data, status = 200, msg = "") => {
    return res.status(status).send({
        data,
        message: msg
    })
}
module.exports = resp