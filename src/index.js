import './style.css';

const getWeatherData = async (location) => {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=REWV8CUHUMFRVEXFGDJADGCEL`
    );

    if (!response.ok) throw new Error(`Server error: ${response.status}`);

    processWeatherData(response);
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
};

const processWeatherData = async (response) => {
  const data = await response.json();
  return {
    temp: data.currentConditions.temp,
    condition: data.currentConditions.conditions,
    feelsLike: data.currentConditions.feelslike,
    humidity: data.currentConditions.humidity,
    windSpeed: data.currentConditions.windspeed,
    windDir: data.currentConditions.winddir,
    precipChance: data.currentConditions.precipprob,
  };
};

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();

  const location = document.querySelector('input').value;
  getWeatherData(location);
});
