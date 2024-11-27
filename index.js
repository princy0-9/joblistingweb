const express = require("express")
const env = require("dotenv");
env.config();
const app = express();

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log("Server is running on port 3001")

})