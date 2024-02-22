import React, { useState } from 'react';
import axios from 'axios';
import './UserRegistrationForm.css';

const UserRegistrationForm = ({ onClose}) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    role: 'user' // Default role is 'user'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {

      const adminAuthToken = 'your_admin_authentication_token';
      const response = await axios.post('/api/register', formData, {
        headers: {
          Authorization: `Bearer ${adminAuthToken}` // Example: include admin authentication token
        }
      });
      
      console.log('User registered successfully:', response.data);
      // Handle success: display success message or redirect
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle error: display error message
    }
  };

  return (
    <div className="registration-form" >
      <div className="close-btn" onClick={onClose}>✕</div>
      <h1 className="registration-title">Register a new user</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
        <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone Number" />
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="administrator">Administrator</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default UserRegistrationForm;
