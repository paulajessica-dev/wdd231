const apiKey = 'live_FcWfqIqWgS3UBJ9B3IJ7RF1Ps3wGoVwKZFYBU2MEIlMjwHXkLiOLSS64YL1a4byM';
const url = "https://dogapi.dog/api/v2/facts?limit=3";
const factsContainer = document.querySelector("#facts-container");
const newFactsButton = document.querySelector("#new-facts");

async function loadFacts() {

    try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            showFacts(data.data);

    } catch (error) {
         console.error("Error loading facts:", error);
    }

};


function showFacts(facts) {

    factsContainer.innerHTML = "";

    facts.forEach(fact => {

        const card = document.createElement("article");
        const title = document.createElement("h2");
        const text = document.createElement("p");

        card.classList.add("fact-card");

        title.textContent = "🐶 Did you know?";
        text.textContent = fact.attributes.body;

        card.appendChild(title);
        card.appendChild(text);

        factsContainer.appendChild(card);

    });

}

newFactsButton.addEventListener("click", loadFacts);

loadFacts();