import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutingsforApp from './RoutingsforApp';
import { useEffect, useState, useCallback } from 'react';
import AdminNavBar from './admin/AdminNavBar';
import StudentNavBar from './student/NavBars/StudentNavBar';
import FacultyNavBar from './faculty/NavBars/FacultyNavBar';
import Loader from './Loader';

function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isStudentLoggedIn, setIsStudentLoggedIn] = useState(false);
  const [isFacultyLoggedIn, setIsFacultyLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const INACTIVITY_LIMIT = 10 * 60 * 1000;

  const logout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('isStudentLoggedIn');
    localStorage.removeItem('isFacultyLoggedIn');
    localStorage.removeItem('lastActivityTime');
    setIsAdminLoggedIn(false);
    setIsStudentLoggedIn(false);
    setIsFacultyLoggedIn(false);
  };

  const updateLastActivityTime = useCallback(() => {
    localStorage.setItem('lastActivityTime', Date.now().toString());
  }, []);

  const checkInactivity = useCallback(() => {
    const lastActivityTime = parseInt(localStorage.getItem('lastActivityTime'), 10);
    if (lastActivityTime && Date.now() - lastActivityTime > INACTIVITY_LIMIT) {
      logout();
    }
  }, [INACTIVITY_LIMIT]);

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    const studentLoggedIn = localStorage.getItem('isStudentLoggedIn') === 'true';
    const facultyLoggedIn = localStorage.getItem('isFacultyLoggedIn') === 'true';

    setIsAdminLoggedIn(adminLoggedIn);
    setIsStudentLoggedIn(studentLoggedIn);
    setIsFacultyLoggedIn(facultyLoggedIn);

    updateLastActivityTime();

    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    const inactivityInterval = setInterval(() => {
      checkInactivity();
    }, 60000);

    return () => {
      clearTimeout(loadingTimeout);
      clearInterval(inactivityInterval);
    };
  }, [checkInactivity, updateLastActivityTime]);

  useEffect(() => {
    const resetInactivityTimer = () => updateLastActivityTime();
    window.addEventListener('click', resetInactivityTimer);
    window.addEventListener('keypress', resetInactivityTimer);

    return () => {
      window.removeEventListener('click', resetInactivityTimer);
      window.removeEventListener('keypress', resetInactivityTimer);
    };
  }, [updateLastActivityTime]);

  const onAdminLogin = () => {
    localStorage.setItem('isAdminLoggedIn', 'true');
    setIsAdminLoggedIn(true);
    updateLastActivityTime();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 5000);
  };

  const onStudentLogin = () => {
    localStorage.setItem('isStudentLoggedIn', 'true');
    setIsStudentLoggedIn(true);
    updateLastActivityTime();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 5000);
  };

  const onFacultyLogin = () => {
    localStorage.setItem('isFacultyLoggedIn', 'true');
    setIsFacultyLoggedIn(true);
    updateLastActivityTime();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 5000);
  };

  return (
    <Router>
      {isLoading && <Loader />}
      <div className="App">
        {isAdminLoggedIn ? (
          <AdminNavBar />
        ) : isStudentLoggedIn ? (
          <StudentNavBar />
        ) : isFacultyLoggedIn ? (
          <FacultyNavBar />
        ) : (
          <RoutingsforApp
            onAdminLogin={onAdminLogin}
            onStudentLogin={onStudentLogin}
            onFacultyLogin={onFacultyLogin}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
