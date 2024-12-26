import axios from "axios";

// Fetch all countries data including flags and country codes
export const fetchCountries = async () => {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    return response.data;
  } catch (error) {
    console.error("Error fetching countries data:", error);
    return [];
  }
};
