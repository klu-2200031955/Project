import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import styles from '../../template.module.css';
import CourseRegistration from './../MyCourses/CourseRegistration';
import Materials from './../MyCourses/Materials';
import Attendance from '../MyCourses/Attendance';
import Uploads from '../MyCourses/Uploads';
import StudentNavBar from './StudentNavBar';
import Loader from '../../Loader';

export default function StudentMyCoursesNav() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); 
      try {
        const loadingTimeout = setTimeout(() => {
          setIsLoading(false); 
        }, 2000);
        return () => clearTimeout(loadingTimeout);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false); 
      }
    };
    fetchData(); 
  }, [location.pathname]);

  return (
    <div>
      {isLoading && <Loader />}
      <StudentNavBar />
      <div className={styles['frame22']}>
        <Link className={styles['text17']} to="/studentmycourses/courseregistration">Course Registration</Link>
        <Link className={styles['text19']} to="/studentmycourses/uploads">Courses Details</Link>
        <Link className={styles['text21']} to="/studentmycourses/materials">Materials</Link>
        <Link className={styles['text23']} to="/studentmycourses/attendance">Attendance</Link>
      </div>
      <Routes>
        <Route path="/courseregistration/*" element={<CourseRegistration />} exact />
        <Route path="/uploads/*" element={<Uploads />} exact />
        <Route path="/materials/*" element={<Materials />} exact />
        <Route path="/attendance/*" element={<Attendance />} exact />
      </Routes>
    </div>
  );
}
