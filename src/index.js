import './style.css';
import { location, validateInput } from './validate';

const submitButton = document.querySelector('[type=submit]');

function displayLocation(city, country) {
    const header = document.querySelector('div.header>h1');
    header.textContent = `${city}, ${country}`;
}

function displayResults(data) {
    displayLocation(data.name, data.sys.country);
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