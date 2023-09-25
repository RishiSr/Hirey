const { skillModel } = require("../models/skillModel");
const resp = require("../utils/response");

const createSkill = (req, res) => {
    const skillName = req.body.name;

    const newSkill = new skillModel({
        name: skillName
    })

    newSkill.save().then((result) => {
        console.log(result)
        resp(res, "New Skill Added", 200, "Skill Added");
    }).catch((err) => {
        console.log(err)
        resp(res, err, 500, "Something went wrong");
    })
}

const getSkills = async (req, res) => {
    try {
        let data = await skillModel.find();
        let result = data.map((item) => item.name)
        console.log(result)
        resp(res, result, 200, "Something went wrong");
    }
    catch (err) {
        resp(res, err, 500, "Something went wrong");
    }

}

module.exports = {
    createSkill, getSkills
}