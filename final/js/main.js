// Selección de elementos del DOM
const gamesContainer = document.getElementById('games-container');
const modal = document.getElementById('game-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalTitle = document.getElementById('modal-title');
const modalImage = document.getElementById('modal-image');
const modalDescription = document.getElementById('modal-description');
const modalGenre = document.getElementById('modal-genre');
const modalYear = document.getElementById('modal-year');

// Cargar juegos desde JSON local
async function loadGames() {
  try {
    const response = await fetch('data/games.json');
    if (!response.ok) throw new Error('No se pudo cargar el archivo JSON.');
    const games = await response.json();
    displayGames(games);
  } catch (error) {
    console.error('Error al cargar los juegos:', error);
  }
}

// Mostrar juegos en pantalla
function displayGames(games) {
  gamesContainer.innerHTML = '';

  games.forEach(game => {
    const gameCard = document.createElement('div');
    gameCard.classList.add('game-card');

    gameCard.innerHTML = `
      <img src="${game.image}" alt="${game.title}">
      <h3>${game.title}</h3>
      <button class="more-info-btn" data-id="${game.id}">More Info</button>
      <button class="favorite-btn ${isFavorite(game.id) ? 'active' : ''}" data-id="${game.id}">
        ❤️
      </button>
    `;

    gamesContainer.appendChild(gameCard);
  });

  // Agregar eventos a los botones
  document.querySelectorAll('.more-info-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const gameId = parseInt(e.target.dataset.id);
      const selectedGame = games.find(g => g.id === gameId);
      openModal(selectedGame);
    });
  });

  document.querySelectorAll('.favorite-btn').forEach(button => {
    button.addEventListener('click', (e) => {
      const gameId = parseInt(e.target.dataset.id);
      toggleFavorite(gameId);
      e.target.classList.toggle('active');
    });
  });
}

// Modal
function openModal(game) {
  modalTitle.textContent = game.title;
  modalImage.src = game.image;
  modalImage.alt = game.title;
  modalDescription.textContent = game.description;
  modalGenre.textContent = `Genre: ${game.genre}`;
  modalYear.textContent = `Release Year: ${game.releaseYear}`;
  modal.classList.remove('hidden');
}

closeModalBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
});

// Favoritos con localStorage
function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites')) || [];
}

function isFavorite(id) {
  return getFavorites().includes(id);
}

function toggleFavorite(id) {
  let favorites = getFavorites();
  if (favorites.includes(id)) {
    favorites = favorites.filter(favId => favId !== id);
  } else {
    favorites.push(id);
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Ejecutar al cargar
document.addEventListener('DOMContentLoaded', loadGames);

const menuToggle = document.getElementById('menu-toggle');
const navList = document.getElementById('nav-list');

menuToggle.addEventListener('click', () => {
  navList.classList.toggle('hidden');
});
