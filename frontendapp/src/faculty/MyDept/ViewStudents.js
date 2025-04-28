import React, { useCallback, useEffect, useState } from 'react';
import config from '../../config';
import axios from 'axios';

export default function ViewStudents({ closePopup, fmapid }) {
  const [student, setStudent] = useState([]);

  useEffect(() => {
    if (fmapid) {
      fetchStudents(fmapid);
    }
  }, [fmapid]);

  const fetchStudents = async (fmapid) => {
    try {
      const response = await axios.get(`${config.url}/getmappedstudents/${fmapid}`);
      setStudent(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleClose = useCallback(() => {
    closePopup();
  }, [closePopup]);

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        handleClose();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [handleClose]);

  return (
    <div>
      <div className="popup active">
        <div >
          <span className="close-btn" onClick={handleClose}>
            &times;
          </span>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>S.No</th>
                  <th style={{ border: '1px solid #ddd', padding: '8px' }}>Student ID</th>
                  <th style={{ border: '1px solid #ddd', padding: '12px' }}>Name</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(student) && student.length > 0 ? (
                  student.map((student, index) => (
                    <tr key={index}>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{index + 1}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.studentid}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.fullname}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" style={{ border: '1px solid #ddd', padding: '8px' }}>Data Not Found</td>
                  </tr>
                )}
              </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}
