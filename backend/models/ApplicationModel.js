const { default: mongoose } = require("mongoose");

const applicationSchema = new mongoose.Schema({
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    name: {
        type: String,
    },
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "job"
    },
    status: {
        type: String,
        default: "Applied"
    },
    date: {
        type: Date
    },
    message: {
        type: String
    }

})

const applicationModel = new mongoose.model("applicant", applicationSchema);
module.exports = { applicationModel };
