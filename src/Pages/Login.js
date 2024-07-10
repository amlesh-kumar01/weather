import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";




const Login = ({setUserStatus}) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const url = 'https://weather-backend-amleshkumar01.onrender.com' || 'http://localhost:5000' ;
        const response = await axios.post(`${url}/users/login`, formData);

        const {message, jwtToken, success,username}= response.data;
        setMessage(message);
        if (success){
            setTimeout(()=> navigate('/'),2000);
            setUserStatus(true);
        }
        // Store the JWT token in local storage
        localStorage.setItem("userInfo", jwtToken);
        localStorage.setItem("loggedIn",success);
        localStorage.setItem("username", username);
        // Redirect to a different page or perform some other action
    } catch (error) {
      setMessage(error.message || "An error occurred");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {message && <p>{message}</p>}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
        <Link to='/signup'>Signup</Link>
        <br />
        <Link to="/">Back to Home</Link>
      </form>
    </div>
  );
};

export default Login;
