const apiKey = "b8934cd3e5a043a2838104d76f3bd79a";
 // Substituir pela tua chave da OpenWeatherMap
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city === "") {
        alert("Por favor, insere uma cidade.");
        return;
    }

    fetchWeather(city);
});

function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt`;

    fetch(url)
        .then(res => {
            if (!res.ok) throw new Error("Cidade não encontrada");
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
const toggleTheme = document.getElementById("toggleTheme");
toggleTheme.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});
