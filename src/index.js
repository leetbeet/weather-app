import './style.css';

const getWeatherData = async (location) => {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=REWV8CUHUMFRVEXFGDJADGCEL`
    );

    if (!response.ok) throw new Error(`Server error: ${response.status}`);

    processWeatherData(response);
  } catch (error) {
    alert(`Error fetching data, ${error.message}`);
  }
};

const processWeatherData = async (response) => {
  const data = await response.json();
  const weather = {
    name: data.resolvedAddress,
    temp: (((data.currentConditions.temp - 32) * 5) / 9).toFixed(1),
    condition: data.currentConditions.conditions,
    feelsLike: (((data.currentConditions.feelslike - 32) * 5) / 9).toFixed(1),
    humidity: data.currentConditions.humidity,
    precipChance: data.currentConditions.precipprob,
  };
  displayWeatherData(weather);
};

const displayWeatherData = (weather) => {
  const container = document.querySelector('.container');
  container.className = 'container';
  const cloudy = document.querySelector('#cloudy');
  const city = document.querySelector('#city');
  const temp = document.querySelector('#temp');
  const feelsLike = document.querySelector('#feels-like');
  const humidity = document.querySelector('#humidity');
  const percip = document.querySelector('#percip');

  cloudy.textContent = weather.condition;
  city.textContent = weather.name;
  temp.textContent = `${weather.temp} °C`;
  feelsLike.textContent = `Feels like: ${weather.feelsLike} °C`;
  humidity.textContent = `Humidity: ${weather.humidity}%`;
  percip.textContent = `Precipitation chance: ${weather.precipChance}%`;
};

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();

  const location = document.querySelector('input').value;
  getWeatherData(location);
});
