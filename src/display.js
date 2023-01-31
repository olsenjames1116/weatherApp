import earth from './images/earth.png';
import capitalizeFirstLetter from "./capitalize";

const windElement = document.querySelector('span#wind');

// Adds a timestamp to the page from each weather query
function displayDateTime() {
    const currentDate = new Date();
    
    /* Months are provided on a scale starting with zero. Adding a one shifts 
    this scale and allows users to see a more widely recognizable scale. */
    let month = currentDate.getMonth() + 1;
    /* Adds a zero in front of single digit months to provide the user with a more 
    widely recognizable representation of the month. */
    if (month < 10) {
        month = `0${month}`;
    }

    let date = currentDate.getDate();
    /* Adds a zero in front of single digit dates to provide the user with a more 
    widely recognizable representation of the date. */
    if (date < 10) {
        date = `0${date}`;
    }

    const dateElement = document.querySelector('span#date');
    dateElement.textContent = `${month}/${date}/${currentDate.getFullYear()}`;
    
    const timeElement = document.querySelector('span#time');

    let hours = currentDate.getHours();

    /* Adds a zero in front of single digit hours to provide the user with a more 
    widely recognizable representation of the hour. */
    if (hours < 10) {
        hours = `0${hours}`;
    }

    let minutes = currentDate.getMinutes();
    /* Adds a zero in front of single digit minutes to provide the user with a more 
    widely recognizable representation of the minute. */
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    timeElement.textContent = `${hours}:${minutes}`;
}

/* Displays the queried location to the page so the user can confirm they are
 looking at their requested weather data. */
function displayLocation(city, country) {
    const header = document.querySelector('div.content>h2');
    header.textContent = `${city}, ${country}`;
}

/* Displays all temp information from the API call and updates when the user 
converts weather units. */
export function displayTemps(temps) {
    const currentTempElement = document.querySelector('div.temp>span:first-child');
    currentTempElement.textContent = `${temps[0]}\xB0${temps[4]}`;

    const feelTempElement = document.querySelector('div.feel>span:nth-child(2)');
    feelTempElement.textContent = `${temps[1]}\xB0${temps[4]}`;

    const highTempElement = document.querySelector('div.high>span:nth-child(2)');
    highTempElement.textContent = `${temps[2]}\xB0${temps[4]}`;

    const lowTempElement = document.querySelector('div.low>span:nth-child(2)');
    lowTempElement.textContent = `${temps[3]}\xB0${temps[4]}`;
}

/* Makes a call to the OpenWeather url that corresponds to the icon data from the API call
    and displays it to the user so they can get a better visual representation of the current weather. */
async function displayWeatherIcon(icon) {
    const weatherIconElement = document.querySelector('img#weatherIcon');
    try {
    const image = await fetch(`http://openweathermap.org/img/wn/${icon}@2x.png`);
    const {url} = image;
    weatherIconElement.src = url;
    } catch(error) {
        // Displays a default icon and error if the requested icon cannot be reached
        weatherIconElement.src = earth;
        alert(error);
    }
}

// Displays a description of the weather from the API call to the user
function displayDescription(description) {
    const descriptionElement = document.querySelector('p#description');
    const descriptionFormatted = capitalizeFirstLetter(description);
    descriptionElement.textContent = descriptionFormatted;
}

// Displays the humidity from the API call to the user
function displayHumidity(humidity) {
    const humidityElement = document.querySelector('span#humidity');
    humidityElement.textContent = `${humidity}%`;
}

/* Displays the wind information from the API call as well as the converted wind information
    at the user's request. */
export function displayWind(direction, speed, units) {
    windElement.textContent = `${direction} ${speed} ${units}`;
}

// Displays the converted pressure from the API call to the user.
function displayPressure(pressure) {
    const pressureElement = document.querySelector('span#pressure');
    pressureElement.textContent = `${pressure}"`;
}

// Calls all the display weather functions after the API responds.
function displayWeather(data, results) {
    displayTemps(results.convertedTemps);
    displayWeatherIcon(data.weather[0].icon);
    displayDescription(data.weather[0].description);
    displayHumidity(data.main.humidity);
    displayWind(results.convertedDirection, results.convertedSpeedUnits.convertedWindSpeed, results.convertedSpeedUnits.convertedUnits);
    displayPressure(results.convertedPressure);
}

// Calls all the display functions after the API responds.
export function displayResults(data, results) {
    displayLocation(data.name, data.sys.country);
    displayDateTime();
    displayWeather(data, results);
}
