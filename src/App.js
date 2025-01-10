import { Route, BrowserRouter as Router, Routes } from "react-router";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import { ToastContainer } from "react-toastify";

const userId = localStorage.getItem("userId");
console.log(userId);

function PrivateRoute({ children }) {
  return userId ? children : <Login />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
