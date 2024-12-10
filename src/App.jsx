import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import Navbar from './components/Navbar'; // Import Navbar
import Login from './pages/registration/Login';
import Home from './pages/Home';
import Signup from './pages/registration/Signup';
import ProtectedRoute from './components/ProtectedRoute';
 // Import Protected Route

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar সব পেজে থাকবে */}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
