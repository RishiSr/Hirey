const { recruiterModel } = require("../../models/recruiterModel");
const { companyModel } = require("../../models/companyModel")
const bcrypt = require("bcryptjs");
const resp = require("../../utils/response");
async function login(req, res, err) {
    try {
        const email = req.body.email;
        const password = req.body.password


        const user = await recruiterModel.findOne({ email: email });

        // console.log(user)
        let isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            await user.generateToken();
            // console.log(user.tokens, "Rishi")
            resp(res, { id: user._id, token: user.tokens[user.tokens.length - 1].token }, 200, "Success")
        } else {
            res.status(400).send("Invalid Credentials")
        }
    }
    catch (err) {
        res.status(500).send("Something went wrong")
    }
    // res.send("User founr")

}

const createCompany = async (companyName, type, companyDesc, companyLink, companySize, location, logo) => {
    console.log({
        name: companyName,
        city: location[2] || "",
        state: location[1] || "",
        country: location[0], type: type,
        description: companyDesc,
        link: companyLink,
        size: companySize, logo
    })
    const newComp = new companyModel({
        name: companyName,
        city: location[2] || "",
        state: location[1] || "",
        country: location[0], type: type,
        description: companyDesc,
        link: companyLink,
        size: companySize,
        logo
    });
    const res = await newComp.save();
    return res._id;

}

const register = async (req, res) => {
    // const { email, password, name } = req.body;
    try {
        console.log(req.body)

        const { email, password, name, companyName, companyDesc, companyLink, companySize, location, type, logo } = req.body;
        const companyObj = await createCompany(companyName, type, companyDesc, companyLink, companySize, location, logo);
        const newUser = new recruiterModel({
            name: name,
            email: email,
            password: password,
            company: companyObj


        })

        const token = await newUser.generateToken();
        const res1 = await newUser.save();
        console.log("Recruiter saved")
        resp(res, "User Created", 200)
    }
    catch (err) {
        console.log(err)
        resp(res, "Something went wrong", 500, err)
    }

}


const logout = async (req, res) => {
    try {
        const { id, token } = req.body;

        let userTokens = await recruiterModel.findOne({ _id: id }).select("tokens");

        let temp = userTokens.tokens;


        temp = temp.filter((item) => {
            if (item.token != token) {
                return item;
            }
        })

        let response = await recruiterModel.updateOne({ _id: id }, { tokens: [...temp] });



        resp(res, response, 201, "Logged Out")
    } catch (err) {
        console.log(err);
        resp(res, err, 500, "Something went wrong")
    }

}


module.exports = { login, register, logout }