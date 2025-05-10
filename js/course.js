// course.js
const courses = [
  { code: "WDD 130", name: "Web Fundamentals", credits: 3, completed: true, type: "WDD" },
  { code: "WDD 131", name: "Responsive Web Design", credits: 3, completed: true, type: "WDD" },
  { code: "WDD 231", name: "Front-end Web Development I", credits: 3, completed: false, type: "WDD" },
  { code: "CSE 121b", name: "JavaScript Language", credits: 3, completed: false, type: "CSE" },
  { code: "CSE 110", name: "Programming Building Blocks", credits: 2, completed: true, type: "CSE" }
];

const courseContainer = document.getElementById("courses");
const creditSpan = document.getElementById("credit-total");

function renderCourses(filterType = "ALL") {
  courseContainer.innerHTML = "";

  const filtered = courses.filter(c => {
    if (filterType === "ALL") return true;
    return c.type === filterType;
  });

  let totalCredits = 0;

  filtered.forEach(course => {
    const card = document.createElement("div");
    card.classList.add("course-card");
    card.style.backgroundColor = course.completed ? "#c8e6c9" : "#ffe0b2";
    card.innerHTML = `
      <h3>${course.code}</h3>
      <p>${course.name}</p>
      <p><strong>Credits:</strong> ${course.credits}</p>
      <p><strong>Status:</strong> ${course.completed ? "✅ Completed" : "🕓 In Progress"}</p>
    `;
    courseContainer.appendChild(card);
    totalCredits += course.credits;
  });

  creditSpan.textContent = totalCredits;
}

// Botones de filtro
document.getElementById("allBtn").addEventListener("click", () => renderCourses("ALL"));
document.getElementById("wddBtn").addEventListener("click", () => renderCourses("WDD"));
document.getElementById("cseBtn").addEventListener("click", () => renderCourses("CSE"));

// Mostrar todos por defecto
renderCourses("ALL");
