// Dashboard.js
import React, { useState } from 'react';
import UserRegistrationForm from './UserRegistrationForm'; 

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <main>
        {/* Add button to trigger opening of the registration form modal */}
        <button onClick={openModal}>Add New User</button>

        {/* Render the registration form modal if isModalOpen is true */}
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>&times;</span>
              <UserRegistrationForm />
            </div>
          </div>
        )}
        
        {/* Other dashboard content */}
      </main>
    </div>
  );
};

export default Dashboard;
