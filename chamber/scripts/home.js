const apiKey = '1c81c5fdee81d7fcb6ad26931a8b040f';

const lat = -3.7319;
const lon = -38.5267;

async function loadSpotlights() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Could not load members.json");
        }

        const members = await response.json();

        const spotlightMembers = members.filter(
            member => member.membership === 2 || member.membership === 3
        );

        spotlightMembers.sort(() => Math.random() - 0.5);

        const selected = spotlightMembers.slice(0, 3);

        displaySpotlights(selected);

        } catch (error) {
        console.error(error);
    }
}

function displaySpotlights(members) {
    const spotlightsContainer = document.querySelector("#spotlight-container");

    spotlightsContainer.innerHTML = "";

    members.forEach(member => {


        const card = document.createElement("article");
        card.classList.add("spotlight-card");

        const image = document.createElement("img");
        image.src = `images/${member.image}`;
        image.alt = member.name;
        image.loading = "lazy";

        const name = document.createElement("h3");
        name.textContent = member.name;

        const description = document.createElement("p");
        description.textContent  = `${member.description}`;

        const header = document.createElement("div");
        header.classList.add("spotlight-header");

        header.append(image, name);

        card.append(
            header,
            description
        );

        spotlightsContainer.appendChild(card);
    });
}

loadSpotlights();



const currentURL =
`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

const forecastURL =
`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;





async function getCurrentWeather() {

    const response = await fetch(currentURL);
    const data = await response.json();
    //console.log(data);

    document.querySelector("#temperature").textContent =
        `${Math.round(data.main.temp)}°F`;

    document.querySelector("#weather-description").textContent =
        data.weather[0].description;    

    const icon = data.weather[0].icon;

    const weatherIcon = document.querySelector("#weather-icon");
    const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    weatherIcon.src = iconURL;
    weatherIcon.alt = data.weather[0].description;

};

getCurrentWeather();


async function getForecast() {

    const response = await fetch(forecastURL);
    const data = await response.json();

    const forecast = document.querySelector("#forecast");
    
    forecast.innerHTML = "";
    
    // console.log(data);
    // data.list.forEach((item, index) => {
    //     console.log(index, item.dt_txt);

    // });

    // console.log(data.list[8]);
    // console.log(data.list[16]);
    // console.log(data.list[24]);

    data.list.forEach((day, index) => {

        if (index === 8 || index === 16 || index === 24) {

            console.log(day.dt_txt);
            console.log(day.main.temp);

            const forecastCard = document.createElement("div");

            const icon = document.createElement("img");
            icon.src = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;
            icon.alt = day.weather[0].description;


            const forecastDay = document.createElement("p");
            const date = new Date(day.dt_txt);
            const dayName = date.toLocaleDateString("en-US", {weekday: "long"});
            forecastDay.textContent = `${dayName}: ${Math.round(day.main.temp)}°F`;
            
            forecastCard.append(icon, forecastDay);
            forecast.append(forecastCard);


        }

    });
}

getForecast();

