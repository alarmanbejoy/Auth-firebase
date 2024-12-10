import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "../../firebase/FirebaseConfig"; 
import { signInWithEmailAndPassword } from 'firebase/auth'; // Firebase login function

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (email === "" || password === "") {
      alert('Please fill in all fields'); // Show error alert
      return;
    }

    try {
      // Use Firebase signInWithEmailAndPassword method to log in the user
      await signInWithEmailAndPassword(auth, email, password);
      
      alert('Login successful!'); // Show success alert
      navigate('/'); // Navigate to the home page
    } catch (error) {
      console.error(error.message); // Log any errors to the console
      alert('Error logging in: ' + error.message); // Show error alert
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-800 px-10 py-10 rounded-xl">
        <div>
          <h1 className="text-center text-white text-xl mb-4 font-bold">Login</h1>
        </div>
        <form onSubmit={handleLogin}>
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
              className="bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg"
            >
              Login
            </button>
          </div>
        </form>
        <div>
          <h2 className="text-white">
            Don't have an account?{' '}
            <Link className="text-yellow-500 font-bold" to={'/signup'}>
              Signup
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Login;
