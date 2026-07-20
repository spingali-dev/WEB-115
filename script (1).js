/* ==========================================================
   TaskFlow — Task Manager
   Vanilla JavaScript only. No frameworks or libraries.
   ========================================================== */

// ---- State -------------------------------------------------
// Tasks are stored as an array of plain objects:
// { id, name, priority, isImportant, isCompleted, date }
let tasks = [];
let nextId = 1;
let activeFilter = "all";

// ---- DOM references -----------------------------------------
const taskForm = document.getElementById("taskForm");
const nameInput = document.getElementById("taskName");
const nameError = document.getElementById("nameError");
const priorityInput = document.getElementById("taskPriority");
const importantInput = document.getElementById("taskImportant");
const completedInput = document.getElementById("taskCompleted");

const taskmanager = document.getElementById("taskmanager");
const statOpen = document.getElementById("statOpen");
const statDone = document.getElementById("statDone");
const filterButtons = document.querySelectorAll(".filter-btn");

// ---- Helpers -------------------------------------------------

// Formats a Date object into a short, readable string, e.g. "Jul 20, 2026"
function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Logs the full task list to the console any time the data changes,
// as required by the spec.
function logTasks() {
  console.log(JSON.stringify(tasks));
}

// ---- Rendering -------------------------------------------------

function render() {
  // Filter the tasks according to the active filter chip
  const visibleTasks = tasks.filter((task) => {
    if (activeFilter === "open") return !task.isCompleted;
    if (activeFilter === "important") return task.isImportant;
    if (activeFilter === "done") return task.isCompleted;
    return true;
  });

  if (visibleTasks.length === 0) {
    taskmanager.innerHTML = `
      <div class="empty-state">
        ${
          tasks.length === 0
            ? "No tickets yet — print your first one on the left."
            : "No tickets match this filter."
        }
      </div>`;
  } else {
    // Build the ticket markup dynamically with .innerHTML,
    // as required by the spec.
    taskmanager.innerHTML = visibleTasks
      .map((task) => {
        return `
        <article class="ticket" data-id="${task.id}">
          <div class="ticket-stub">
            <span class="stub-priority priority-${task.priority}">${task.priority}</span>
            <span class="stub-id">#${String(task.id).padStart(3, "0")}</span>
          </div>
          <div class="ticket-body">
            <div class="ticket-info">
              <p class="ticket-name" id="name-${task.id}">${escapeHtml(task.name)}</p>
              <div class="ticket-meta">
                <span>added ${formatDate(task.date)}</span>
                ${task.isImportant ? '<span class="ticket-important-tag">★ important</span>' : ""}
              </div>
            </div>
            <div class="ticket-actions">
              <button type="button" class="toggle-btn" data-action="toggle" data-id="${task.id}">
                ${task.isCompleted ? "Mark open" : "Mark done"}
              </button>
              <button type="button" class="delete-btn" data-action="delete" data-id="${task.id}">
                Delete
              </button>
            </div>
          </div>
        </article>`;
      })
      .join("");
  }

  // Apply conditional styling with the .style property, per spec:
  // important tasks are highlighted red, completed tasks get a strikethrough.
  tasks.forEach((task) => {
    const nameEl = document.getElementById(`name-${task.id}`);
    if (!nameEl) return; // not currently visible under this filter

    nameEl.style.color = task.isImportant ? "#e8407e" : "#3a1f2b";
    nameEl.style.fontWeight = task.isImportant ? "700" : "600";
    nameEl.style.textDecoration = task.isCompleted ? "line-through" : "none";
    nameEl.style.opacity = task.isCompleted ? "0.55" : "1";
  });

  updateStats();
}

// Minimal HTML-escaping so a task name can never break the markup
// or inject scripts into the page.
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function updateStats() {
  const openCount = tasks.filter((t) => !t.isCompleted).length;
  const doneCount = tasks.filter((t) => t.isCompleted).length;
  statOpen.textContent = openCount;
  statDone.textContent = doneCount;
}

// ---- Task operations -------------------------------------------------

function addTask(name, priority, isImportant, isCompleted) {
  const task = {
    id: nextId++,
    name: name,
    priority: priority,
    isImportant: isImportant,
    isCompleted: isCompleted,
    date: new Date(),
  };
  tasks.push(task);
  logTasks();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  logTasks();
  render();
}

function toggleCompleted(id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;
  task.isCompleted = !task.isCompleted;
  logTasks();
  render();
}

// ---- Validation -------------------------------------------------

function validateName(rawName) {
  const trimmed = rawName.trim();
  if (trimmed.length === 0) {
    return { valid: false, message: "Give the task a name before printing the ticket." };
  }
  return { valid: true, message: "" };
}

// ---- Event handling -------------------------------------------------

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const rawName = nameInput.value;
  const { valid, message } = validateName(rawName);

  if (!valid) {
    nameInput.classList.add("has-error");
    nameError.textContent = message;
    nameInput.focus();
    return;
  }

  nameInput.classList.remove("has-error");
  nameError.textContent = "";

  addTask(
    rawName.trim(),
    priorityInput.value,
    importantInput.checked,
    completedInput.checked
  );

  taskForm.reset();
  priorityInput.value = "Medium";
  nameInput.focus();
});

// Clear the error state as soon as the user starts typing again
nameInput.addEventListener("input", () => {
  if (nameInput.classList.contains("has-error")) {
    nameInput.classList.remove("has-error");
    nameError.textContent = "";
  }
});

// Event delegation for the dynamically-rendered ticket buttons
taskmanager.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;

  const id = Number(button.dataset.id);
  const action = button.dataset.action;

  if (action === "delete") {
    deleteTask(id);
  } else if (action === "toggle") {
    toggleCompleted(id);
  }
});

// Filter chips
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    render();
  });
});

// ---- Initial render -------------------------------------------------
render();
