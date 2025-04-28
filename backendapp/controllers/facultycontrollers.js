const Faculty = require('../models/Faculty')
const FCMapping = require('../models/FacultuyCourseMapping')
const SCMapping = require('../models/StudentCourseMapping')

const insertfaculty = async(request,response) =>{
  try {
    const input = request.body;
    const faculty = new Faculty(input)
    await faculty.save()
    response.send('Registered Successfully')
  } catch (e) {
    response.status(500).send(e.message);
  }
};

const checkfacultylogin = async (request, response) => 
{
   try 
   {
     const input = request.body
     console.log(input)
     const faculty = await Faculty.findOne(input)
     response.json(faculty)
   } 
   catch (error) 
   {
     response.status(500).send(error.message); //200 - success || 500 - error || 404 - not found 
   }
 };

 const changefacultylogin = async(request,response) => {
    try {
      const facultyid =request.params.facultyid
      const faculty = await Faculty.findOne({"facultyid":facultyid})
      faculty.isFirstLogin = false
      faculty.save()
      response.status(200).send("Faculty data is updated")
    } catch (error) {
      response.status(500).send(error.message);
    }
 }

 const getmappedcoursebyfacultyid = async(request,response) =>{
  try {
    const facultyid = request.params.facultyid
    const mappedcourses = await FCMapping.find({"facultyid":facultyid})
    if(mappedcourses){
      response.json(mappedcourses)
    }else{
      return response.status(200).send('No Courses are Mapped to the given Faculty');
    }
  } catch (error) {
    response.status(500).send(error.message);
  }
 }

 const getmappedstudentsbyfmapid = async(request,response) => {
  try {
      const fmapid = request.params.fmapid
      // const ccode = request.params.ccode
      const mappedcourses = await SCMapping.find({"fmapid":fmapid})
      if(mappedcourses){
        response.json(mappedcourses)
      }else{
        return response.status(200).send('No Students are Mapped to the given Faculty');
      }
  } catch(error){
    response.status(500).send(error.message);
  }
 }

 const changefacultypwd = async (request,response) => {
  try {
    const {facultyid,oldpassword,newpassword} = request.body;
    const faculty = await Faculty.findOne({'facultyid':facultyid,'password':oldpassword});
    if(!faculty)
        response.status(400).send("Invalid Old Password");
    else{
      if(oldpassword===newpassword)
          response.status(400).send("Both Passwords are Same")
      else{
        await Faculty.updateOne({facultyid},{$set: {password:newpassword}});
        response.status(200).json("Password Updated Successfully");
      }
    }
  } catch (error) {
    response.status(500).send(error.message);
  }
 }

module.exports={
  insertfaculty,
  checkfacultylogin,
  getmappedcoursebyfacultyid,
  changefacultypwd,
  changefacultylogin,
  getmappedstudentsbyfmapid,
}