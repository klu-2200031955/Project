import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import styles from '../template.module.css';
import Dashboard from './Dashboard';
import Faculty from './Faculty';
import Student from './Student';
import Framing from './Framing';
import Course from './Course';
import mylogo from '../images/MY LOGO.jpg';
import Loader from '../Loader';
import { useNavigate } from 'react-router-dom';
import HCAPNav from '../main/HCAP/HCAPNav';

export default function AdminNavBar() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchSomeData();
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
    };
  }, []);

  const handleLogout = () => {
    setIsLoading(true);
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('admin');
    setTimeout(() => {
      navigate('/');
      window.location.reload();
    }, 2000);
  };

  const fetchSomeData = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  return (
    <div>
      {isLoading && <Loader />}
      <div className={styles['template']}>
        <div className={styles['group1']}></div>
        <div className={styles['group2']}></div>
        <span className={styles['text']}>
          <span>Call +9108-350-0122</span>
        </span>

        <img src={mylogo} alt='My Logo' className={styles['previewredirect6']} />

        <div className={styles['men-uitem-default']}>
          <Link className={styles['text31']} id='logout' onClick={handleLogout}>Logout</Link>
        </div>
        <div className={styles['frame22']}>
          <Link className={styles['text17']} to="/admindashboard">Dashboard</Link>
          <Link className={styles['text19']} to="/adminfaculty">Faculty</Link>
          <Link className={styles['text21']} to="/adminstudent">Student</Link>
          <Link className={styles['text23']} to="/admincourses">Course</Link>
          <Link className={styles['text25']} to="/adminframing">Framing</Link>
        </div>

        <Routes>
          <Route path="/admindashboard/*" element={<Dashboard />} exact />
          <Route path="/adminfaculty/*" element={<Faculty />} exact />
          <Route path="/adminstudent/*" element={<Student />} exact />
          <Route path="/adminframing/*" element={<Framing />} exact />
          <Route path="/admincourses/*" element={<Course />} exact />
        </Routes>
        <HCAPNav/>
      </div>
    </div>
  );
}
