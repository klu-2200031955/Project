import React, { useState,useEffect } from 'react';
import './Login.css'
import axios from 'axios'
import ReCAPTCHA from 'react-google-recaptcha';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import config from './../config';



function Login({ closePopup,onAdminLogin,onFacultyLogin,onStudentLogin }) {
  const [formData,setFormData] = useState({
    email:"",
    password:"",
  });
  const [message,setMessage] = useState();
  const [error,setError] = useState();
  const [capVal,setCapVal] = useState();
  const [showPassword,setShowPassword] = useState(false);
  const navigate = useNavigate();


  const handleChange = (e) =>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const admin = await axios.post(`${config.url}/checkadminlogin`, formData);
    const faculty = await axios.post(`${config.url}/checkfacultylogin`, formData);
    const student = await axios.post(`${config.url}/checkstudentlogin`, formData);

    try {
      if(admin.data!=null){
        onAdminLogin();
        localStorage.setItem('admin', JSON.stringify(admin.data));
        navigate("/admindashboard")
        // window.location.reload();
      }else if(student.data!=null){
        onStudentLogin()
        localStorage.setItem('student', JSON.stringify(student.data));
        if(student.data.isFirstLogin){
          navigate("/studenthome/studentchangepassword");
        }
        navigate("/studenthome/studentdashboard")
        // window.location.reload();
      }else if(faculty.data!=null){
        onFacultyLogin()
        localStorage.setItem('faculty', JSON.stringify(faculty.data));
        if(faculty.data.isFirstLogin){
          navigate("/facultyhome/facultychangepassword")
        }
        navigate("/facultyhome/facultydashboard")
        // window.location.reload();
      }else{
        setMessage("Login Failed")
        setError("")
      }
    } catch (e) {
      setError(e.message)
      setMessage("")
    }
  }

  const togglePassword = () =>{
    setShowPassword(!showPassword)
  }

  const handleClose = () => {
       closePopup(); 
  };
  useEffect(() => {
    const close = (e) => {
      if(e.keyCode === 27){
        handleClose();
      }
    }
    window.addEventListener('keydown', close)
  return () => window.removeEventListener('keydown', close)
})
  return (
    <div className="popup active">
      <div className="close-btn" onClick={handleClose}>&times;</div>
      <form className="form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {
          message?<h4 align='center' style={{color:"red"}}>{message}</h4>:<h4 align='center' style={{color:"red"}}>{error}</h4>
        }
        <div className="form-element">
          <input type="email" id="email" placeholder="Enter Email Address" onChange={handleChange} required/>
        </div>
        <div className="form-element" >
            <input type={showPassword ? 'text' : 'password'} id="password" value={formData.password} onChange={handleChange} placeholder='Enter your Password' required/>
            <button type="button" className="show-password" onClick={togglePassword}>
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>

        </div>
        
        <ReCAPTCHA sitekey='6LdOVQcrAAAAAAXSEcRmb4c3QoZWG4e-TOBnavN4' onChange={(val) => setCapVal(val)} align='center'/>
        <div className='form-element'>
        </div>
        <div align="center">
          <button type="submit" className="button" disabled={!capVal}>Sign in</button>
        </div>
      </form>

      
    </div>   
  );
}

export default Login;
