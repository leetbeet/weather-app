import './style.css';

const getWeatherData = async (location) => {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=REWV8CUHUMFRVEXFGDJADGCEL`
    );

    if (!response.ok) throw new Error(`Server error: ${response.status}`);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
};
