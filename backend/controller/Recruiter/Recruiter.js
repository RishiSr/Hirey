const { recruiterModel } = require("../../models/recruiterModel");
const resp = require("../../utils/response");
const bcrypt = require("bcryptjs")

const getRecruiter = async (req, res) => {
    try {
        const res1 = await recruiterModel.findOne({ _id: req.params.id }).populate('company');
        resp(res, res1, 201, "Recruiter Fetched");
    }
    catch (err) {
        console.log(err);
    }


}
const update = async (req, res) => {
    try {
        const { name, email, id } = req;
        const temp = {
            ...(name ? { name: name } : {}),
            ...(email ? { email: email } : {})
        }
        const res1 = await recruiterModel.findOneAndUpdate({ _id: id }, temp);
        resp(res, res1, 201, "Recruiter Updated");

    } catch (err) {
        console.log(err);
        resp(res, 500, err, "Something went wrong");
    }
}

const updatePassword = async (req, res) => {
    try {
        const { oldP, newP, id } = req.body;
        const recruiter = await recruiterModel.findOne({ _id: id });

        let isMatch = await bcrypt.compare(oldP, recruiter.password)

        if (isMatch) {
            let temp = await bcrypt.hash(newP, 10);
            let response = await recruiterModel.findOneAndUpdate({ _id: id }, { password: temp });
            resp(res, response, 201, "Password Updated");
        } else {
            resp(res, {}, 401, "Wrong Current Password");
        }
    } catch (err) {
        console.log(err)
        resp(res, err, 500, "Something went wrong")
    }


}

module.exports = { getRecruiter, updatePassword };