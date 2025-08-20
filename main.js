const apiKey = "b8934cd3e5a043a2838104d76f3bd79a";
// 🔁 Coloca tua chave real aqui

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

// 🔍 Evento para pesquisa manual
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city === "") {
        alert("Por favor, insere uma cidade.");
        return;
    }

    fetchWeatherByCity(city);
});

// 🔄 Detecta localização automaticamente
window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetchWeatherByCoords(latitude, longitude);
        }, () => {
            console.log("Localização negada pelo usuário.");
        });
    } else {
        console.log("Geolocalização não suportada.");
    }
});

// 📍 Pega o tempo por cidade
function fetchWeatherByCity(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt`;
    fetchWeather(url);
}

// 📍 Pega o tempo por latitude e longitude
function fetchWeatherByCoords(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt`;
    fetchWeather(url);
}

// 🌦️ Faz a requisição e mostra os dados
function fetchWeather(url) {
    fetch(url)
        .then(res => {
            if (!res.ok) throw new Error("Erro ao obter clima");
            return res.json();
        })
        .then(data => {
            document.getElementById("cityName").textContent = data.name;
            document.getElementById("temperature").textContent = data.main.temp.toFixed(1);
            document.getElementById("condition").textContent = data.weather[0].description;
            document.getElementById("humidity").textContent = data.main.humidity;
            weatherResult.classList.remove("hidden");
        })
        .catch(err => {
            alert("Erro: " + err.message);
            weatherResult.classList.add("hidden");
        });
}
