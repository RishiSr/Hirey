const { default: mongoose } = require("mongoose");

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})


const skillModel = new mongoose.model("skill", skillSchema);
module.exports = { skillModel }