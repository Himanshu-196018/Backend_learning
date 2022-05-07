const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res) {
    const query = req.body.cityName;
    const path = "api.openweathermap.org/data/2.5/weather";
    const apiKey = "d0eed8800d2fc575fd5c45eb557db08f";
    const units = "metric";
    const apiUrl = `https://${path}?appid=${apiKey}&q=${query}&units=${units}`;
    https.get(apiUrl, function (response) {
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDesc = weatherData.weather[0].description;
            const weatherIcon = weatherData.weather[0].icon;
            const imgUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
            
            res.write(`<p>The weather is currently ${weatherDesc}</p>`);
            res.write(
                `<h1>The current temperature in ${query} is ${temp} degrees Celcius.</h1>`
            );
            res.write(`<img src=${imgUrl}>`);
            res.send();
        });
    });
})

app.listen(3000, function () {
    console.log("Server is running on port 3000");
});
