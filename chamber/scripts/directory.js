const membersContainer = document.getElementById("members");
const gridBtn = document.getElementById("gridView");
const listBtn = document.getElementById("listView");

async function fetchMembers() {
  const response = await fetch("data/members.json");
  const members = await response.json();
  displayMembers(members);
}

function displayMembers(members) {
  membersContainer.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("section");
    card.classList.add("member-card");
    card.innerHTML = `
      <img src="images/${member.image}" alt="Logo of ${member.name}">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <p class="membership level${member.membership}">${getMembershipLevel(member.membership)}</p>
      <p>${member.info}</p>
    `;
    membersContainer.appendChild(card);
  });
}

function getMembershipLevel(level) {
  switch (level) {
    case 1: return "Member";
    case 2: return "Silver Member";
    case 3: return "Gold Member";
    default: return "Member";
  }
}

// View toggle
gridBtn.addEventListener("click", () => {
  membersContainer.classList.add("grid-view");
  membersContainer.classList.remove("list-view");
});

listBtn.addEventListener("click", () => {
  membersContainer.classList.add("list-view");
  membersContainer.classList.remove("grid-view");
});

// Footer dynamic content
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Fetch members on page load
fetchMembers();

const upcomingEvents = [
  { name: "Business Networking Night", date: "2025-05-30", time: "7 PM" },
  { name: "Eco Workshop", date: "2025-06-03", time: "2 PM" },
  { name: "Small Business Fair", date: "2025-06-10", time: "10 AM" },
];

function displayEvents(events) {
  const eventsList = document.getElementById("events-list");
  eventsList.innerHTML = ""; // limpia lista

  events.forEach(event => {
    const li = document.createElement("li");
    li.classList.add("event-item");
    li.innerHTML = `
      <div class="event-name">${event.name}</div>
      <div class="event-date">${new Date(event.date).toLocaleDateString()} at ${event.time}</div>
    `;
    eventsList.appendChild(li);
  });
}

displayEvents(upcomingEvents);
