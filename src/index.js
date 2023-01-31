import './style.css';
import earth from './images/earth.png';
import { location, validateInput } from './validate';

const submitButton = document.querySelector('[type=submit]');
const tempNums = document.querySelectorAll('span.tempNum');
const changeTempButton = document.querySelector('div.temp>div>button');
const windElement = document.querySelector('span#wind');
const changeWindSpeedButton = document.querySelector('div.wind>div>button');

function convertStringToNum(...strings) {
    const numbers = [];

    strings.forEach((string) => {
        const number = parseFloat(string);
        numbers.push(number);
    })

    return numbers;
}

function convertNodesToArray(nodeList) {
    return Array.from(nodeList);
}

function getTempText(elementArray, separator) {
    const textArray = [];

    elementArray.forEach((element) => {
        textArray.push(element.textContent);
    });

    const arrayString = textArray.join('');
    const temporaryArray = arrayString.split(separator);
    return [temporaryArray[0], temporaryArray[1].substring(1, 3), temporaryArray[2].substring(1, 3), temporaryArray[3].substring(1, 3), temporaryArray[4]];
}

function convertTemp(currentTemp, feelTemp, highTemp, lowTemp, tempUnits) {
    const temps = convertStringToNum(currentTemp, feelTemp, highTemp, lowTemp);

    if (tempUnits === 'C') {
        for (let i = 0; i < temps.length; i += 1) {
            const tempCelsius = temps[i];
            const tempFahrenheit = Math.round(tempCelsius * 9 / 5 + 32);
            temps[i] = tempFahrenheit;
        }

        temps[4] = 'F';

    } else if (tempUnits === 'F') {
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

    return temps;
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
    const windSpeedNum = convertStringToNum(windSpeed);
    let convertedWindSpeed;
    let convertedUnits;

    if (units === 'kph') {
        convertedWindSpeed = Math.round(windSpeedNum * 0.621371);
        convertedUnits = 'mph';
    } else if (units === 'mph') {
        convertedWindSpeed = Math.round(windSpeedNum * 1.60934);
        convertedUnits = 'kph';
    } else {
        convertedWindSpeed = Math.round(windSpeedNum * 2.23694);
        convertedUnits = 'mph';
    }

    return { convertedWindSpeed, convertedUnits };
}

function convertPressure(pressure) {
    return (pressure * 0.02953).toFixed(2);
}

function convertResults(data) {
    const convertedTemps = convertTemp(data.main.temp, data.main.feels_like, data.main.temp_max, data.main.temp_min, 'K');
    const convertedDirection = convertWindDirection(data.wind.deg);
    const convertedSpeedUnits = convertWindUnits(data.wind.speed);
    const convertedPressure = convertPressure(data.main.pressure);

    return { convertedTemps, convertedDirection, convertedSpeedUnits, convertedPressure };
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

getWeather();

changeTempButton.addEventListener('click', () => {
    const tempElementArray = convertNodesToArray(tempNums);
    const tempArray = getTempText(tempElementArray, '\xB0');
    const tempNumArray = convertTemp(tempArray[0], tempArray[1], tempArray[2], tempArray[3], tempArray[4]);
    displayTemps(tempNumArray);
});

changeWindSpeedButton.addEventListener('click', () => {
    const windArray = windElement.textContent.split(' ');
    const convertedWind = convertWindUnits(windArray[1], windArray[2]);
    displayWind(windArray[0], convertedWind.convertedWindSpeed, convertedWind.convertedUnits);
});