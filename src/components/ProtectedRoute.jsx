// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthState } from 'react-firebase-hooks/auth'; // Firebase hooks
import { auth } from '../firebase/FirebaseConfig';

function ProtectedRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    // Loading state দেখানোর জন্য কিছু দেখাতে পারেন
    return <div>Loading...</div>;
  }

  if (!user) {
    // যদি ইউজার লগইন না থাকে তাহলে Login পেজে পাঠাবে
    return <Navigate to="/login" />;
  }

  // ইউজার লগইন থাকলে মূল পেজটি দেখাবে
  return children;
}

export default ProtectedRoute;
