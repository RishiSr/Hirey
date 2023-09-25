const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const recruiterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company"
    },
    date: {
        type: Date,
        default: Date.now
    }, tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]

})

recruiterSchema.methods.generateToken = async function () {
    try {
        console.log(this)
        let token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY_JWT);
        this.tokens = this.tokens.concat({
            token: token
        })
        await this.save();

        return "token";
    } catch (err) {
        console.log(err)
    }
}

recruiterSchema.pre("save", async function (next) {

    console.log(this)
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);

    }

    next();
})

// recruiterSchema.pre("findOneAndUpdate", async function (next) {
//     console.log(this)
//     if (this.isModified("password")) {
//         this.password = await bcrypt.hash(this.password, 10);

//     }
//     next();
// });


const recruiterModel = new mongoose.model("Recruiter", recruiterSchema);
module.exports = { recruiterModel }