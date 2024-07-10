import axios from 'axios';

const API_BASE_URL = 'https://weather-backend-amleshkumar01.onrender.com'||'http://localhost:5000';

const addLocation = async ( location) => {
  try {
    const userInfo = localStorage.getItem("userInfo");
    const response = await axios.post(`${API_BASE_URL}/users/addloc/${userInfo}/${location}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

const removeLocation = async ( location) => {
  try {
    const userInfo = localStorage.getItem("userInfo");
    const response = await axios.post(`${API_BASE_URL}/users/removeloc/${userInfo}/${location}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};





export { addLocation, removeLocation };
