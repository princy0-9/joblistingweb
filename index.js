const express = require("express")
const path = require("path");
const mongoose = require("mongoose")
const env = require("dotenv");
const userRouter = require("./routes/User");
env.config();
const app = express();
app.use(express.json())

const PORT = process.env.PORT || 3001

app.use("/", userRouter)
app.listen(PORT, () => {
    console.log("Server is running on port 3001")
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("MongoDB connected");
    }).catch((err) => {
        console.log(err);
    });
})