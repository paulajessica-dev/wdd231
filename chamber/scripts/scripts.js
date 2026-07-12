const year = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

year.textContent = new Date().getFullYear();

lastModified.textContent =
    `Last Modification: ${document.lastModified}`;

const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});


const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("#members");
const url = "data/members.json";
const membersContainer = document.querySelector("#members");

async function getMembers() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Could not load members.");
        }

        const members = await response.json();
        console.log(members);

        showMembers(members);

    } catch (error) {
        console.error(error);
    }
}

function showMembers(members) {
    members.forEach(member => {

        const card = document.createElement("section");
        card.className = "member-card";

        const header = document.createElement("div");
        header.className = "member-header";

        const body = document.createElement("div");
        body.className = "member-body";

        const info = document.createElement("div");
        info.className = "member-info";

        const logoContainer = document.createElement("div");
        logoContainer.className = "logo-container";

        const image = document.createElement("img");
        image.src = `images/${member.image}`;
        image.alt = member.name;
        image.loading = "lazy";

        const name = document.createElement("h3");
        name.textContent = member.name;

        const tagline = document.createElement("p");
        tagline.className = "tagline";
        tagline.textContent = member.tagline;

        const address = document.createElement("p");
        address.innerHTML = `<strong>Address:</strong> ${member.address}`;

        const phone = document.createElement("p");
        phone.innerHTML = `<strong>Phone:</strong> ${member.phone}`;

        const email = document.createElement("p");
        email.innerHTML = `<strong>Email:</strong> ${member.email}`;

        const website = document.createElement("a");
        website.href = member.website;
        website.target = "_blank";
        website.textContent = member.website.replace("https://", "");

        header.append(name, tagline);
        logoContainer.appendChild(image);
        info.append(phone, email, website);
        body.append(logoContainer, info);
        card.append(header, body);
        membersContainer.appendChild(card);
    });
}

getMembers();

display.classList.add("grid");

gridbutton.addEventListener("click", () => {
	
	display.classList.add("grid");
	display.classList.remove("list");
});


listbutton.addEventListener("click", () => {
    display.classList.add("list");
    display.classList.remove("grid");
});

