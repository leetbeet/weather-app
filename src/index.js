import './style.css';

const getWeatherData = async (location) => {
  const loadingMsg = document.querySelector('.loading-msg');
  const container = document.querySelector('.container');
  try {
    container.classList.add('hidden');
    loadingMsg.classList.remove('hidden');
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location.trim())}?key=REWV8CUHUMFRVEXFGDJADGCEL`
    );

    if (!response.ok) throw new Error(`Server error: ${response.status}`);

    await processWeatherData(response);
  } catch (error) {
    loadingMsg.classList.add('hidden');
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
  const loadingMsg = document.querySelector('.loading-msg');
  loadingMsg.classList.add('hidden');
  const container = document.querySelector('.container');
  container.classList.remove('hidden');
  const cloudy = document.querySelector('#cloudy');
  const city = document.querySelector('#city');
  const temp = document.querySelector('#temp');
  const feelsLike = document.querySelector('#feels-like');
  const humidity = document.querySelector('#humidity');
  const precip = document.querySelector('#precip');

  cloudy.textContent = weather.condition;
  city.textContent = weather.name;
  temp.textContent = `${weather.temp} °C`;
  feelsLike.textContent = `Feels like: ${weather.feelsLike} °C`;
  humidity.textContent = `Humidity: ${weather.humidity}%`;
  precip.textContent = `Precipitation chance: ${weather.precipChance}%`;
};

document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();

  const location = document.querySelector('input').value;
  getWeatherData(location);
});
