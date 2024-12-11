import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/FirebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useCart } from '../context/CartContext';

function Navbar() {
  const [user, setUser] = useState(null);
  const { cart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('Logout successful!');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error.message);
      alert('Error logging out: ' + error.message);
    }
  };

  return (
    <div className="main lg:flex md:flex flex-wrap justify-between items-center px-4 bg-[#2a056f] py-4 shadow-md">
      <div className="left">
        <div className="logo font-bold text-2xl text-white text-center">E-NoteBook</div>
      </div>
      <div className="right">
        <ul className="flex space-x-4 text-white justify-center items-center">
          {user && (
            <>
              <Link to="/">
                <li className="cursor-pointer">Home</li>
              </Link>
              <Link to="/admin">
                <li className="cursor-pointer">Admin Dashboard</li>
              </Link>
              <Link to="/cart">
                <li className="cursor-pointer">Cart: {cart.length}</li>
              </Link>
            </>
          )}
          {!user ? (
            <>
              <Link to="/login">
                <li className="cursor-pointer">Login</li>
              </Link>
              <Link to="/signup">
                <li className="cursor-pointer">Signup</li>
              </Link>
            </>
          ) : (
            <>
              <li className="cursor-pointer text-red-500" onClick={handleLogout}>
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
