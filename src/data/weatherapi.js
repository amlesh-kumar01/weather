import axios from 'axios';

const baseUrl = 'https://api.weatherapi.com/v1';
const apiKey = '1ee578a7af0943138ad102922240307';

export const getWeatherData = async (cityName,apiMethod) => {
    try {
        const { data } = await axios.get(baseUrl+`${apiMethod}`, {
            params: {
                key: apiKey,
                q: cityName,
                aqi: 'yes',
                days: 7
            }
        });
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        // throw error;
    }
};
