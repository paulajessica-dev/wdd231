import { places } from "../data/places.mjs";

console.log(places);

const showHere = document.querySelector('#allplaces');

function displayItems(places) {
    places.forEach(x => {        
        const thecard = document.createElement('div')
        
        const thephoto = document.createElement('img')
        thephoto.src = `images/${x.photo}`;
        thephoto.alt = x.name
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

        showHere.appendChild(thecard)
    })
};

displayItems(places);
