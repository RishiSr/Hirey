const { userModel } = require("../models/userModel");
const resp = require("../utils/response");

const resume = async (req, res) => {

    try {

        let { resume, id } = req.body;
        resume = resume.replace(".pdf", ".jpg");
        const updatedObj = {
            resume
        }
        let response = await userModel.updateOne({ _id: id }, updatedObj)
        resp(res, response, 201, "Resume Added")
    }
    catch (err) {
        console.log(err);
        resp(res, err, 500, "Something went wrong")
    }



}

const getResume = async (req, res) => {
    try {
        const { id } = req.params;
        let response = await userModel.find({ _id: id }).select('resume');
        resp(res, response[0], 202, "Resume Found")
    } catch (err) {
        console.log(err);
        resp(res, err, 500, "Internal Server Error")

    }
}

const logout = async (req, res) => {
    try {
        const { id, token } = req.body;

        let userTokens = await userModel.findOne({ _id: id }).select("tokens");

        let temp = userTokens.tokens;


        temp = temp.filter((item) => {
            if (item.token != token) {
                return item;
            }
        })

        let response = await userModel.updateOne({ _id: id }, { tokens: [...temp] });



        resp(res, response, 201, "Logged Out")
    } catch (err) {
        console.log(err);
        resp(res, err, 500, "Something went wrong")
    }

}


const update = async (req, res) => {
    try {
        const { name, email, bio, skills, password } = req.body;
        const { id } = req.params;

        const updatedObj = {
            ...(name ? { name: name } : {}),
            ...(email ? { email: email } : {}),
            ...(bio ? { bio: bio } : {}),

            ...(skills ? { skills: skills } : {}),
            ...(password ? { password: password } : {}),


        }
        console.log(updatedObj)
        let response = await userModel.updateOne({ _id: id }, updatedObj)

        resp(res, response, 201, "User updated")
    } catch (err) {
        console.log(err)
        resp(res, err, 500, "Internal Server Error")
    }
}
const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        let response = await userModel.findOne({ _id: id }).select("-tokens");
        console.log(response);
        resp(res, response, 201, "User Fetched");
    }
    catch (err) {
        console.log(err);
        resp(res, err, 500, "Something");
    }
}

const updatePassword = async (req, res) => {
    try {
        const { oldP, newP, id } = req.body;
        const user = await userModel.findOne({ _id: id });

        let isMatch = await bcrypt.compare(oldP, user.password)

        if (isMatch) {
            let temp = await bcrypt.hash(newP, 10);
            let response = await userModel.findOneAndUpdate({ _id: id }, { password: temp });
            resp(res, response, 201, "Password Updated");
        } else {
            resp(res, {}, 401, "Wrong Current Password");
        }
    } catch (err) {
        console.log(err)
        resp(res, err, 500, "Something went wrong")
    }


}

module.exports = { resume, getResume, logout, update, getUser, updatePassword }