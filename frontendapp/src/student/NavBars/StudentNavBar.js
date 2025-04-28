import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import styles from '../../template.module.css';
import mylogo from '../../images/MY LOGO.jpg';
import { useNavigate } from 'react-router-dom';
import StudentHomeNav from './StudentHomeNav';
import StudentMyCoursesNav from './StudentMyCoursesNav';
import StudentTimeTableNav from './StudentTimeTableNav';
import HCAPNav from '../../main/HCAP/HCAPNav';
import Loader from '../../Loader';

export default function StudentNavBar() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const change1 = () => {
    resetNavStyles();
    document.getElementById("home").style.backgroundColor = 'black';
    document.getElementById("home").style.color = 'white';
    document.getElementById("home").style.borderRadius = '50px';
    document.getElementById("home").style.height = '100%';
  };

  const change2 = () => {
    resetNavStyles();
    document.getElementById("mycourse").style.backgroundColor = 'black';
    document.getElementById("mycourse").style.color = 'white';
    document.getElementById("mycourse").style.borderRadius = '50px';
    document.getElementById("mycourse").style.height = '100%';
  };

  const change3 = () => {
    resetNavStyles();
    document.getElementById("timetable").style.backgroundColor = 'black';
    document.getElementById("timetable").style.color = 'white';
    document.getElementById("timetable").style.borderRadius = '50px';
    document.getElementById("timetable").style.height = '100%';
  };

  const change4 = () => {
    resetNavStyles();
    document.getElementById("logout").style.backgroundColor = 'black';
    document.getElementById("logout").style.color = 'white';
    document.getElementById("logout").style.borderRadius = '50px';
    document.getElementById("logout").style.height = '100%';
  };

  const resetNavStyles = () => {
    document.getElementById("home").style.backgroundColor = '';
    document.getElementById("home").style.color = '';
    document.getElementById("home").style.borderRadius = '';
    document.getElementById("home").style.height = '';

    document.getElementById("mycourse").style.backgroundColor = '';
    document.getElementById("mycourse").style.color = '';
    document.getElementById("mycourse").style.borderRadius = '';
    document.getElementById("mycourse").style.height = '';

    document.getElementById("timetable").style.backgroundColor = '';
    document.getElementById("timetable").style.color = '';
    document.getElementById("timetable").style.borderRadius = '';
    document.getElementById("timetable").style.height = '';

    document.getElementById("logout").style.backgroundColor = '';
    document.getElementById("logout").style.color = '';
    document.getElementById("logout").style.borderRadius = '';
    document.getElementById("logout").style.height = '';
  };

  const handleLogout = () => {
    setIsLoading(true);
    localStorage.removeItem('isStudentLoggedIn');
    localStorage.removeItem('student');
    navigate('/');
    window.location.reload();
  };

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(loadingTimeout);
  }, [location.pathname]);

  return (
    <div>
      {isLoading && <Loader />}
      <div className={styles.template}>
        <div className={styles.group1}></div>
        <div className={styles.group2}></div>
        <span className={styles.text}>
          <span>Call +9108-350-0122</span>
        </span>

        <img src={mylogo} alt="Logo" className={styles.previewredirect6} />

        <div className={styles['men-uitem-default3']}>
          <Link id="home" className={styles.text39} onClick={change1} to="/studenthome/studentdashboard">Home</Link>
        </div>
        <div className={styles['men-uitem-variant2']}>
          <Link id="mycourse" className={styles.text35} onClick={change2} to="/studentmycourses/courseregistration">My Courses</Link>
        </div>
        <div className={styles['men-uitem-default1']}>
          <Link id="timetable" className={styles.text33} onClick={change3} to="/studenttimetable/classes">Time Table</Link>
        </div>
        <div className={styles['men-uitem-default']}>
          <Link id="logout" className={styles.text31} onClick={() => { change4(); handleLogout(); }}>Logout</Link>
        </div>

        <Routes>
          <Route path='/studenthome/*' element={<StudentHomeNav />} exact />
          <Route path='/studentmycourses/*' element={<StudentMyCoursesNav />} exact />
          <Route path='/studenttimetable/*' element={<StudentTimeTableNav />} exact />
        </Routes>
        <HCAPNav />
      </div>
    </div>
  );
}
