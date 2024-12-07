const express = require("express")
const path = require("path");
const mongoose = require("mongoose")
const env = require("dotenv");
const cors = require("cors")
const userRouter = require("./routes/User");
const bodyParser = require("body-parser");

const jobsRouter = require("./routes/Jobs");
env.config();
const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3001
app.use(cors({
    origin: "http://localhost:5173"
}))

app.use("/", userRouter)
app.use("/", jobsRouter)

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