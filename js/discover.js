document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("discover-gallery");
  const message = document.getElementById("visit-message");

  // Cargar datos desde el archivo JSON
  fetch("data/area.json")
    .then((res) => res.json())
    .then((data) => {
      data.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
          <h2>${item.name}</h2>
          <figure><img src="${item.image}" alt="${item.name}" width="300" height="200" loading="lazy"></figure>
          <address>${item.address}</address>
          <p>${item.description}</p>
          <button>Learn More</button>
        `;
        gallery.appendChild(card);
      });
    })
    .catch(error => console.error("Error al cargar los datos:", error));

  // Gestión de la última visita
  const today = Date.now();
  const lastVisit = localStorage.getItem("lastVisit");

  if (!lastVisit) {
    message.textContent = "¡Bienvenido! Déjanos saber si tienes alguna pregunta.";
  } else {
    const daysPassed = Math.floor((today - lastVisit) / (1000 * 60 * 60 * 24));
    if (daysPassed < 1) {
      message.textContent = "¡Has vuelto tan pronto! ¡Genial!";
    } else {
      message.textContent = `Tu última visita fue hace ${daysPassed} día${daysPassed === 1 ? "" : "s"}.`;
    }
  }

  localStorage.setItem("lastVisit", today);
});
