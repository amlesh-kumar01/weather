import React from 'react';
import { useNavigate } from 'react-router-dom';

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
            <h2>Welcome {localStorage.getItem("username")}</h2>
            <button onClick={handleLogout}>Logout</button>
        </>
    );
}

export default User;
