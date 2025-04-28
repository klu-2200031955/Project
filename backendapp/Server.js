const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Admin = require('./models/Admin');
require('dotenv').config();

const dburl = process.env.MONGO_URL;
mongoose.connect(dburl).then(async () => {
    console.log("Connected to DB Successfully");

    const existingAdmin = await Admin.findOne({ email: "admin@gmail.com" });
    if (!existingAdmin) {
        const newAdmin = new Admin({
            email: "admin@gmail.com",
            password: "admin",
            role: "admin"
        });
        await newAdmin.save();
        console.log("Default admin created");
    } else {
        console.log("Admin already exists");
    }

}).catch((e) => {
    console.log(e.message);
});

const app = express();
app.use(express.json());
app.use(cors());

const studentrouter = require('./routes/studentroutes');
const facultyrouter = require('./routes/facultyroutes');
const adminrouter  = require('./routes/adminroutes');
const courserouter = require('./routes/courseroutes');

app.use("", studentrouter);
app.use("", facultyrouter);
app.use("", adminrouter);
app.use("", courserouter);

const port = process.env.PORT || 2032;
app.listen(port, () => {
    console.log(`Server is running at the port ${port}`);
});
