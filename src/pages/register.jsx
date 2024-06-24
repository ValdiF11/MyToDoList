import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          name: name,
          email: email,
        });
      }
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Register success",
      });
      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="login-container w-25">
        <h2 className="text-center my-4">Register</h2>
        <div className="input-group mb-3">
          <span className="input-group-text px-4">Email</span>
          <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text px-4">Name</span>
          <input type="text" className="form-control" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">Password</span>
          <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="text-center mb-4">
          <button className="btn btn-primary" onClick={handleRegister}>
            Register
          </button>
        </div>
        <div className="text-center mb-4">
          Already have account?{" "}
          <Link to="/login" className="hlink">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
