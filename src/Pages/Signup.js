import React, { useState } from 'react';
import './Signup.css';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [message, setMessage]= useState ('')

  const navigate = useNavigate();

  const signupUser = async (formData) => {
    try {
      const url = 'https://weather-backend-amleshkumar01.onrender.com' ||'http://localhost:5000' 
      const response = await axios.post(`${url}/users/signup`, formData);
      const {message,success}= response.data;
      
      if(success){
        setTimeout(() => {
          navigate('/login')
      }, 1000)
      }
      return (message);
    } catch (error) {
      return ( error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // signupUser(formData);
    const msg = await signupUser(formData);
    setMessage(msg)
    
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
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
        <button type="submit">Sign Up</button>

      <h3 style={{color:"black"}}>{message}</h3>
      <Link to='/'>Back to Home</Link>
      </form>
    </div>
  );
};

export default Signup;
