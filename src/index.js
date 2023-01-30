import './style.css';

const form = document.querySelector('form');
const searchBar = document.querySelector('input');
const submitButton = document.querySelector('[type=submit]');
let location;

function clearInput() {
    searchBar.value = '';
}

function showSearchError() {
    if (searchBar.validity.valueMissing) {
        searchBar.setCustomValidity('Please enter a city');
    } else if (searchBar.validity.patternMismatch) {
        searchBar.setCustomValidity('Please only enter a city or a city followed with a comma and either a state (US only) or a country code. Ex: Denver, Colorado');
    } else {
        searchBar.setCustomValidity("");
    }

    searchBar.reportValidity();
}

function validateInput() {
    if (form.checkValidity()) {
        location = searchBar.value;
        clearInput();
        return true;
    } 

    showSearchError();
    return false;
}

async function getWeather() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=faefb21b364d236534cc9f8b0216f294`);
        const data = await response.json();
        console.log(data);
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