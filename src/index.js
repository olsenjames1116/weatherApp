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
        searchBar.setCustomValidity('Please only enter letters');
    } else {
        searchBar.setCustomValidity("");
    }

    searchBar.reportValidity();
}

function validateInput() {
    if (form.checkValidity()) {
        location = searchBar.value;
        clearInput();
    } else {
        showSearchError();
    }
}

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    validateInput();
})