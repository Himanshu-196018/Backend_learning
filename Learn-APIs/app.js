const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req, res) {
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?appid=d0eed8800d2fc575fd5c45eb557db08f&q=delhi,india&units=metric";
    https.get(apiUrl, function(response) {
        console.log(response);
    })

    res.send("App is up and running");
})



app.listen(3000, function() {
    console.log("Server is running on port 3000");

})