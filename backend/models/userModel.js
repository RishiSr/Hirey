const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userSchema = new mongoose.Schema({
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
    ],
    resume: {
        type: String
    },
    skills: {
        type: String
    },
    bio: {
        type: String
    }

})

userSchema.methods.generateToken = async function () {
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

userSchema.pre("save", async function (next) {

    console.log(this)
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);

    }

    next();
})


const userModel = new mongoose.model("User", userSchema);
module.exports = { userModel }