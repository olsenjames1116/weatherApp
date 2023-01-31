export function convertNodesToArray(nodeList) {
    return Array.from(nodeList);
}

function convertStringToNum(...strings) {
    const numbers = [];

    strings.forEach((string) => {
        const number = parseFloat(string);
        numbers.push(number);
    })

    return numbers;
}

export function convertTemp(currentTemp, feelTemp, highTemp, lowTemp, tempUnits) {
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

export function convertWindUnits(windSpeed, units) {
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

export function convertResults(data) {
    const convertedTemps = convertTemp(data.main.temp, data.main.feels_like, data.main.temp_max, data.main.temp_min, 'K');
    const convertedDirection = convertWindDirection(data.wind.deg);
    const convertedSpeedUnits = convertWindUnits(data.wind.speed);
    const convertedPressure = convertPressure(data.main.pressure);

    return { convertedTemps, convertedDirection, convertedSpeedUnits, convertedPressure };
}