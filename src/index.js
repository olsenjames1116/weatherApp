import './style.css';
import earth from './images/earth.png';
import { location, validateInput } from './validate';

const submitButton = document.querySelector('[type=submit]');

function displayLocation(city, country) {
    const header = document.querySelector('div.header>h1');
    header.textContent = `${city}, ${country}`;
}

function displayDateTime() {
    const currentDate = new Date();

    const dateElement = document.querySelector('span#date');
    dateElement.textContent = `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`;
    
    const timeElement = document.querySelector('span#time');
    timeElement.textContent = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
}

function displayTemps(currentTemp, feelTemp, highTemp, lowTemp) {
    const currentTempElement = document.querySelector('div.temp>span:first-child');
    currentTempElement.textContent = `${currentTemp}`;

    const feelTempElement = document.querySelector('div.feel>span:nth-child(2)');
    feelTempElement.textContent = `${feelTemp}`;

    const highTempElement = document.querySelector('div.high>span:nth-child(2)');
    highTempElement.textContent = `${highTemp}`;

    const lowTempElement = document.querySelector('div.low>span:nth-child(2)');
    lowTempElement.textContent = `${lowTemp}`;
}

async function displayWeatherIcon(icon) {
    const weatherIconElement = document.querySelector('img#weatherIcon');
    try {
    const image = await fetch(`http://openweathermap.org/img/wn/${icon}@2x.png`);
    const {url} = image;
    weatherIconElement.src = url;
    } catch(error) {
        weatherIconElement.src = earth;
        alert(error);
    }
}

function displayWeather(data) {
    displayTemps(data.main.temp, data.main.feels_like, data.main.temp_max, data.main.temp_min);
    displayWeatherIcon(data.weather[0].icon);
}

function displayResults(data) {
    displayLocation(data.name, data.sys.country);
    displayDateTime();
    displayWeather(data);
}

async function getWeather() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=faefb21b364d236534cc9f8b0216f294`);
        const data = await response.json();
        console.log(data);
        displayResults(data);
    } catch(error) {
        alert(error);
    }
}

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    const validInput = validateInput();

    if (validInput) {
        getWeather();
    }
});