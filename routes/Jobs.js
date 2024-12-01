const express = require("express");
const bcrypt = require("bcrypt");
const Jobs = require("../schema/jobschema");
const jobsRouter = express.Router();
const authMiddleware = require("../middlewares/auth");

jobsRouter.get("/", async (req, res) => {
    try {
        const jobs = await Jobs.find();
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
