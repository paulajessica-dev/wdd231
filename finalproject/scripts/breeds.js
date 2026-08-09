import { getBreeds, searchBreeds, voteForBreed, getVotes, getVoteBreed } from "./api.mjs";

const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const container = document.querySelector("#breeds-container");
const modal = document.querySelector("#breed-modal");
const search = document.querySelector("#search");
let breeds = [];
let currentView = "grid";

async function loadBreeds() {

    try {

        breeds = await getBreeds();

         if (currentView === "grid") {
            showBreedsGrid(breeds);
        } else {
            showBreedsList(breeds);
        }

    } catch (error) {

        console.error("Error loading breeds:", error);

    }
}

loadBreeds();

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

        if (isBreedVisited(breed.id)) {
            card.classList.add("visited");
        }

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
            card.classList.add("visited");
            saveVisitedBreed(breed.id);
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

        if (isBreedVisited(breed.id)) {
            row.classList.add("visited");
        }
        
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
            row.classList.add("visited");
            saveVisitedBreed(breed.id);
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

    const voteForm = document.createElement("form");
    const voteLabel = document.createElement("label");    
    const voteButton = document.createElement("button");

    voteForm.classList.add("vote-form");
    voteLabel.textContent = "❤️ Is this your favorite breed?";

    voteButton.type = "submit";
    voteButton.textContent = "Vote";

    info.appendChild(modalName);
    info.appendChild(modalTemperament);
    info.appendChild(modalWeight);
    info.appendChild(modalHeight);
    info.appendChild(modalLife);
    info.appendChild(modalOrigin);
    info.appendChild(modalGroup);
    

    voteForm.appendChild(voteLabel);
    voteForm.appendChild(voteButton);
    info.appendChild(voteForm);

    content.appendChild(modalPhoto);
    content.appendChild(info);

    modal.appendChild(modalButton);
    modal.appendChild(content);

    modal.showModal();

    console.log(breeds[0]);

    modalButton.addEventListener("click", () => {
        
        modal.close();
    });

    voteForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        try {

            await voteForBreed(breed.image.id);
            voteButton.textContent = "✓ Voted!";
            voteButton.disabled = true;
            
            await loadFavoriteBreeds();

        } catch (error) {
            console.error("Error submitting vote:", error);
        }
    });
};


search.addEventListener("input", async (e) => {
    const value = e.target.value.toLowerCase();

    if (value === "") {
        if (currentView === "grid") {
            showBreedsGrid(breeds);
        } else {
            showBreedsList(breeds);
        }
        return;
    }

    try {

        const results = await searchBreeds(value);
        if (currentView === "grid") {
            showBreedsGrid(results);
        } else {
            showBreedsList(results);
        }

    } catch (error) {

        console.error("Error searching breeds:", error);

    }

});

function saveVisitedBreed(breedId) {

    let visitedBreeds = JSON.parse(localStorage.getItem("visitedBreeds")) || [];
    if (!visitedBreeds.includes(breedId)) {
        visitedBreeds.push(breedId);
        localStorage.setItem(
            "visitedBreeds",
            JSON.stringify(visitedBreeds)
        );
    }
};

function isBreedVisited(breedId) {

    const visitedBreeds = JSON.parse(localStorage.getItem("visitedBreeds")) || [];
    return visitedBreeds.includes(breedId);
};


async function loadFavoriteBreeds() {

    try {

        console.log("Atualizando favoritos...");

        const votes = await getVotes();

        console.log("TODOS OS VOTOS:", votes);
        console.log("QUANTIDADE:", votes.length);       

        const voteCount = {};
        
        for (const vote of votes) {

            const image = await getVoteBreed(vote.image_id);

            if (!image || !image.breeds?.length) {
                continue;
            }

            const breed = image.breeds[0];

            if (!voteCount[breed.id]) {
                voteCount[breed.id] = {
                    breed: breed,
                    image: image.url,
                    votes: 0
                };
            }
            voteCount[breed.id].votes++;
            
        };
        

        const favorites = Object.values(voteCount).sort((a, b) => b.votes - a.votes);
        showFavoriteBreeds(favorites);

    } catch (error) {
        console.error("Error loading favorite breeds:", error);
    }
};

function showFavoriteBreeds(favorites) {

    const container = document.querySelector("#favorite-list");

    container.innerHTML = "";

    if (favorites.length === 0) {
        container.innerHTML = "<p>No votes yet. Be the first to vote!</p>";
        return;
    }

    favorites.forEach((item, index) => {

        const card = document.createElement("article");       
        const position = document.createElement("span");
        const photo = document.createElement("img");
        const info = document.createElement("div");
        const name = document.createElement("h3");
        const votes = document.createElement("p");

        card.classList.add("favorite-card");
        position.classList.add("favorite-position");
        photo.classList.add("favorite-photo");
        info.classList.add("favorite-info");

        position.textContent = `#${index + 1}`;

        photo.src = item.image ?? "images/no-image.png";
        photo.alt = item.breed.name;
        photo.loading = "lazy";

        name.textContent = item.breed.name;

        votes.textContent = `❤️ ${item.votes} vote${item.votes !== 1 ? "s" : ""}`;

        info.appendChild(name);
        info.appendChild(votes);

        card.appendChild(position);
        card.appendChild(photo);
        card.appendChild(info);

        container.appendChild(card);

    });
};

loadFavoriteBreeds();

