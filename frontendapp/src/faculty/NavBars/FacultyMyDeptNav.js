import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import styles from '../../template.module.css';
import FacultyNavBar from './FacultyNavBar';
import Assignments from '../MyDept/Assignments';
import MyCourseDetails from '../MyDept/MyCourseDetails';
import Guides from '../MyDept/Guides';
import Uploadfiles from '../MyDept/Uploadfiles';
import OnlinePeriods from '../MyDept/OnlinePeriods';
import Loader from '../../Loader';

export default function FacultyMyDeptNav() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };
    fetchData();
    return () => {
    };
  }, [location.pathname]);

  return (
    <div>
      {isLoading && <Loader />} 
      <FacultyNavBar />
      <div className={styles['frame22']}>
        <Link className={styles['text17']} to="/facultymydept/facultymycoursedetails">My Course Details</Link>
        <Link className={styles['text19']} to="/facultymydept/facultyguides">Guides</Link>
        <Link className={styles['text21']} to="/facultymydept/facultyassignments">Assignments</Link>
        <Link className={styles['text23']} to="/facultymydept/facultyuploadfiles">Upload Files</Link>
        <Link className={styles['text25']} to="/facultymydept/facultyonlineperiods">Online Periods</Link>
      </div>
      <Routes>
        <Route path="/facultyassignments/*" element={<Assignments />} exact />
        <Route path="/facultymycoursedetails/*" element={<MyCourseDetails />} exact />
        <Route path="/facultyguides/*" element={<Guides />} exact />
        <Route path="/facultyuploadfiles/*" element={<Uploadfiles />} exact />
        <Route path="/facultyonlineperiods/*" element={<OnlinePeriods />} exact />
      </Routes>
    </div>
  );
}
