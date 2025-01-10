import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function signup(event) {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast("Account created successfully");
      navigate("/login");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error.code);
      toast(error.code);
    }
  }

  return (
    <div className="container mt-5 ">
      <h2>Signup</h2>
      <input
        type="email"
        placeholder="Email"
        className="form-control mb-3 w-50"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="form-control mb-3 w-50"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn btn-primary" onClick={signup}>
        {" "}
        Signup{" "}
      </button>
      <p>
        If you have account <Link to={"/login"}>Login</Link>
      </p>
    </div>
  );
};

export default Signup;
