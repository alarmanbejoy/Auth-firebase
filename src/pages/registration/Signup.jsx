import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { auth } from "../../firebase/FirebaseConfig"; 

// Firebase auth import
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Firebase create user function

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize navigate hook

  // Handle form submission
  const handleSignup = async (e) => {
    e.preventDefault();
    
    // Basic validation
 if (email === "" || password === "" ){
   alert('Please fill in all fields'); // Show error alert
   return; // Prevent form submission
 }

    try {
      // Use Firebase createUserWithEmailAndPassword method to create the user
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Signup successful!'); // Show success alert
      navigate('/login'); // Navigate to the login page
    } catch (error) {
      console.error(error.message); // Log any errors to the console
      alert('Error signing up: ' + error.message); // Show error alert
    }
  }; 

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-800 px-10 py-10 rounded-xl">
        <div>
          <h1 className="text-center text-white text-xl mb-4 font-bold">Signup</h1>
        </div>
        <form onSubmit={handleSignup}>
          <div>
            <input
              type="email"
              name="email"
              className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Handle email change
            />
          </div>
          <div>
            <input
              type="password"
              className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Handle password change
            />
          </div>
          <div className="flex justify-center mb-3">
            <button
              type="submit"
              className="bg-red-500 w-full text-white font-bold px-2 py-2 rounded-lg"
            >
              Signup
            </button>
          </div>
        </form>
        <div>
          <h2 className="text-white">
            Already have an account?{' '}
            <Link className="text-red-500 font-bold" to={'/login'}>
              Login
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Signup;
