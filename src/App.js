// src/App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect,
} from "react-router-dom";
import SignIn from "./components/SignIn";
import AdminDashboard from "./components/AdminDashboard";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import SignUp from "./components/SignUp";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />

        <Route path="/admin" element={user ? <AdminDashboard /> : <SignIn />} />
        <Route path="/" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
