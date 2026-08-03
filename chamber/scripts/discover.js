import { places } from "../data/places.mjs";

console.log(places);

const showHere = document.querySelector('#allplaces');

function displayItems(places) {
    places.forEach(x => {        
        const thecard = document.createElement('div')
        
        const thephoto = document.createElement('img')
        thephoto.src = `images/${x.photo}`;
        thephoto.alt = x.name;
        thephoto.loading = "lazy";
        thecard.appendChild(thephoto)
        
        const thetitle = document.createElement('h2')
        thetitle.innerText = x.name
        thecard.appendChild(thetitle)
        
        const theaddress = document.createElement('address')
        theaddress.innerText = x.address
        thecard.appendChild(theaddress)
        
        const thedesc = document.createElement('p')
        thedesc.innerText = x.description
        thecard.appendChild(thedesc)
        
        const button = document.createElement('button');
        button.textContent = 'Learn More';

        button.addEventListener('click', () => {
            window.open(x.url, '_blank');
        });

        thecard.appendChild(button);

        showHere.appendChild(thecard)
    })
};

displayItems(places);

// milliseconds to days constant = 1000 ms/s * 60 s/m * 60 m/h * 24 h/day
const msToDays = 1000 * 60 * 60 * 24;


// initialize display elements
const message = document.querySelector("#visit-message");
const today = Date.now();
const lastVisit = Number(localStorage.getItem("lastVisit"));

// processing

if (!lastVisit) {
    message.textContent = "👋 Welcome! Let us know if you have any questions.";

} else {
    const daysBetween = (today - lastVisit) / msToDays;
    const days = Math.floor(daysBetween);

    if (days < 1) {
        message.textContent = "👋 Back so soon! Awesome!";

    } else if (days === 1) {
        message.textContent = "👋 You last visited 1 day ago.";

    } else {
        message.textContent = `👋 You last visited ${days} days ago.`;

    }
}

localStorage.setItem("lastVisit", today);




