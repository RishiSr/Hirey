const { userModel } = require("../models/userModel");
const resp = require("../utils/response");

const register = async (req, res) => {
    // const { email, password, name } = req.body;
    try {
        const { email, password, name } = req.body
        console.log({
            email, password, name
        })
        // return;  
        const newUser = new userModel({
            name: name,
            email: email,
            password: password,

        })

        const token = await newUser.generateToken();
        const res1 = await newUser.save();


        console.log("User saved")
        resp(res, { ...res1._doc, token: token }, 201, "User Created")
    }
    catch (err) {
        resp(res, err, 500, "Something went wrong")
    }

}



module.exports = { register }