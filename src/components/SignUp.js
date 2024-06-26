// src/components/SignIn.js
import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };

  return (
    <div
      className="container flex-column"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2>Admin Sign In</h2>
      <div>
        <form onSubmit={handleSubmit} className="d-flex flex-column">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit">SignUp</button>

          <button
            onClick={() => {
              navigate("/signin");
            }}
          >
            SignIn
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
