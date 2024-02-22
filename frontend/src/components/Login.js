import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import UserRegistrationForm from './UserRegistrationForm';

function LoginModal({ open, onClose }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn,setIsLoggedIn] =useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [openRegistrationModal, setOpenRegistrationModal] = useState(false); // State to control the visibility of the user registration modal

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'admin@gmail.com' && password === '123456') {
      const adminData = { email: 'admin@gmail.com', role: 'admin' };
      // Login successful
      setIsLoggedIn(true);
      setIsAdmin(adminData.role === 'admin'); // Set isAdmin based on user's role
      onClose();
    } else if(email === 'user@gmail.com' && password === '654321'){
      const userData = { email: 'user@gmail.com', role: 'user' };
      setIsLoggedIn(true);
      setIsUser(userData.role === 'user'); // Set isAdmin based on user's role
      setIsAdmin(false);
      onClose();
    }else {
      setError('Invalid email or password');
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
    <Dialog open={open} onClose={onClose}>
      {!isLoggedIn ? (
      <form onSubmit={handleSubmit}>
        <DialogTitle>Login here</DialogTitle>
        <DialogContent>
          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Login</Button>
        </DialogActions>
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
    </Dialog>
    {openRegistrationModal && <UserRegistrationForm open={openRegistrationModal} onClose={handleCloseRegistrationModal} />}
    
    </>
  );
}

export default LoginModal;
