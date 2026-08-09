import { getPopularBreeds, searchBreeds } from "./api.mjs";
const popularContainer = document.querySelector("#popular-breeds");
const params = new URLSearchParams(window.location.search);

const name = params.get("name");
const breed = params.get("breed");

let breeds = [];
let currentView = "grid";



const nameFromForm = params.get("name");
const breedFromForm = params.get("breed");

// console.log("Name:", nameFromForm);
// console.log("Breed:", breedFromForm);

async function loadPopular() {

    try {

        const breeds = await getPopularBreeds();

        displayPopularBreeds(breeds);

    } catch (error) {

        console.error("Error loading popular breeds:", error);

    }
}

loadPopular();

function displayPopularBreeds(breeds) {
    
    popularContainer.innerHTML = "";

    breeds.forEach(breed => {

        const card = document.createElement("article");
        const photo = document.createElement("img");
        const info = document.createElement("div");
        const name = document.createElement("h3");
        const temperament = document.createElement("p");
        const button = document.createElement("button");

        card.classList.add("popular-card");
        info.classList.add("popular-info");

        photo.src = breed.image ? breed.image.url : "images/no-image.png";
        photo.alt = breed.name;
        photo.loading = "lazy";

        name.textContent = breed.name;

        temperament.textContent = breed.temperament?.split(",").slice(0, 3).join(" • ") ?? "Temperament unavailable";

        button.textContent = "View Details";

        button.addEventListener("click", () => {
            window.location.href = "breeds.html";
        });

        info.appendChild(name);
        info.appendChild(temperament);
        info.appendChild(button);

        card.appendChild(photo);
        card.appendChild(info);

        popularContainer.appendChild(card);

    });

};

if (breedFromForm) {
    search.value = breedFromForm;
    try {
        const results = await searchBreeds(breedFromForm);

        if (currentView === "grid") {
            showBreedsGrid(results);
        } else {
            showBreedsList(results);
        }

    } catch (error) {
        console.error("Error searching breed from form:", error);

    }
};
