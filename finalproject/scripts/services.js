const geoApiKey = '6c9d313d4543479186144f2e447cf470';
const button = document.querySelector("#locationBtn");

let map;

button.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(showPosition);

});

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    createMap(latitude, longitude);

    // console.log(latitude);
    // console.log(longitude);

};

function createMap(latitude, longitude) {

    if (map){
        map.remove();
    }

    // Leaflet API creates a map inside the div "map" with 15 zoom and lat and lon
    map = L.map("map").setView([latitude, longitude], 15);

    // Add OpenStreetMap tiles(images) to the Leaflet map with coord (z,x,y) and adds to the Map
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap"}).addTo(map);

    // Leaflet API adds a marker for the user's current location
    L.marker([latitude, longitude]).addTo(map).bindPopup("You are here").openPopup();

    loadNearbyServices(latitude, longitude)

};

async function loadNearbyServices(latitude, longitude) {

    try {

        const radius = 15000;
        const url =
        `https://api.geoapify.com/v2/places?categories=pet.veterinary,pet.shop&filter=circle:${longitude},${latitude},${radius}&bias=proximity:${longitude},${latitude}&limit=20&apiKey=${geoApiKey}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        //console.log(data.features);

        // console.log("Resposta da API:", data);
        // console.log("Quantidade de serviços:", data.features.length);

        const servicesList = document.querySelector("#services-list");

        // console.log("Lista encontrada:", servicesList);

        servicesList.innerHTML = "";

        data.features.forEach((service, index) => {

            // console.log("Serviço:", service.properties);

            L.marker([
                service.properties.lat,
                service.properties.lon
            ])
            .addTo(map)
            .bindPopup(`
                <strong>${service.properties.name}</strong><br>
                ${service.properties.formatted}
            `);

            const card = document.createElement("article");
            card.classList.add("service-card");
            card.style.animationDelay = `${index * 0.2}s`;

            card.innerHTML = `
                <h3>${service.properties.name}</h3>
                <p>${service.properties.formatted}</p>
                <small>${service.properties.distance} m</small>
            `;

            servicesList.appendChild(card);


        });

    } catch (error) {
        console.error(error);

    }

};