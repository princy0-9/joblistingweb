const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    logoUrl:{
        type: String,
        require: true,
        default: "https://cdn-icons-png.flaticon.com/512/4778/4778498.png"
    },
    jobPosition: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    jobType: {
        type: String,
        required: true,
        enum: ["full-time", "part-time", "contract", "internship", "freelance"],
    },
    remoteType:{
        type: String,
        required: true,
        enum: ["Remote", "office"],
    },
    location: {
        type: String,
        required: true,
    },
    jobDesc:{
        type: String,
        required: true
    },
    aboutCompany:{
        type: String,
        required: true
    },
    skills:{
        type: String,
        required: true,
    },
    information:{
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
});

module.exports = mongoose.model("Jobs", jobSchema)