const apiKey = 'live_FcWfqIqWgS3UBJ9B3IJ7RF1Ps3wGoVwKZFYBU2MEIlMjwHXkLiOLSS64YL1a4byM';
const popularContainer = document.querySelector("#popular-breeds");
const url = "https://api.thedogapi.com/v1/breeds?limit=20";


async function loadPopularBreeds() {
    try {

        const response = await fetch(url, {
            headers: {
                "x-api-key": apiKey
            }
        });

        const breeds = await response.json();

       const spotlightBreeds = [...breeds].sort(() => Math.random() - 0.5).slice(0, 3);

       displayPopularBreeds(spotlightBreeds);

        } catch (error) {
        console.error(error);
    }
};

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

loadPopularBreeds();
