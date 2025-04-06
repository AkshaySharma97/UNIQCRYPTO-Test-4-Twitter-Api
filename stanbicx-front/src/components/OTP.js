import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function OTP() {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const twitterId = queryParams.get('twitterId');
  const username = queryParams.get('username');

  useEffect(() => {
    if (twitterId) {
      localStorage.setItem('twitterId', twitterId);
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/send-otp`, { twitterId })
        .then(() => setMessage('OTP sent to your Twitter DM'))
        .catch(() => setMessage('Error sending OTP'));
    }
  }, [twitterId]);

  const verifyOtp = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/verify-otp`,
        { twitterId, otp }
      );
      navigate('/dashboard');
    } catch (err) {
      setMessage('Invalid OTP');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Welcome {username || 'user'}! Enter OTP</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <input
        className="form-control mt-2"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button className="btn btn-success mt-3" onClick={verifyOtp}>
        Verify OTP
      </button>
    </div>
  );
}

export default OTP;