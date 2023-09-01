import React, { useState } from 'react';
import { TextField, Button, FormControlLabel, Checkbox, Link } from '@mui/material';
import './styles.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="login-pg">
            <div className="login-cont">
              <form className="login-form">
              <h2>Login to continue</h2>
                <TextField
                  id="outlined-basic"
                  label="Username/E-mail"
                  type="text"
                  variant="outlined"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <br /><br></br>
                <TextField
                  id="outlined-basic"
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <br /><br></br>
                <div className="log-checkbox-container">
                  <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
                  <Link href="#">Forgot Password?</Link>
                </div>
                <br></br>
                <center>
                <Button variant="contained" href="#">
                  Login
                </Button></center>
                <br></br>
              </form>
              <div className="log-checkbox-container">
                <p>
                  Don't have an account?
                  <Link href="/components/signup">Create account</Link>
                </p>
              </div>
            </div>
    </div>
  );
};

export default LoginPage;
