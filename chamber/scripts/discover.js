document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("cards-container");

  fetch("data/interest.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("No se pudo cargar el JSON");
      }
      return response.json();
    })
    .then(data => {
      data.forEach(place => {
        const card = document.createElement("section");
        card.classList.add("place-card");

        card.innerHTML = `
          <h2>${place.name}</h2>
          <figure>
            <img src="${place.image}" alt="${place.title}">
          </figure>
          <address>${place.address}</address>
          <p>${place.description}</p>
          <button>Learn More</button>
        `;

        container.appendChild(card);
      });
    })
    .catch(error => {
      container.innerHTML = `<p>Error al cargar lugares: ${error.message}</p>`;
    });
});

const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');

  // Update accessibility state
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', !expanded);
});
