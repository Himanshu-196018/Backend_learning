const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function (req, res) {
    const fname = req.body.fname;
    const lname = req.body.lname
    const email = req.body.email;

    const url = "https://us10.api.mailchimp.com/3.0/lists/75e0cf4234"
    const apiKey = "65b9a1c6a2860b402774f0c0b5e6f8fe-us10";
    const options = {
        method: "POST",
        auth: `Himanshu:${apiKey}`
    }

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                FNAME: fname,
                LNAME: lname
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const request = https.request(url, options, function (response) {
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
        if(response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        }else {
            res.sendFile(__dirname + "/failure.html");
        }
    })
    request.write(jsonData);
    request.end();


})

app.listen(3000, function () {
    console.log("Server is running at port 3000");
});