const axios = require("axios");
const getWeather = async (city, res) => {
    const weatherApiKey = "e2b76f4ed8718e794c7cfc7760b13c67"
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherApiKey}`;

    try {
        const response = await axios.get(apiUrl);
        const weatherData = response.data;
        res.render('weather', { weather: weatherData });
    } catch (error) {
        res.render('weather', { weather: null, error: 'Could not fetch weather data.' });
    }
}

module.exports = getWeather