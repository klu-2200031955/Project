import React,{useState,useEffect} from 'react';
import styles from '../../template.module.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../home.css';
import FacultyHomeNav from '../NavBars/FacultyHomeNav';
import '../../main/forgetpage.css'
import config from '../../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ChangePassword() {
  const [facultyData, setFacultyData] = useState("");

    useEffect(() => {
      const storedFacultyData = localStorage.getItem('faculty');
      if (storedFacultyData) {
        const parsedFacultyData = JSON.parse(storedFacultyData);
        setFacultyData(parsedFacultyData);
      }
    }, []);

  const [formData, setFormData] = useState({
    oldpassword: '',
    newpassword: ''
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try 
    {
      const response = await axios.put(`${config.url}/changefacultypwd`, {...formData,"facultyid":facultyData.facultyid});
      if(facultyData.isFirstLogin)
          await axios.put(`${config.url}/changefacultylogin/${facultyData.facultyid}`)
      if (response.data != null) 
      {
        navigate('/facultyhome/facultydashboard');
        window.location.reload()
      } 
      else 
      {
        setMessage("Old Password is Incorrect");
        setError("");
      }
    } catch (error) {
      setMessage("");
      setError(error.response.data);
    }
  };
  return (
    <div>
      <FacultyHomeNav />
      <div className={styles['group100']}>
        <div className='framee-1'>
          <div className='framee-5'>
            <center>
            <div class="container--1">
              <form onSubmit={handleSubmit}>
                <center>
                    <div class="title">Change Password</div>
                </center>
                {
                      message ? <h4 align="center" style={{color:'green'}}>{message}</h4> : <h4 align="center" style={{color:"red"}}>{error}</h4>
                }
                <div class="input-box underline">
                  <input type="text" id="oldpassword" placeholder="Old Password" value={formData.oldpassword} onChange={handleChange} required/>
                  <div class="underline"></div>
                </div>
                <div class="input-box underline">
                  <input type="text" id="newpassword" placeholder="New Password" value={formData.newpassword} onChange={handleChange} required/>
                  <div class="underline"></div>
                </div>
                {/* <div class="input-box underline">
                    <input type="text" name="phno" placeholder="Confirm Password" required/>
                    <div class="underline"></div>
                </div> */}
                <div class="input-box button">
                  <input type="submit" value="Update Password"/>
                </div>
                <div class="input-box button">
                  <input type="reset" value="Reset"/>
                </div>
              </form>
            </div>
            </center>
          </div>
        </div>
      </div>
    </div>
  )
}
