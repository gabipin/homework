let apiKey = "b2f72c64ab895324e0008a4bac7a0261";

function setCurrentDateAndHour() {
    let now = new Date();

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednsday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    
    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    
    let day = days[now.getDay()];
    let month = months[now.getMonth()]; 
    let date = now.getDate();
    let currentDate = `${day}, ${month} ${date}`;

    let hour = now.getHours();
    let minute =now.getMinutes();
    let currentTime = `${hour}:${minute}`;

    let dateContainer = document.querySelector(".current-date");
    dateContainer.innerHTML = currentDate;

    let hourContainer = document.querySelector(".current-time");
    hourContainer.innerHTML = currentTime;
    getWeather();
}

function getWeather(event) {
    if(event) {
        event.preventDefault();
    }

    let cityName = document.querySelector(".search-city").value;

    if (cityName === ""){
        navigator.geolocation.getCurrentPosition(getCityNameByLocation);
    } 
    else
    {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
        axios.get(url).then(displayWeather);
    }
}

function displayWeather(response) {
    let temperature = Math.round(response.data.main.temp);
    let weatherDescription = response.data.weather[0].description.toUpperCase();
    let localCityName = response.data.name.toUpperCase();
    let temperatureMin = Math.round(response.data.main.temp_min);  
    let temperatureMax = Math.round(response.data.main.temp_max);

    let temperatureNowDiv = document.querySelector(".temperature-now");
    temperatureNowDiv.innerHTML = `${temperature}ºC`;

    let weatherCommentDiv = document.querySelector(".weather-comment");
    weatherCommentDiv.innerHTML = `${weatherDescription}`;

    let cityNameDiv = document.querySelector(".city-name");
    cityNameDiv.innerHTML = `${localCityName}`;

    let temperatureAverage = document.querySelector(".temperature-avrg");
    temperatureAverage.innerHTML = `${temperatureMin}º/${temperatureMax}º`;
}


function getCityNameByLocation(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let urlLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    axios.get(urlLocation).then(displayWeather);
    
}


let cityName = document.querySelector("form");
cityName.addEventListener("submit", getWeather);

setCurrentDateAndHour();



