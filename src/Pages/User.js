import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './User.css'
function User({setUserStatus}) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("userInfo");
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("username");
        setTimeout(() => navigate('/'), 2000);
        setUserStatus(false);
    }

    return (
        <>
    <div className="welcome-container">
        <h2 className="welcome-message">
            Welcome {localStorage.getItem("username")}
        </h2>
        <p>Here, You can change your Account Setting. </p>
        <button className="logout-button" onClick={handleLogout}>
            Logout
        </button>
        <Link to="/" className='login-link'>Back to Home</Link>
    </div>
</>

    );
}

export default User;
