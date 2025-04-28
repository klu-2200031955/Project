const Student = require("../models/Student")  
const Course = require("../models/Course")
const FCMapping = require("../models/FacultuyCourseMapping")
const SCMapping = require("../models/StudentCourseMapping")


const insertstudent = async (request, response) => {
    try 
    {
      const input = request.body;
      const student = new Student(input);
      await student.save();
      response.send('Registered Successfully');
    } 
    catch(e) 
    {
      response.status(500).send(e.message);
    }
};

const checkstudentlogin = async (request, response) => 
{
   try 
   {
     const input = request.body
     console.log(input)
     const student = await Student.findOne(input)
     response.json(student)
   } 
   catch (error) 
   {
     response.status(500).send(error.message); //200 - success || 500 - error || 404 - not found 
   }
 };

 const getStudentbyId = async(request,response) =>{
  try {
    const studentid = request.params.studentid
    const student = await Student.findById(studentid)
    response.json(student)
  } catch (error) {
    response.status(500).send(error.message);
  }
 }

 const changestudentlogin = async (request,response) => {
  try {
    const studentid = request.params.studentid
    const student = await Student.findOne({"studentid":studentid})
    student.isFirstLogin = false
    student.save()
    response.status(200).send("Student Data Updated Successfully")
  } catch (error) {
    response.status(500).send(error.message);
  }
 }

 const getcoursebyay = async (request,response) =>{
  try {
    const ay = request.params.ay
    const courses = await Course.find({"ay":ay})
    if(courses)
     response.json(courses)
    else
      response.send("Data Not Found")
  } catch (error) {
    response.status(500).send(error.message);
  }
 }

 const getfacultybyccode = async (request,response) => {
  try {
    const ccode = request.params.ccode
    const mappedfaculty = await FCMapping.find({"ccode":ccode})
    if(mappedfaculty)
      response.json(mappedfaculty)
    else
      response.send("Data Not Found")
  } catch (error) {
    response.status(500).send(error.message)
  }
 }

 const insertstudentcourses = async (request, response) => {
  try {
      const inputData = request.body;
      const smapcourse = new SCMapping(inputData);
      await smapcourse.save();
      response.status(200).json({ success: true, message: 'Data registered successfully' });
  } catch (error) {
      console.error('Error occurred while saving data:', error.message);
      response.status(500).json({ success: false, error: error.message });
  }
};

const viewstudentcourses = async (request,response) =>{
  try {
    const studentid = request.params.studentid
    const scourses = await SCMapping.find({"studentid":studentid})
    if(scourses)
      response.json(scourses)
    else
      response.send("No Data Found for this Student ID.")
  } catch (error) {
    response.status(500).send(error.message)
  }
}


const changestudentpwd = async (request,response) => {
  try {
    const {studentid,oldpassword,newpassword} = request.body;
    const student = await Student.findOne({"studentid":studentid,"password":oldpassword})
    if(!student)
      response.status(400).send("Invalid Old Password");
    else{
      if(oldpassword===newpassword){
        response.status(400).send("Both Passwords are Same")
      }else{
        await Student.updateOne({studentid},{$set: {password:newpassword}});
        response.status(200).json("Password Updated Successfully");
      }
    }
  } catch (error) {
    response.status(500).send(error.message);
  }
}


module.exports = {
  insertstudent,
  checkstudentlogin,
  getcoursebyay,
  getfacultybyccode,
  insertstudentcourses,
  viewstudentcourses,
  changestudentpwd,
  changestudentlogin,

};