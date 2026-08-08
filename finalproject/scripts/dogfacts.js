import { getFacts } from "./api.mjs";

const factsContainer = document.querySelector("#facts-container");
const newFactsButton = document.querySelector("#new-facts");


async function loadFacts() {

    try {
        const facts = await getFacts();

        showFacts(facts);

    } catch (error) {

        console.error("Error loading facts:", error);
    }
}

loadFacts();

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