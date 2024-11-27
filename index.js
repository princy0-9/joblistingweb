const express = require("express")
const path = require("path");
const mongoose = require("mongoose")

const env = require("dotenv");
env.config();
const app = express();

const PORT = process.env.PORT || 3001

app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "try.html"));
});
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