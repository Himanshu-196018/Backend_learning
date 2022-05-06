const express = require("express")
const app = express();

app.get("/", function(request, response) {   //(req, res)
    response.send("<h1>Hello world<h1>");
})

app.get("/contacts", function(req, res) {
    res.send("Contact me at himanshulohchab111@gmail.com")
})

app.get("/yoo", function(req, res) {
    res.send("This is fun....")
})

app.listen(3000, function() {
    console.log("port has been started at server 3000");
});