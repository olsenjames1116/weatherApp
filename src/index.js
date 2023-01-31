import './style.css';
import earth from './images/earth.png';
import { location, validateInput } from './validate';

const changeTempButton = document.querySelector('div.temp>div>button');
const submitButton = document.querySelector('[type=submit]');
let temps = [];

function convertStringToNum(...strings) {
    const numbers = [];

    strings.forEach((string) => {
        const number = parseFloat(string);
        numbers.push(number);
    })

    return numbers;
}

function convertTemp() {
    const units = temps[4];

    if (units === 'C') {
        for (let i = 0; i < temps.length; i += 1) {
            const tempCelsius = temps[i];
            const tempFahrenheit = Math.round(tempCelsius * 9 / 5 + 32);
            temps[i] = tempFahrenheit;
        }

        temps[4] = 'F';

    } else if (units === 'F') {
        for (let i = 0; i < temps.length; i += 1) {
            const tempFahrenheit = temps[i];
            const tempCelsius = Math.round(5 / 9 * (tempFahrenheit - 32));
            temps[i] = tempCelsius;
        }

        temps[4] = 'C';
    } else {
        for (let i = 0; i < temps.length; i += 1) {
            const tempKelvin = temps[i];
            const tempFahrenheit = Math.round(1.8 * (tempKelvin - 273.15) + 32);
            temps[i] = tempFahrenheit;
        }

        temps[4] = 'F';
    }

    console.table(temps);
}

function convertWindDirection(direction) {
    let cardinalDirection;

    if (direction >= 337.5 && direction < 22.5) {
        cardinalDirection = 'N';
    } else if (direction >= 22.5 && direction < 67.5) {
        cardinalDirection = 'NE';
    } else if (direction >= 67.5 && direction < 112.5) {
        cardinalDirection = 'E';
    } else if (direction >= 112.5 && direction < 157.5) {
        cardinalDirection = 'SE';
    } else if (direction >= 157.5 && direction < 202.5) {
        cardinalDirection = 'S';
    } else if (direction >= 202.5 && direction < 247.5) {
        cardinalDirection = 'SW';
    } else if (direction >= 247.5 && direction < 292.5) {
        cardinalDirection = 'W';
    } else {
        cardinalDirection = 'NW';
    }

    return cardinalDirection;
}

function convertWindUnits(windSpeed, units) {
    let convertedWindSpeed;
    let convertedUnits;

    if (units === 'kph') {
        convertedWindSpeed = Math.round(windSpeed * 0.621371);
        convertedUnits = 'mph';
    } else if (units === 'mph') {
        convertedWindSpeed = Math.round(windSpeed * 1.60934);
        convertedUnits = 'kph';
    } else {
        convertedWindSpeed = Math.round(windSpeed * 2.23694);
        convertedUnits = 'mph';
    }

    return { convertedWindSpeed, convertedUnits };
}

function convertResults(data) {
    temps = convertStringToNum(data.main.temp, data.main.feels_like, data.main.temp_max, data.main.temp_min);
    convertTemp();
    const convertedDirection = convertWindDirection(data.wind.deg);
    const convertedSpeedUnits = convertWindUnits(data.wind.speed);

    return { convertedDirection, convertedSpeedUnits };
}

function displayLocation(city, country) {
    const header = document.querySelector('div.header>h1');
    header.textContent = `${city}, ${country}`;
}

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

function displayTemps() {
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

function displayWeather(data, results) {
    displayTemps();
    displayWeatherIcon(data.weather[0].icon);
    displayDescription(data.weather[0].description);
    displayHumidity(data.main.humidity);
    displayWind(results.convertedDirection, results.convertedSpeedUnits.convertedWindSpeed, results.convertedSpeedUnits.convertedUnits);
    displayPressure(data.main.pressure);
}

function displayResults(data, results) {
    displayLocation(data.name, data.sys.country);
    displayDateTime();
    displayWeather(data, results);
}

async function getWeather() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=faefb21b364d236534cc9f8b0216f294`);
        const data = await response.json();
        console.log(data);
        const results = convertResults(data);
        displayResults(data, results);
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

changeTempButton.addEventListener('click', () => {
    convertTemp();
    displayTemps();
});