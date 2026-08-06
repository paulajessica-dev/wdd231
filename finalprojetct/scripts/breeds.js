const apiKey = 'live_FcWfqIqWgS3UBJ9B3IJ7RF1Ps3wGoVwKZFYBU2MEIlMjwHXkLiOLSS64YL1a4byM';
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const url = "https://api.thedogapi.com/v1/breeds?limit=20";
const container = document.querySelector("#breeds-container");
const modal = document.querySelector("#breed-modal");
const search = document.querySelector("#search");
let breeds = [];
let currentView = "grid";

async function getBreeds() {

    try {
        const response = await fetch(url, {
            headers: {
                "x-api-key": apiKey
            }
        });

        breeds = await response.json();

        showBreedsGrid(breeds);

    } catch (error) {
        console.error(error);
    }

};

getBreeds();

function showBreedsGrid(breeds) {

    container.innerHTML = "";
    container.classList.add("grid");
    container.classList.remove("list");
 
    breeds.forEach(breed => {
        const card = document.createElement("article");
        const photo = document.createElement("img");
        const info = document.createElement("div");
        const name = document.createElement("h2");
        const temperament = document.createElement("p");
        const description = document.createElement("p");
        const button = document.createElement("button");        

        card.classList.add("grid-card");
        info.classList.add("grid-info");
        temperament.classList.add("grid-temperament");
        description.classList.add("grid-description");

        photo.src = breed.image ? breed.image.url : "images/no-image.png";
        photo.alt = breed.name;
        photo.loading = "lazy";

        name.textContent = breed.name;

        temperament.textContent = breed.temperament ?? "Temperament unavailable";

        description.innerHTML = `
            <strong>Weight:</strong> ${breed.weight.metric} kg <br>
            <strong>Life Span:</strong> ${breed.life_span}
        `;

        button.textContent = "View Details";

        button.addEventListener("click", () => {
            openModal(breed);
        });

        info.appendChild(name);
        info.appendChild(temperament);
        info.appendChild(description);
        info.appendChild(button);

        card.appendChild(photo);
        card.appendChild(info);

        container.appendChild(card);
    });
};

function showBreedsList(breeds) {

    container.innerHTML = "";
    container.classList.add("list");
    container.classList.remove("grid");

    breeds.forEach(breed => {

        const row = document.createElement("article");
        const photo = document.createElement("img");
        const info = document.createElement("div");
        const name = document.createElement("h2");
        const temperament = document.createElement("p");
        const description = document.createElement("p");
        const button = document.createElement("button");

        row.classList.add("list-row");
        photo.classList.add("list-photo");
        info.classList.add("list-info");
        name.classList.add("list-name");
        temperament.classList.add("list-temperament");
        description.classList.add("list-description");
        button.classList.add("list-button");
        
        photo.src = breed.image ? breed.image.url : "images/no-image.png";
        photo.alt = breed.name;
        photo.loading = "lazy";

        name.textContent = breed.name;

        temperament.textContent = breed.temperament ?? "Temperament unavailable";

        description.innerHTML = `
            <strong>Weight:</strong> ${breed.weight.metric} kg <br>
            <strong>Life Span:</strong> ${breed.life_span}
        `;

        button.textContent = "View Details";

        button.addEventListener("click", () => {
            openModal(breed);
        });

        info.appendChild(name);
        info.appendChild(temperament);
        info.appendChild(description);
        info.appendChild(button);

        row.appendChild(photo);
        row.appendChild(info);

        container.appendChild(row);
    });
};

container.classList.add("grid");

gridbutton.addEventListener("click", () => {
    currentView = "grid";
    showBreedsGrid(breeds);
});

listbutton.addEventListener("click", () => {
    currentView = "list";
    showBreedsList(breeds);
});


function openModal(breed) {

    modal.innerHTML = "";

    const content = document.createElement("div");
    content.classList.add("modal-content");

    const info = document.createElement("div");
    info.classList.add("modal-info");

    const modalButton = document.createElement("button");
    const modalPhoto = document.createElement("img");
    const modalName = document.createElement("h2");
    const modalTemperament = document.createElement("p");
    const modalWeight = document.createElement("p");
    const modalHeight = document.createElement("p");
    const modalLife = document.createElement("p");
    const modalOrigin = document.createElement("p");
    const modalGroup = document.createElement("p");

    modalButton.textContent = "✕";
    modalButton.classList.add("close-modal");
    
    modalPhoto.src = breed.image ? breed.image.url : "images/no-image.png";
    modalPhoto.alt = breed.name;

    modalName.textContent = breed.name;
    modalTemperament.innerHTML = `<strong>Temperament:</strong> ${breed.temperament ?? "Unknown"}`;
    modalWeight.innerHTML = `<strong>Weight:</strong> ${breed.weight.metric} kg`;
    modalHeight.innerHTML = `<strong>Height:</strong> ${breed.height.metric} cm`;
    modalLife.innerHTML = `<strong>Life Span:</strong> ${breed.life_span}`;
    modalOrigin.innerHTML = `<strong>Origin:</strong> ${breed.origin ?? "Unknown"}`;
    modalGroup.innerHTML = `<strong>Breed Group:</strong> ${breed.breed_group ?? "Unknown"}`;

    info.appendChild(modalName);
    info.appendChild(modalTemperament);
    info.appendChild(modalWeight);
    info.appendChild(modalHeight);
    info.appendChild(modalLife);
    info.appendChild(modalOrigin);
    info.appendChild(modalGroup);


    content.appendChild(modalPhoto);
    content.appendChild(info);

    modal.appendChild(modalButton);
    modal.appendChild(content);

    modal.showModal();

    modalButton.addEventListener("click", () => {
        modal.close();
    });
};


const searchBreeds = async (query) => {
    
     try{
        const response = await fetch(
            `https://api.thedogapi.com/v1/breeds/search?q=${query}`,
            {
                headers: {
                    "x-api-key": apiKey
                }
            }
        );

        const results = await response.json();
        if (currentView === "grid") {
            showBreedsGrid(results);
        } else {
            showBreedsList(results);
        }
    }catch(error){

        console.error(error);

    }

};

search.addEventListener("input", (e) => {

    const value = e.target.value.toLowerCase();

    if (value === "") {
        if (currentView === "grid") {
            showBreedsGrid(breeds);
        } else {
            showBreedsList(breeds);
        }
        return;
    }

    searchBreeds(value);

});



