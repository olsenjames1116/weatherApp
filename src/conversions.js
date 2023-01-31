// Converts nodelist to an array to access array prototype functions
export function convertNodesToArray(nodeList) {
    return Array.from(nodeList);
}

// Any amount of strings will converted to numbers to allow for mathematical operations
function convertStringToNum(...strings) {
    const numbers = [];

    strings.forEach((string) => {
        const number = parseFloat(string);
        numbers.push(number);
    })

    return numbers;
}

/* Temperature from the API call is originally given in Kelvin. To allow for a more recognizable 
    unit of measure, this is converted to Fahrenheit. There is a conversion button on the page that
    allows the user to convert to their preferred units (Celsius or Fahrenheit). This handles all of
    those conversions. */
export function convertTemp(currentTemp, feelTemp, highTemp, lowTemp, tempUnits) {
    const temps = convertStringToNum(currentTemp, feelTemp, highTemp, lowTemp);

    if (tempUnits === 'C') {
        // Reached if the user has pressed the conversion button
        for (let i = 0; i < temps.length; i += 1) {
            const tempCelsius = temps[i];
            const tempFahrenheit = Math.round(tempCelsius * 9 / 5 + 32);
            temps[i] = tempFahrenheit;
        }

        temps[4] = 'F';

    } else if (tempUnits === 'F') {
        // Reached if the user has pressed the conversion button
        for (let i = 0; i < temps.length; i += 1) {
            const tempFahrenheit = temps[i];
            const tempCelsius = Math.round(5 / 9 * (tempFahrenheit - 32));
            temps[i] = tempCelsius;
        }

        temps[4] = 'C';
    } else {
        // Reached off the initial call with data from the API.
        for (let i = 0; i < temps.length; i += 1) {
            const tempKelvin = temps[i];
            const tempFahrenheit = Math.round(1.8 * (tempKelvin - 273.15) + 32);
            temps[i] = tempFahrenheit;
        }

        temps[4] = 'F';
    }

    return temps;
}

/* Directional data from the API call is returned in degrees. This function is used to
    create a more recognizable measurement for the user by converting direction to a cardinal
    direction. */
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

/* Wind speed data from the API call is in m/s. This function is called first to convert units
    from m/s to mph. This will help give the user a more recognizable measurement. A conversion 
    button is included on the page that allows the user to convert to their preferred units (mph or kph).
    This function will handle all of those conversions. */
export function convertWindUnits(windSpeed, units) {
    const windSpeedNum = convertStringToNum(windSpeed);
    let convertedWindSpeed;
    let convertedUnits;

    if (units === 'kph') {
        // Reached if the user has pressed the conversion button
        convertedWindSpeed = Math.round(windSpeedNum * 0.621371);
        convertedUnits = 'mph';
    } else if (units === 'mph') {
        // Reached if the user has pressed the conversion button
        convertedWindSpeed = Math.round(windSpeedNum * 1.60934);
        convertedUnits = 'kph';
    } else {
        // Reached on the initial call with data from the API.
        convertedWindSpeed = Math.round(windSpeedNum * 2.23694);
        convertedUnits = 'mph';
    }

    return { convertedWindSpeed, convertedUnits };
}

/* Pressure data from the API call is in hpa. This function converts from hpa to Hg. This
    provides the user with a more widely recognized unit. */
function convertPressure(pressure) {
    return (pressure * 0.02953).toFixed(2);
}

// Called from the index file to trigger the conversions from the original API call.
export function convertResults(data) {
    const convertedTemps = convertTemp(data.main.temp, data.main.feels_like, data.main.temp_max, data.main.temp_min, 'K');
    const convertedDirection = convertWindDirection(data.wind.deg);
    const convertedSpeedUnits = convertWindUnits(data.wind.speed);
    const convertedPressure = convertPressure(data.main.pressure);

    return { convertedTemps, convertedDirection, convertedSpeedUnits, convertedPressure };
}