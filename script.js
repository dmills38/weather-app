// wait until HTML is fully loaded

document.addEventListener('DOMContentLoaded', function() {

    // weather API key

    const API_KEY = 'f50db64639d7d5a939b5bbd1d2fcc518';

    // function to build API URL

    function getWeatherUrl(city) {
        // opens openWeatherMap API URL for current weather

        return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`;

    }

    // grab elements we will use by their ids

    const cityInput = document.getElementById('city-input');
    const fetchButton = document.getElementById('search-button');
    const resultDiv = document.getElementById('weather-result');

    // when button is clicked, run this function

    fetchButton.addEventListener('click', function () {
        // after click read city input and remove whitespaces
        const city = cityInput.value.trim();

        // if no city is entered, show message and return

        if (!city) {
            resultDiv.textContent = 'Please enter a city name.';
            return;
        }

        // when user hits search, show a message to ensure them something is happening

        resultDiv.textContent = 'Searching for ' + city + '...';

        // build the API URL for the entered city

        const url = getWeatherUrl(city);

        // fetch data from openWeatherMap API

        fetch(url)
            .then(function (response) {
                // convert response to JSON
                return response.json();
            })
            .then(function (data) {
                // check if city was found
                if (data.cod === 200) {
                    // display weather info
                    // helper to capitalize properly (first letter)
function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// inside your success branch, build a nicer card with an icon
const iconCode = data.weather[0].icon; // e.g. "01d", "04n"
const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

// update result area with icon, big temp, description
resultDiv.innerHTML = `
    <div class="weather-card" role="region" aria-live="polite" aria-label="Weather results for ${data.name}">
        <h2>${data.name}, ${data.sys.country}</h2>
        <img
            class="weather-icon"
            src="${iconUrl}"
            alt="${capitalize(data.weather[0].description)}"
            width="120"
            height="120"
        >
        <div class="temp-large">${Math.round(data.main.temp)} °F</div>
        <div class="weather-desc">${capitalize(data.weather[0].description)}</div>
        <div class="small-meta">
            <p>Feels like: ${Math.round(data.main.feels_like)} °F</p>
            <p>Humidity: ${data.main.humidity}%</p>
        </div>
    </div>
`;

                
                } else {
                    // city not found or other error
                    resultDiv.textContent = 'Error fetching weather data. Try again later.';
                }
            })
            .catch(function(error) {
                // handle network errors
                console.error('Error fetching weather:', error);
                resultDiv.textContent = 'Network error. Please try again later.';
            })

        // log to console so i can watch what's happening

        console.log('Fetching weather for city:', city);
    });

    // enable pressing Enter key to trigger search

    cityInput.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            fetchButton.click(); // same as clicking the button
        }
    });
});