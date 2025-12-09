// wait until HTML is fully loaded

document.addEventListener('DOMContentLoaded', function() {

    // weather API key

    const API_KEY = '';

    // function to build API URL

    function getWeatherUrl(city) {
        // opens openWeatherMap API URL for current weather

        return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

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
                    resultDiv.innerHTML = `
                        <h2>${data.name}, ${data.sys.country}</h2>
                        <p>Temperature: ${data.main.temp} °C</p>
                        <p>Weather: ${data.weather[0].description}</p>
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