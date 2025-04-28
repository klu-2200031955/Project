const facultycontroller = require('../controllers/facultycontrollers')

const express = require("express")
const facultyrouter = express.Router()

facultyrouter.post("/insertfaculty",facultycontroller.insertfaculty)
facultyrouter.post("/checkfacultylogin",facultycontroller.checkfacultylogin)
facultyrouter.put("/changefacultylogin/:facultyid",facultycontroller.changefacultylogin)
facultyrouter.get("/getcoursebyid/:facultyid",facultycontroller.getmappedcoursebyfacultyid)
facultyrouter.put("/changefacultypwd",facultycontroller.changefacultypwd)
facultyrouter.get("/getmappedstudents/:fmapid",facultycontroller.getmappedstudentsbyfmapid)

module.exports = facultyrouter