import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Login from './pages/registration/Login';
import Home from './pages/Home';
import Signup from './pages/registration/Signup';
import CartPage from './pages/CartPage';
import ProtectedRoute from './components/ProtectedRoute';
import CartProvider from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
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
          <Route path="/cart" element={<CartPage />} />
          {/* Add 404 Not Found Route */}
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
