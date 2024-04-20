import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import UserRegistrationForm from './UserRegistrationForm';
import './Login.css';
import DialogContentText from '@mui/material/DialogContentText';
import { Link } from 'react-router-dom';

function LoginModal({ open, onClose }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn,setIsLoggedIn] =useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [openRegistrationModal, setOpenRegistrationModal] = useState(false); // State to control the visibility of the user registration modal

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/LMS/auth/login', { // Update the URL here
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setIsLoggedIn(true);
        setIsAdmin(data.role === 'admin');
        setIsUser(data.role === 'user');
        onClose();
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('An error occurred while logging in');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Set isLoggedIn to false
    setIsAdmin(false); //Reset isAdmin
  };

  const handleAddNewUser = () => {
    setOpenRegistrationModal(true); // Open the user registration modal
  };

  const handleCloseRegistrationModal = () => {
    setOpenRegistrationModal(false); // Close the user registration modal
  }

  return (
    <>
    <Dialog open={open} onClose={onClose} PaperProps={{ style: {  boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)' } }}>
    <div className="dialog-background"> {/* Apply transparency effect here */}
      {!isLoggedIn ? (
      <form onSubmit={handleSubmit}>
        <DialogTitle style={{ textAlign: 'center' }}>LOGIN</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To login to this LMS, please enter your email address and password here.
          </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              label="Email Address"
              placeholder='for ex.: zoje.gabili@gmail.com'
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="standard"
            />
          <TextField
            autoFocus
            required
            margin="dense"
            placeholder='***********************************'
            type="password"
            label="Password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="standard"
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </DialogContent>
        <DialogActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Login</Button>
        </DialogActions>
        <div style={{ textAlign: 'center', fontSize: '18px'}}>
            Forgot password? Click <Link to="/forgot-password" style={{ textDecoration: 'underline' }}>here.</Link>
        </div>
      </form>
      ): (
      <>
        <DialogTitle>Logged in successfully</DialogTitle>
        <DialogContent>
          <p>You are now logged in!</p>
        </DialogContent>
        <DialogActions>
        {isLoggedIn ? (
            <>
          {isAdmin && (<Button onClick={handleAddNewUser}>Add new user</Button>
          )}
          <Button onClick={handleLogout}>Logout</Button>
          </>
          ) : (
            <>
              <Button onClick={onClose}>Cancel</Button>
            </>
          )}
        </DialogActions>
      </>
      )}
      </div>
    </Dialog>
    {openRegistrationModal && <UserRegistrationForm open={openRegistrationModal} onClose={handleCloseRegistrationModal} />}
    
    </>
  );
}

export default LoginModal;
