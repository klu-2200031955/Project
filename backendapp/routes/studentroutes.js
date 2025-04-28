const studentcontroller = require('../controllers/studentcontrollers')

const express  = require("express");
const studentrouter = express.Router()

studentrouter.post("/insertstudent",studentcontroller.insertstudent)
studentrouter.post("/checkstudentlogin",studentcontroller.checkstudentlogin)
studentrouter.put("/changestudentlogin/:studentid",studentcontroller.changestudentlogin)
studentrouter.get("/getcoursebyay/:ay",studentcontroller.getcoursebyay)
studentrouter.get("/getfacultybyccode/:ccode",studentcontroller.getfacultybyccode)
studentrouter.post("/insertstudentcourses",studentcontroller.insertstudentcourses)
studentrouter.get("/viewstudentcourses/:studentid",studentcontroller.viewstudentcourses)
studentrouter.put("/changestudentpwd",studentcontroller.changestudentpwd)

module.exports = studentrouter