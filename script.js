const apiKey = "2626963ed212faeafa7e601b01334b7b";

function getWeather() {

    const city = document.getElementById("cityInput").value.trim();

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    
    document.getElementById("cityName").innerText = "Loading...";
    
    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {

            if (!response.ok) {
                throw new Error(`City not found!`);
            }

            return response.json();
        })

        .then(data => {

           
            document.getElementById("cityName").innerText =
                `${data.name}, ${data.sys.country}`;

            
            document.getElementById("temperature").innerText =
                `🌡️ Temperature: ${Math.round(data.main.temp)} °C`;

            
            document.getElementById("humidity").innerText =
                `💧 Humidity: ${data.main.humidity}%`;

            
            document.getElementById("condition").innerText =
                `☁️ Condition: ${data.weather[0].description}`;

            
            const iconCode = data.weather[0].icon;

            const iconURL =
                `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

            document.getElementById("weatherIcon").src = iconURL;
        })

        .catch(error => {

            console.log(error);

            document.getElementById("cityName").innerText =
                "Error";

            document.getElementById("temperature").innerText =
                "Temperature: -- °C";

            document.getElementById("humidity").innerText =
                "Humidity: -- %";

            document.getElementById("condition").innerText =
                error.message;

            document.getElementById("weatherIcon").src = "";
        });
}


// Press Enter to search
document.getElementById("cityInput").addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        getWeather();
    }

});