import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext'; // Adjust the import path as needed
import RegisterForm from './RegisterForm'; // Adjust the import path as needed
import LoginForm from './LoginForm'; // Adjust the import path as needed
import { Link } from 'react-router-dom'; 

const Navbar = () => {
  const { token, logout } = useContext(UserContext); // Use context to access token and logout method
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
      {token ? (
        // If logged in, show setting asnd loginlogout button
        <>
            <Link to="/settings">
                <button>Settings</button>
            </Link>
            <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          {/* Login/Registration buttons */}
          <button onClick={() => { setIsRegistering(true); setModalIsOpen(true); }}>Register</button>
          <button onClick={() => { setIsRegistering(false); setModalIsOpen(true); }}>Login</button>
        </>
      )}

      {/* Modal for registration/login */}
      {modalIsOpen && (
        <div className="modal">
          {isRegistering ? (
            <RegisterForm setModalIsOpen={setModalIsOpen} />
          ) : (
            <LoginForm setModalIsOpen={setModalIsOpen} />
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;