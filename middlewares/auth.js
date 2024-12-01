const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    console.log(req.headers)
    if (!token) {
        return res.status(401).json({ message: "Please login!!" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};
module.exports = authMiddleware;