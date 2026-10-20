// Get HTML elements
const form = document.getElementById("converter-form");
const temperatureInput = document.getElementById("temperature");
const fromUnit = document.getElementById("from-unit");
const toUnit = document.getElementById("to-unit");
const result = document.getElementById("result");
const errorMessage = document.getElementById("error-message");

// Convert the given temperature to Celsius first
function toCelsius(value, unit) {
    if (unit === "C") {
        return value;
    }

    if (unit === "F") {
        return (value - 32) * 5 / 9;
    }

    return value - 273.15; // Kelvin to Celsius
}

// Convert Celsius to the selected output unit
function fromCelsius(value, unit) {
    if (unit === "C") {
        return value;
    }

    if (unit === "F") {
        return (value * 9 / 5) + 32;
    }

    return value + 273.15; // Celsius to Kelvin
}

// Display an error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.hidden = false;
    result.textContent = "--";
}

// Convert when the form is submitted
form.addEventListener("submit", function (event) {
    event.preventDefault();

    errorMessage.textContent = "";
    errorMessage.hidden = true;
    result.textContent = "--";

    const value = temperatureInput.value.trim();
    const temperature = Number(value);
    const inputUnit = fromUnit.value;
    const outputUnit = toUnit.value;

    // Validate empty or invalid input
    if (value === "" || !Number.isFinite(temperature)) {
        showError("Please enter a valid temperature.");
        return;
    }

    // Temperatures below absolute zero are impossible
    const celsius = toCelsius(temperature, inputUnit);

    if (celsius < -273.15) {
        showError("Temperature cannot be below absolute zero.");
        return;
    }

    const converted = fromCelsius(celsius, outputUnit);

    // Format the result to a maximum of two decimal places
    const formatted = Number(converted.toFixed(2));

    const symbols = {
        C: "°C",
        F: "°F",
        K: "K"
    };

    result.textContent = `${formatted} ${symbols[outputUnit]}`;
});

// Reset the result and error when the form is cleared
form.addEventListener("reset", function () {
    result.textContent = "--";
    errorMessage.textContent = "";
    errorMessage.hidden = true;
});