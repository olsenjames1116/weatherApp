import './style.css';
import { convertNodesToArray, convertTemp, convertWindUnits, convertResults } from './conversions';
import displayResults from './display';
import { location, validateInput } from './validate';

const submitButton = document.querySelector('[type=submit]');
const tempNums = document.querySelectorAll('span.tempNum');
const changeTempButton = document.querySelector('div.temp>div>button');
const windElement = document.querySelector('span#wind');
const changeWindSpeedButton = document.querySelector('div.wind>div>button');

function getTempText(elementArray, separator) {
    const textArray = [];

    elementArray.forEach((element) => {
        textArray.push(element.textContent);
    });

    const arrayString = textArray.join('');
    const temporaryArray = arrayString.split(separator);
    return [temporaryArray[0], temporaryArray[1].substring(1, 3), temporaryArray[2].substring(1, 3), temporaryArray[3].substring(1, 3), temporaryArray[4]];
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