const timestamp = document.querySelector("#timestamp");
timestamp.value = new Date().toISOString();


const membershipDetails = document.querySelector("#membershipDetail");

function displayDetails(membership) {

    membershipDetails.innerHTML = "";

    const closeButton = document.createElement("button");
    closeButton.textContent = "✖";
    closeButton.classList.add("close-modal");

    const title = document.createElement("h2");
    title.textContent = membership.name;

    const description = document.createElement("p");
    description.textContent = membership.shortDescription;

    const fee = document.createElement("p");
    fee.innerHTML = `<strong>Annual Fee:</strong> ${membership.annualFee}`;

    const benefitsTitle = document.createElement("h3");
    benefitsTitle.textContent = "Benefits";

    const benefitsList = document.createElement("ul");

    membership.benefits.forEach(benefit => {
        const item = document.createElement("li");
        item.textContent = benefit;
        benefitsList.appendChild(item);
    });

    membershipDetails.appendChild(closeButton);
    membershipDetails.appendChild(title);
    membershipDetails.appendChild(description);
    membershipDetails.appendChild(fee);
    membershipDetails.appendChild(benefitsTitle);
    membershipDetails.appendChild(benefitsList);

    membershipDetails.showModal();

    closeButton.addEventListener("click", () => {
        membershipDetails.close();
    });
};

let memberships = [];

async function getMemberships() {

    const response = await fetch("data/memberships.json");
    memberships = await response.json();    

};

getMemberships();


document.querySelector("#npBtn").addEventListener("click", (event) => {
    event.preventDefault();

    const membership = memberships.find(m => m.id === "np");
    displayDetails(membership);
});


document.querySelector("#bronzeBtn").addEventListener("click", (event) => {
    event.preventDefault();

    const membership = memberships.find(m => m.id === "bronze");
    displayDetails(membership);
});

document.querySelector("#silverBtn").addEventListener("click", (event) => {
    event.preventDefault();

    const membership = memberships.find(m => m.id === "silver");
    displayDetails(membership);
});

document.querySelector("#goldBtn").addEventListener("click", (event) => {
    event.preventDefault();

    const membership = memberships.find(m => m.id === "gold");
    displayDetails(membership);
});