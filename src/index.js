import './style.css';
import { convertNodesToArray, convertTemp, convertWindUnits, convertResults } from './conversions';
import displayResults from './display';
import { location, validateInput } from './validate';

const submitButton = document.querySelector('[type=submit]');
const tempNums = document.querySelectorAll('span.tempNum');
const changeTempButton = document.querySelector('div.temp>div>button');
const windElement = document.querySelector('span#wind');
const changeWindSpeedButton = document.querySelector('div.wind>div>button');

// Retrieve text for all temperature information from the DOM to be converted at the user's request.
function getTempText(elementArray, separator) {
    const textArray = [];

    elementArray.forEach((element) => {
        textArray.push(element.textContent);
    });

    const arrayString = textArray.join('');
    const temporaryArray = arrayString.split(separator);
    return [temporaryArray[0], temporaryArray[1].substring(1, 3), temporaryArray[2].substring(1, 3), temporaryArray[3].substring(1, 3), temporaryArray[4]];
}

// Retrieves API response from OpenWeather API on the page loading.
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

// Triggered after the user has entered and submitted a location in the search bar.
submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    const validInput = validateInput();

    if (validInput) {
        getWeather();
    }
});

// Initiates the API call with default data on the page loading.
getWeather();

// Triggered after the user has selected to change the current temperature units.
changeTempButton.addEventListener('click', () => {
    const tempElementArray = convertNodesToArray(tempNums);
    const tempArray = getTempText(tempElementArray, '\xB0');
    const tempNumArray = convertTemp(tempArray[0], tempArray[1], tempArray[2], tempArray[3], tempArray[4]);
    displayTemps(tempNumArray);
});

// Triggered after the user has selected to change the current wind speed units.
changeWindSpeedButton.addEventListener('click', () => {
    const windArray = windElement.textContent.split(' ');
    const convertedWind = convertWindUnits(windArray[1], windArray[2]);
    displayWind(windArray[0], convertedWind.convertedWindSpeed, convertedWind.convertedUnits);
});