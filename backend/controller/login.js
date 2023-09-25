const { userModel } = require("../models/userModel");
const bcrypt = require("bcryptjs");
const resp = require("../utils/response");
async function login(req, res) {
    try {

        const email = req.body.email;
        const password = req.body.password

        const user = await userModel.findOne({ email: email });

        console.log(user)
        let isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            await user.generateToken();
            resp(res, { id: user._id, token: user.tokens[user.tokens.length - 1].token }, 200, "Success")
        } else {
            console.log("Rishi")
            resp(res, {}, 400, "Invalid Credentials")
        }
    }
    catch (err) {
        console.log(err)
        resp(res, err, 500, "Internal Server Error")
    }
    // res.send("User founr")

}


module.exports = { login }