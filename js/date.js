// date.js
const yearSpan = document.getElementById("year");
const lastMod = document.getElementById("lastModified");

yearSpan.textContent = new Date().getFullYear();
lastMod.textContent = `Last Modified: ${document.lastModified}`;
