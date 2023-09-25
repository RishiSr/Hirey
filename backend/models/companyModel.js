const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String

    },
    state: {
        type: String,

    },
    country: {
        type: String,
        required: true
    }, type: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
    , description: {
        type: String,
        required: true
    },
    link: {
        type: String
    },
    size: {
        type: String
    },
    logo: {
        type: String
    }

})


const companyModel = new mongoose.model("Company", companySchema);
module.exports = { companyModel }