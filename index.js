const express = require("express");
const http = require("http");
const requests = require("requests");
var bodyParser = require('body-parser');
const { default: axios } = require("axios");
require("dotenv").config();

const apiKey = process.env.Api_key;

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }))

var apiData = "null";

let weather = "sunny"

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/form.html");
});

app.get("/weather",async (req, res) => {
        
    let city = req.query.city;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // fetch(url)
    // .then((response) => response.json())
    // .then((data) => {
    // apiData = data;
    // });
    try{
    const fetchApi = await axios.get(url);
    apiData = fetchApi.data;

    if(apiData.weather[0].main == "Clouds"){
        weather = "cloud";
    }
    else if((apiData.weather[0].main == "Rain" || apiData.weather[0].main == "Drizzle")){
        weather = "cloud-rain";
    }
    else {
        weather = "sun";
    }
    res.render("index.ejs", { temperature: apiData.main.temp, tempmin: apiData.main.temp_min, tempmax: apiData.main.temp_max, location: apiData.name, country: apiData.sys.country, weather: weather });

    }    
    catch{
        res.send("<h1>City Not Found</h1>")
    }
})


app.listen(4000);
