const express = require("express");
const bcrypt = require("bcrypt");
const Jobs = require("../schema/jobschema");
const jobsRouter = express.Router();
const authMiddleware = require("../middlewares/auth");

jobsRouter.get("/jobs", async (req, res) => {
    try {
        const {limit, offset, salary, companyName, jobPosition, jobType} = req.query
        //const jobs = await Jobs.find();
        // const jobs = await Jobs.find().skip(offset).limit(limit);
        //const jobs = await Jobs.find({salary: {$gte: 200, $lte: 300}}).skip(offset).limit(limit);
       // const jobs = await Jobs.find({companyName: {$regex: companyName, $options: "i"}})
       //const jobs = await Jobs.find({companyName: {$regex: companyName, $options: "i"}, salary: 200})
       //http://localhost:3001/jobs?companyName=iv&jobType=full-time&jobPosition=deve&salary=400
       //const jobs = await Jobs.find({ $or:[{companyName: {$regex: companyName, $options: "i"}, salary: salary, jobPosition: jobPosition, jobType: jobType}]})

        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

jobsRouter.post("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const jobs = await Jobs.findById(id);
        if (!jobs) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

jobsRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const jobs = await Jobs.findById(id);
        if (!jobs) {
            return res.status(404).json({ message: "Job not found" });
        }
        res.status(200).json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

jobsRouter.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const jobs = await Jobs.findById(id);
        if (!jobs) {
            return res.status(404).json({ message: "Job not found" });
        }
        if (userId !== job.user.toString()) {
            return res.status(401).json({ message: "You are not authorized to delete this job" });
        }
        await Jobs.deleteOne({ _id: id });
        res.status(200).json({ message: "Job deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

jobsRouter.post("/", authMiddleware, async (req, res) => {
    try {
        const { companyName, logoUrl, jobPosition, salary, jobType, remoteType, location, jobDesc, aboutCompany, skills, information } = req.body;
        if (!companyName || !jobPosition || !salary || !jobType || !remoteType || !location || !jobDesc || !aboutCompany || !skills || !information) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const user = req.user;
        const jobs = await Jobs({
            companyName,
            logoUrl,
            jobPosition,
            salary,
            jobType,
            remoteType,
            jobDesc, 
            location,
            aboutCompany, 
            skills, 
            information,
            user: user._id,
        });
        const savedJobs = await jobs.save();

        res.status(200).json(savedJobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

jobsRouter.put("/:id", authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { companyName, jobPosition, salary, jobType } = req.body;
    const job = await Jobs.findById(id);
    if (!job) {
        return res.status(404).json({ message: "Job not found" });
    }
    if (job.user.toString() !== req.user.id) {  
        return res.status(401).json({ message: "You are not authorized to update this job" });
    }
    try {
        await Job.findByIdAndUpdate(id, {
            companyName,
            logoUrl,
            jobPosition,
            salary,
            jobType,
            remoteType,
            jobDesc, 
            aboutCompany, 
            skills, 
            information,
        });
        res.status(200).json({ message: "Job updated" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error in updating job" });
    }
})

module.exports = jobsRouter;
