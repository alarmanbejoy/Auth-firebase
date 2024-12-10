import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { auth } from '../firebase/FirebaseConfig'; // Firebase config
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Firebase functions

function Navbar() {
  const [user, setUser] = useState(null); // Track authenticated user
  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update the user state
    });

    return () => unsubscribe(); // Clean up the listener
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign the user out
      alert('Logout successful!');
      navigate('/login'); // Navigate to login page
    } catch (error) {
      console.error('Logout error:', error.message);
      alert('Error logging out: ' + error.message);
    }
  };

  return (
    <div className='main lg:flex md:flex flex-wrap justify-between items-center 
     px-4 bg-[#2a056f] py-4 shadow-md'>
      <div className="left">
        <div className="logo font-bold text-2xl text-white text-center">E-NoteBook</div>
      </div>
      <div className="right">
        <ul className='flex space-x-4 text-white justify-center items-center'>
          {user && (
            <Link to={'/'}>
              <li className='cursor-pointer'>Home</li>
            </Link>
          )}
          {!user ? (
            <>
              {/* Show Login and Signup if user is not logged in */}
              <Link to={'/login'}>
                <li className='cursor-pointer'>Login</li>
              </Link>
              <Link to={'/signup'}>
                <li className='cursor-pointer'>Signup</li>
              </Link>
            </>
          ) : (
            <>
              {/* Show Logout if user is logged in */}
              <li
                className='cursor-pointer text-red-500'
                onClick={handleLogout}
              >
                Logout
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
