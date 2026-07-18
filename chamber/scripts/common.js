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
	document.querySelector("main").classList.toggle("menu-open");
});