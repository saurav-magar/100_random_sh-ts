const addTaskBtn = document.getElementById("addTaskBtn");
const taskTitle = document.getElementById("taskTitle");
const taskPriority = document.getElementById("taskPriority");
const taskDate = document.getElementById("taskDate");
const searchInput = document.getElementById("searchInput");
const themeToggle = document.getElementById("themeToggle");

let tasks = JSON.parse(localStorage.getItem("devboardTasks")) || [];

function saveTasks() {
    localStorage.setItem("devboardTasks", JSON.stringify(tasks));
}

function createTaskElement(task) {
    const div = document.createElement("div");
    div.className = "task";
    div.dataset.id = task.id;

    div.innerHTML = `
        <strong>${task.title}</strong>
        <span class="priority ${task.priority}">${task.priority}</span>
        <small>Due: ${task.date || "No date"}</small>
        <button class="delete-btn">Delete</button>
    `;

    div.querySelector(".delete-btn").addEventListener("click", () => {
        tasks = tasks.filter(t => t.id !== task.id);
        saveTasks();
        renderTasks();
    });

    return div;
}

function renderTasks() {
    const container = document.getElementById("todo");
    container.innerHTML = "";

    tasks.forEach(task => {
        container.appendChild(createTaskElement(task));
    });
}

addTaskBtn.addEventListener("click", () => {
    if (!taskTitle.value.trim()) return;

    const newTask = {
        id: Date.now(),
        title: taskTitle.value,
        priority: taskPriority.value,
        date: taskDate.value
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();

    taskTitle.value = "";
    taskDate.value = "";
});

searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    document.querySelectorAll(".task").forEach(task => {
        task.style.display =
            task.textContent.toLowerCase().includes(value)
                ? "block"
                : "none";
    });
});

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

});

renderTasks();

