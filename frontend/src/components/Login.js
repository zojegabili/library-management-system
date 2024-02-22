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

  // Other functions remain unchanged...

  return (
    <>
    <Dialog open={open} onClose={onClose}>
      {!isLoggedIn ? (
      <form onSubmit={handleSubmit}>
        {/* Form fields remain unchanged... */}
      </form>
      ): (
      {/* Content for logged in users remains unchanged... */}
      )}
    </Dialog>
    {openRegistrationModal && <UserRegistrationForm open={openRegistrationModal} onClose={handleCloseRegistrationModal} />}
    
    </>
  );
}

export default LoginModal;
