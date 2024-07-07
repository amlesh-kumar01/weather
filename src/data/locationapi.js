import axios from "axios";

export const getLocation = async () => {
  try {
    const { data: ipAddress } = await axios.get("https://api.ipify.org");
    const { data: location } = await axios.get(`https://ipinfo.io/${ipAddress}/geo`);
    console.log(location);
    return location;
  } catch (error) {
    console.error("Error fetching current location:", error);
    throw error;
  }
};
