import React from 'react';

function Login() {
  const handleTwitterLogin = () => {
    window.open(`${process.env.REACT_APP_BACKEND_URL.replace('/api', '')}/auth/twitter`, '_self');
  };

  return (
    <div className="container mt-5">
      <h2>Login with Twitter</h2>
      <button className="btn btn-info mt-3" onClick={handleTwitterLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;