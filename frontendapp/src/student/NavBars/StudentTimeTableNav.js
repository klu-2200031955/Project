import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import styles from '../../template.module.css';
import Exams from './../TimeTable/Exams';
import Classes from '../TimeTable/Classes';
import StudentNavBar from './StudentNavBar';
import Loader from '../../Loader';

export default function StudentTimeTableNav() {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true); 
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false); 
    }, 2000);

    return () => clearTimeout(loadingTimeout); 
  }, [location.pathname]); 

  return (
    <div>
        {isLoading && <Loader />}
        <StudentNavBar/>
        <div className={styles['frame22']}>
            <Link className={styles['text17']} to="/studenttimetable/classes">Classes</Link>
            <Link className={styles['text19']} to="/studenttimetable/exams">Exams</Link>       
        </div>

        <Routes>
            <Route path="/classes" element={<Classes/>} exact/>
            <Route path="/exams" element={<Exams/>} exact/>
        </Routes>
    </div>
  )
}
