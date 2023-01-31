const form = document.querySelector('form');
const searchBar = document.querySelector('input');
// eslint-disable-next-line import/no-mutable-exports
let location = 'New York';

// Clear search input after the user has submitted
function clearInput() {
    searchBar.value = '';
}

// Reached after a validity issue has been found from the user input.
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

// Reached after the user has submitted their input.
function validateInput() {
    if (form.checkValidity()) {
        location = searchBar.value;
        clearInput();
        return true;
    } 

    showSearchError();
    return false;
}

export { location, validateInput }