import './style.css';
import earth from './images/earth.png';
import { location, validateInput } from './validate';

const submitButton = document.querySelector('[type=submit]');

function convertStringToNum(...strings) {
    const numbers = [];

    strings.forEach((string) => {
        const number = parseFloat(string);
        numbers.push(number);
    })

    return numbers;
}

function convertTemp(currentTemp, feelTemp, highTemp, lowTemp, units) {
    const temps = convertStringToNum(currentTemp, feelTemp, highTemp, lowTemp);

    if (units === 'K') {
        for (let i = 0; i < temps.length; i += 1) {
            const tempKelvin = temps[i];
            const tempFahrenheit = Math.round(1.8 * (tempKelvin - 273.15) + 32);
            temps[i] = tempFahrenheit;
        }

        temps[4] = 'F';
        console.table(temps);
    } else if (units === 'F') {
        for (let i = 0; i < temps.length; i += 1) {
            const tempFahrenheit = temps[i];
            const tempCelsius = Math.round(5 / 9 * (tempFahrenheit - 32));
            temps[i] = tempCelsius;
        }

        temps[4] = 'C';
    } else {
        for (let i = 0; i < temps.length; i += 1) {
            const tempCelsius = temps[i];
            const tempFahrenheit = Math.round(tempCelsius * 9 / 5 + 32);
            temps[i] = tempFahrenheit;
        }

        temps[4] = 'F';
    }

    return temps;
}

function convertResults(data) {
    const temps = convertTemp(data.main.temp, data.main.feels_like, data.main.temp_max, data.main.temp_min, 'K');

    return temps;
}

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

function capitalizeFirstLetter(string) {
    const words = string.split(' ');

    for(let i = 0; i < words.length; i += 1) {
        words[i] = words[i][0].toUpperCase() + words[i].substring(1);
    }

    return words.join(' ');
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
    const windElement = document.querySelector('span#wind');
    windElement.textContent = `${direction} ${speed} ${units}`;
}

function displayPressure(pressure) {
    const pressureElement = document.querySelector('span#pressure');
    pressureElement.textContent = `${pressure}"`;
}

function displayWeather(data, temps) {
    displayTemps(temps);
    displayWeatherIcon(data.weather[0].icon);
    displayDescription(data.weather[0].description);
    displayHumidity(data.main.humidity);
    displayWind(data.wind.deg, data.wind.speed, 'm/s');
    displayPressure(data.main.pressure);
}

function displayResults(data, temps) {
    displayLocation(data.name, data.sys.country);
    displayDateTime();
    displayWeather(data, temps);
}

async function getWeather() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=faefb21b364d236534cc9f8b0216f294`);
        const data = await response.json();
        console.log(data);
        const temps = convertResults(data);
        displayResults(data, temps);
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