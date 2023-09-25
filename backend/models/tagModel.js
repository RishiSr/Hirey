const { default: mongoose } = require("mongoose");

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})


const tagModel = new mongoose.model("tag", tagSchema);
module.exports = { tagModel }