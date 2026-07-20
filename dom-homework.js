// ── Utility ──────────────────────────────────────────────
function randomColor() {
  const r = Math.floor(Math.random() * 200);
  const g = Math.floor(Math.random() * 200);
  const b = Math.floor(Math.random() * 200);
  return `rgb(${r}, ${g}, ${b})`;
}

// ── Build initial content inside #myDiv ──────────────────
const myDiv = document.getElementById("myDiv");

// 1. Heading
const heading = document.createElement("h1");
heading.textContent = "Welcome to DOM homework";
heading.classList.add("highlight");
myDiv.appendChild(heading);

// 2. Paragraph
const paragraph = document.createElement("p");
paragraph.textContent = "This is your first DOM homework assignment";
myDiv.appendChild(paragraph);

// 3. Unordered list with three items
const ul = document.createElement("ul");

const initialItems = ["HTML is the backbone of the web", "CSS makes it look great", "JavaScript brings it to life"];
initialItems.forEach((text) => {
  const li = document.createElement("li");
  li.textContent = text;
  ul.appendChild(li);
});

myDiv.appendChild(ul);

// ── Event listener: click myDiv → random background ──────
myDiv.addEventListener("click", function () {
  myDiv.style.backgroundColor = randomColor();
});

// ── Event listener: button → add new list item ───────────
let newItemCount = 0;

const addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function () {
  newItemCount++;

  const li = document.createElement("li");
  li.textContent = `New List Item ${newItemCount}`;
  li.style.color = randomColor();

  ul.appendChild(li);
});
