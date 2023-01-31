import earth from './images/earth.png';
import capitalizeFirstLetter from "./capitalize";

const windElement = document.querySelector('span#wind');

function displayDateTime() {
    const currentDate = new Date();
    
    let month = currentDate.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }

    let date = currentDate.getDate();
    if (date < 10) {
        date = `0${date}`;
    }

    const dateElement = document.querySelector('span#date');
    dateElement.textContent = `${month}/${date}/${currentDate.getFullYear()}`;
    
    const timeElement = document.querySelector('span#time');

    let hours = currentDate.getHours();

    if (hours < 10) {
        hours = `0${hours}`;
    }

    let minutes = currentDate.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    timeElement.textContent = `${hours}:${minutes}`;
}

function displayLocation(city, country) {
    const header = document.querySelector('div.header>h1');
    header.textContent = `${city}, ${country}`;
}

function displayTemps(temps) {
    const currentTempElement = document.querySelector('div.temp>span:first-child');
    currentTempElement.textContent = `${temps[0]}\xB0${temps[4]}`;

    const feelTempElement = document.querySelector('div.feel>span:nth-child(2)');
    feelTempElement.textContent = `${temps[1]}\xB0${temps[4]}`;

    const highTempElement = document.querySelector('div.high>span:nth-child(2)');
    highTempElement.textContent = `${temps[2]}\xB0${temps[4]}`;

    const lowTempElement = document.querySelector('div.low>span:nth-child(2)');
    lowTempElement.textContent = `${temps[3]}\xB0${temps[4]}`;
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

function displayDescription(description) {
    const descriptionElement = document.querySelector('p#description');
    const descriptionFormatted = capitalizeFirstLetter(description);
    descriptionElement.textContent = descriptionFormatted;
}

function displayHumidity(humidity) {
    const humidityElement = document.querySelector('span#humidity');
    humidityElement.textContent = `${humidity}%`;
}

function displayWind(direction, speed, units) {
    windElement.textContent = `${direction} ${speed} ${units}`;
}

function displayPressure(pressure) {
    const pressureElement = document.querySelector('span#pressure');
    pressureElement.textContent = `${pressure}"`;
}

function displayWeather(data, results) {
    displayTemps(results.convertedTemps);
    displayWeatherIcon(data.weather[0].icon);
    displayDescription(data.weather[0].description);
    displayHumidity(data.main.humidity);
    displayWind(results.convertedDirection, results.convertedSpeedUnits.convertedWindSpeed, results.convertedSpeedUnits.convertedUnits);
    displayPressure(results.convertedPressure);
}

export default function displayResults(data, results) {
    displayLocation(data.name, data.sys.country);
    displayDateTime();
    displayWeather(data, results);
}
