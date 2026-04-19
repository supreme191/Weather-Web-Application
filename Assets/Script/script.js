const apiKey = "{#}";
// Insert your API key from openweathermap.org in the place of #
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const city = document.querySelector("input");
const submit = document.querySelector("button");
const weatherImg = document.querySelector(".weather-icon");


async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "None";
    }

    else {
        document.querySelector(".error").style.display = "None";
        var data = await response.json();

        document.querySelector(".weather").style.display = "block";

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
        document.querySelector(".wind").innerHTML = `${(data.wind.speed * 3.6).toFixed(2)}km/hr`;
        document.querySelector(".temp").innerHTML = `${(data.main.temp).toFixed(0)}<sup>o</sup>C`;

        if (data.weather[0].main == "Clouds") weatherImg.src = "./Assets/Images/clouds.png";
        else if (data.weather[0].main == "Clear") weatherImg.src = "./Assets/Images/clear.png";
        else if (data.weather[0].main == "Rain") weatherImg.src = "./Assets/Images/rain.png";
        else if (data.weather[0].main == "Drizzle") weatherImg.src = "./Assets/Images/drizzle.png";
        else if (data.weather[0].main == "Mist") weatherImg.src = "./Assets/Images/mist.png";
    }
}    

submit.addEventListener("click", () => {
    checkWeather(city.value);
})