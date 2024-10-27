// /web-app/src/pages/RoleSelectionPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/auth.css';

const RoleSelectionPage = () => {
  const [role, setRole] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [problem, setProblem] = useState('');
  const [reason, setReason] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestData = {
      role,
      ...(role === 'Doctor' && { licenseNumber }),
      ...(role === 'Patient' && { problem }),
      ...(role === 'Customer' && { reason }),
    };

    try {
      await axios.post('/api/complete-registration', requestData);
      navigate('/dashboard'); // Redirect to the dashboard or appropriate page
    } catch (error) {
      console.error('Error completing registration:', error);
    }
  };

  return (
    <div className="role-selection-page d-flex align-items-center justify-content-center">
      <div className="auth-form shadow">
        <h2 className="text-center mb-4">Select Your Role</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Registering As</label>
            <select 
              className="form-control" 
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
              required
            >
              <option value="" disabled>Select your role</option>
              <option value="Doctor">Doctor</option>
              <option value="Patient">Patient</option>
              <option value="Customer">Customer</option>
            </select>
          </div>
          
          {role === 'Doctor' && (
            <div className="form-group">
              <label>License Number</label>
              <input 
                type="text" 
                className="form-control" 
                value={licenseNumber} 
                onChange={(e) => setLicenseNumber(e.target.value)} 
                required
              />
            </div>
          )}

          {role === 'Patient' && (
            <div className="form-group">
              <label>Problem or Reason for Consultation</label>
              <textarea 
                className="form-control" 
                value={problem} 
                onChange={(e) => setProblem(e.target.value)} 
                required
              />
            </div>
          )}

          {role === 'Customer' && (
            <div className="form-group">
              <label>Reason for Registration</label>
              <textarea 
                className="form-control" 
                value={reason} 
                onChange={(e) => setReason(e.target.value)} 
                required
              />
            </div>
          )}

          <button type="submit" className="btn btn-primary btn-block rounded-pill mt-4">Complete Registration</button>
        </form>
      </div>
    </div>
  );
};

export default RoleSelectionPage;
