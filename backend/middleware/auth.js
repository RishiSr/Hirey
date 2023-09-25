const jwt = require("jsonwebtoken");
const resp = require("../utils/response");
const { userModel } = require("../models/userModel");
function getToken(req) {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
        return req.headers.authorization.split(" ")[1];
    }
    return null;
}

const auth = async (req, res, next) => {
    try {
        let token = getToken(req);
        if (!token) {
            resp(res, "Unauthorised", 401, "No token found")
            return;
        }

        let tokenData = jwt.verify(token, process.env.SECRET_KEY_JWT);

        let user = await userModel.findOne({ _id: tokenData._id });
        let found = false;
        for (let i = 0; i < user.tokens.length; i++) {
            if (user.tokens[i].token == token) {
                found = true;
                break;
            }
        }

        if (found) {
            next();
        } else {
            resp(res, "Unauthorised", 401, "Invalid Token")

        }



    } catch (err) {
        resp(res, "Unauthorised", 401, "Invalid Token")
    }


}

module.exports = auth