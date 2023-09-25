const { default: mongoose } = require("mongoose");

const uri = `mongodb+srv://rishisr4409:${process.env.DB_PASSWORD}@cluster0.qbcy5w5.mongodb.net/?retryWrites=true&w=majority`;

async function connectDB() {
    try {
        mongoose.connect(uri,
            {
                useNewUrlParser: true, useUnifiedTopology: true
            }
        );

        console.log("DB Connected");
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB