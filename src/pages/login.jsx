import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="login-container  w-25 p-4">
        <h2 className="text-center mb-4">Login</h2>
        <div className="input-group mb-3">
          <span className="input-group-text px-4">Email</span>
          <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-group mb-4">
          <span className="input-group-text">Password</span>
          <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="text-center mb-4">
          <button className="btn btn-primary" onClick={handleLogin}>
            Login
          </button>
        </div>
        <div className="text-center mb-4">
          Didn't have account?{" "}
          <Link to="/register" className="hlink">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
