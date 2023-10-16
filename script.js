// async function fetchData(url) {
//     const response = await fetch(url);
//     const data = await response.json();
//     return data;
//   }

//   async function getData() {
//     const data = await fetchData('https://get.geojs.io/v1/ip/geo.json');
//     console.log('Полученные данные:', data);

//   }

//   getData();

const cityElement = document.getElementById("city");
const temperatureElement = document.getElementById("temperature");
const windSpeedElement = document.getElementById("windSpeed");
const weatherDescriptionElement = document.getElementById("weatherDescription");

// weatherDescriptionElement.textContent = weatherDescription;

async function getWeather() {
  const response = await fetch("https://get.geojs.io/v1/ip/geo.json");
  const data = await response.json();
  const { latitude, longitude, city } = data;

  cityElement.textContent = `${city}`;
  //   console.log(
  //     `Location: ${city}, Latitude: ${latitude}, Longitude: ${longitude}`
  //   );
  

  const weatherResponse = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
  );
  const weatherData = await weatherResponse.json();
  const { current_weather } = weatherData;
  const { temperature, windspeed, weathercode } = current_weather;

  temperatureElement.textContent = ` ${temperature}°C`;
  windSpeedElement.textContent = ` ${windspeed} м/с`;
  weatherDescriptionElement.textContent = `${getCode(weathercode)} `;

  // console.log("Temperature data:", weatherData);

  const weatherCode = weatherData.current_weather.weathercode;
}

function getCode(weatherCode) {
  let weatherDescription;

  switch (weatherCode) {
    case 0:
      weatherDescription = "Clear sky";
      return;
    case 1:
    case 2:
    case 3:
      return "Преимущественно ясно, переменная облачность и пасмурно";
    case 45:
    case 48:
      return "Fog and depositing rime fog";
    case 51:
    case 53:
    case 55:
      return "Drizzle: Light, moderate, and dense intensity";
    case 56:
    case 57:
      return "Freezing Drizzle: Light and dense intensity";
    case 61:
    case 63:
    case 65:
      return "Rain: Slight, moderate, and heavy intensity";
    case 66:
    case 67:
      return "Freezing Rain: Light and heavy intensity";
    case 71:
    case 73:
    case 75:
      return "Snow fall: Slight, moderate, and heavy intensity";
    case 77:
      return "Snow grains";
    case 80:
    case 81:
    case 82:
      return "Rain showers: Slight, moderate, and violent";
    case 85:
    case 86:
      return "Snow showers slight and heavy";
    case 95:
      return "Thunderstorm: Slight or moderate";
    case 96:
    case 99:
      return "Thunderstorm with slight and heavy hail";
    default:
      weatherDescription = "Unknown";
  }
  return weatherDescription;

  //      console.log(`Weather Condition: ${weatherDescription}`);
}

getWeather();
console.log(getCode(3));
