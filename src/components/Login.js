import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebaseConfig";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      localStorage.setItem("userId", auth.currentUser.uid);
      navigate("/");
      toast("Login successfully");
    } catch (error) {
      console.log(error.code);
      toast(error.code);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      localStorage.setItem("userId", auth.currentUser.uid);
      navigate("/");
      toast("Login successfully");
    } catch (error) {
      console.log(error.code);
      toast(error.code);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
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
      <button className="btn btn-primary mx-3" onClick={login}>
        {" "}
        Login{" "}
      </button>
      <button className="btn btn-danger" onClick={signInWithGoogle}>
        Login with Google
      </button>
      <p>
        Don't have account? <Link to={"/signup"}>Signup</Link>
      </p>
    </div>
  );
};

export default Login;
