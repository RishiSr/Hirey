const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const jobSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tags: [
        {
            tag: {
                type: String
            }
        }
    ],

    recruiter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recruiter"
    },



    salary: [
        {
            from: {
                type: String
            }
        },
        {
            to: {
                type: String
            }
        }
    ],
    applyBy: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    skills: {
        type: String,
        required: true
    },
    optSkills: {
        type: String
    },
    status: {
        type: String
    },
    companyLogo: {
        type: String
    },
    companyname: {
        type: String
    },
    type: {
        type: String
    },
    openings: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    wrkHrs: {
        type: String,
        required: true
    },
    mode: {
        type: String,
        required: true
    },
    startDate: {
        type: String
    }

    ,
    applicantsCount: {
        type: Number,
        default: 0
    }


})



// jobSchema.pre("save", async function (next) {

//     console.log(this)

//     this.applicantsCount = this.applicants.length;



//     next();
// })
const jobModel = new mongoose.model("job", jobSchema);
module.exports = { jobModel }