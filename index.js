const express = require("express")
const {join} = require("path");
const getWeather = require("./util/getWeather")
const getServerIP = require("./util/getIp")
const app = express()
const axios = require('axios')
const PORT = 3000
const ipgeolocationApiKey = "ac5a71156db34075a7b3a330842dc440"

app.set('view engine', 'ejs')

app.set('views', join(__dirname, 'views'))

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
});

app.get('/weather', async (req, res) => {
    try {
        let clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress
        if (clientIp === '::1' || clientIp === '127.0.0.1') {
            clientIp = await getServerIP()
        }
        const response = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${ipgeolocationApiKey}&ip=${clientIp}&lang=en&fields=city`)
        const city = response.data.city
        await getWeather(city, res)
    } catch (error) {
        console.error('Error fetching geolocation data:', error)
        res.status(500).json({ error: 'Error fetching geolocation data' })
    }
});

app.get('/weather/:city', async (req, res) => {
    const city = req.params.city
    await getWeather(city, res)
});



app.listen( PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})
