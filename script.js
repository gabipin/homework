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

    let hour = now.getHours().toString().padStart(2, '0');;
    let minute =now.getMinutes().toString().padStart(2, '0');;
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
        let url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;
        axios.get(url).then(displayWeather);
    }
}

function displayWeather(response) {
    let temperature = Math.round(response.data.list[0].main.temp);
    let weatherDescription = response.data.list[0].weather[0].description.toUpperCase();
    let localCityName = response.data.city.name.toUpperCase();
    let temperatureMin = Math.round(response.data.list[0].main.temp_min);  
    let temperatureMax = Math.round(response.data.list[0].main.temp_max);
    let icon = response.data.list[1].weather[0].icon;

    let temperatureNowDiv = document.querySelector(".temperature-now");
    temperatureNowDiv.innerHTML = `${temperature}ºC`;

    let weatherCommentDiv = document.querySelector(".weather-comment");
    weatherCommentDiv.innerHTML = `${weatherDescription}`;

    let cityNameDiv = document.querySelector(".city-name");
    cityNameDiv.innerHTML = `${localCityName}`;

    let temperatureAverage = document.querySelector(".temperature-avrg");
    temperatureAverage.innerHTML = `${temperatureMin}º | ${temperatureMax}º`;

    let largeIcon = document.querySelector(".large-image img");
    largeIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png` 

    getHourTemperature(response);
}


function getCityNameByLocation(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let urlLocation = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    axios.get(urlLocation).then(displayWeather);
    
}

function getHourTemperature (response){
    let date1 = new Date(response.data.list[1].dt * 1000);
    let hour1 = date1.getHours().toString().padStart(2, '0');
    let minute1 = date1.getMinutes().toString().padStart(2, '0');
    let firstHour = `${hour1}:${minute1}`;
    let firstHourTemp = Math.round(response.data.list[1].main.temp); 
    let firstIcon = response.data.list[1].weather[0].icon;
    

    let date2 = new Date(response.data.list[2].dt*1000);
    let hour2 = date2.getHours().toString().padStart(2, '0');
    let minute2 = date2.getMinutes().toString().padStart(2, '0');
    let secondHour = `${hour2}:${minute2}`;
    let secondHourTemp = Math.round(response.data.list[2].main.temp);
    let secondIcon = response.data.list[2].weather[0].icon; 

    let date3 = new Date(response.data.list[3].dt*1000);
    let hour3 = date3.getHours().toString().padStart(2, '0');
    let minute3 = date3.getMinutes().toString().padStart(2, '0');
    let thirdHour = `${hour3}:${minute3}`;
    let thirdHourTemp = Math.round(response.data.list[3].main.temp); 
    let thirdIcon = response.data.list[3].weather[0].icon; 

    let date4 = new Date(response.data.list[4].dt*1000);
    let hour4 = date4.getHours().toString().padStart(2, '0');
    let minute4 = date4.getMinutes().toString().padStart(2, '0');
    let fourthHour = `${hour4}:${minute4}`;
    let fourthHourTemp = Math.round(response.data.list[4].main.temp); 
    let fourthIcon = response.data.list[4].weather[0].icon; 

    let date5 = new Date(response.data.list[5].dt*1000);
    let hour5 = date5.getHours().toString().padStart(2, '0');
    let minute5 = date5.getMinutes().toString().padStart(2, '0');
    let fifthHour = `${hour5}:${minute5}`;
    let fifthHourTemp = Math.round(response.data.list[5].main.temp); 
    let fifthIcon = response.data.list[5].weather[0].icon; 

    let date6 = new Date(response.data.list[6].dt*1000);
    let hour6 = date6.getHours().toString().padStart(2, '0');
    let minute6 = date6.getMinutes().toString().padStart(2, '0');
    let sixthHour = `${hour6}:${minute6}`;
    let sixthHourTemp = Math.round(response.data.list[6].main.temp); 
    let sixthIcon = response.data.list[6].weather[0].icon; 

    let firstHourContainer = document.querySelector(".weather-1 .week-day");
    firstHourContainer.innerHTML = `${firstHour}`;

    let firstHourTemperature = document.querySelector(".weather-1 .week-temperature");
    firstHourTemperature.innerHTML = `${firstHourTemp}º`;

    let firstIconContainer = document.querySelector(".weather-1 .weather-icon img");
    firstIconContainer.src = `http://openweathermap.org/img/wn/${firstIcon}@2x.png`; 

    let secondHourContainer = document.querySelector(".weather-2 .week-day");
    secondHourContainer.innerHTML = `${secondHour}`;

    let secondHourTemperature = document.querySelector(".weather-2 .week-temperature");
    secondHourTemperature.innerHTML = `${secondHourTemp}º`;

    let secondIconContainer = document.querySelector(".weather-2 .weather-icon img");
    secondIconContainer.src = `http://openweathermap.org/img/wn/${secondIcon}@2x.png`;

    let thirdHourContainer = document.querySelector(".weather-3 .week-day");
    thirdHourContainer.innerHTML = `${thirdHour}`;

    let thirdHourTemperature = document.querySelector(".weather-3 .week-temperature");
    thirdHourTemperature.innerHTML = `${thirdHourTemp}º`;

    let thirdIconContainer = document.querySelector(".weather-3 .weather-icon img");
    thirdIconContainer.src = `http://openweathermap.org/img/wn/${thirdIcon}@2x.png`;

    let fourthHourContainer = document.querySelector(".weather-4 .week-day");
    fourthHourContainer.innerHTML = `${fourthHour}`;

    let fourthHourTemperature = document.querySelector(".weather-4 .week-temperature");
    fourthHourTemperature.innerHTML = `${fourthHourTemp}º`;

    let fouthIconContainer = document.querySelector(".weather-4 .weather-icon img");
    fouthIconContainer.src = `http://openweathermap.org/img/wn/${fourthIcon}@2x.png`;

    let fifthHourContainer = document.querySelector(".weather-5 .week-day");
    fifthHourContainer.innerHTML = `${fifthHour}`;

    let fifthHourTemperature = document.querySelector(".weather-5 .week-temperature");
    fifthHourTemperature.innerHTML = `${fifthHourTemp}º`;

    let fifthIconContainer = document.querySelector(".weather-5 .weather-icon img");
    fifthIconContainer.src = `http://openweathermap.org/img/wn/${fifthIcon}@2x.png`;

    let sixthHourContainer = document.querySelector(".weather-6 .week-day");
    sixthHourContainer.innerHTML = `${sixthHour}`;

    let sixthHourTemperature = document.querySelector(".weather-6 .week-temperature");
    sixthHourTemperature.innerHTML = `${sixthHourTemp}º`;

    let sixthIconContainer = document.querySelector(".weather-6 .weather-icon img");
    sixthIconContainer.src = `http://openweathermap.org/img/wn/${sixthIcon}@2x.png`;
}
let cityName = document.querySelector("form");
cityName.addEventListener("submit", getWeather);

setCurrentDateAndHour();



