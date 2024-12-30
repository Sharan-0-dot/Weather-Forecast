const BaseURL = "https://api.openweathermap.org/data/2.5/weather";
const cityName = document.querySelector("#cityName");
const temp = document.querySelector("#temperature");
const weather = document.querySelector("#weather");
const button = document.querySelector("#search");
const cities = document.querySelector("#cities");
const humidity = document.querySelector("#hum");
const pressure = document.querySelector("#pre");
const wind = document.querySelector("#win");
const display = document.querySelector("#days-info");

let latitude = "";
let longitude = "";
let URL = "";

cities.addEventListener("change", () => {
    latitude = cities.value.slice(0,7);
    longitude = cities.value.slice(9,16);
    URL = `${BaseURL}?lat=${latitude}&lon=${longitude}&appid=2dba9856ece65f32aaf1ac0ef7badf67`;
})

const fetchApi = async () => {
    if(!URL) {
        alert("Please select the city first");
        return;
    }
    let response = await fetch(URL);
    let data = await response.json();
    cityName.innerText = data.name;
    weather.innerText = data.weather[0].main;
    setImage();
    temp.innerText = (data.main.temp - 273).toFixed(2) + "  Degree";
    humidity.innerText = data.main.humidity + " %";
    pressure.innerText = data.main.pressure + " hPa";
    wind.innerText = data.wind.speed + " m/s";
}

function setImage() {
    if(weather.innerText.toLowerCase() == "rain") {
        display.setAttribute("style", "background-image: url('rain.jpg');");
    } else if(weather.innerText.toLowerCase() == "sunny") {
        display.setAttribute("style", "background-image: url('Sun.jpg');");
    } else {
        display.setAttribute("style", "background-image: url('clouds.jpg');");
    }
    switch(weather.innerText.toLowerCase()) {
        case "rain" : {
            display.setAttribute("style", "background-image: url('rain.jpg');");
            break;
        }
        case "sunny" : {
            display.setAttribute("style", "background-image: url('Sun.jpg');");
            break;
        }
        case "clouds" : {
            display.setAttribute("style", "background-image: url('clouds.jpg');");
            break;
        }
        case "fog" : {
            display.setAttribute("style", "background-image: url('fog.jpeg');");
            break;
        }
        case "mist" : {
            display.setAttribute("style", "background-image: url('mist.jpeg');");
            break;
        }
        default : {
            display.setAttribute("style", "background-image: url('clear.jpg');");
        }
    }
}

button.onclick = fetchApi;