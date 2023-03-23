let taskInput = document.getElementById("taskInput");
let taskList = document.getElementById("taskList");
let completedList = document.getElementById("completedList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

tasks.forEach(task => createTaskElement(task, taskList));
completedTasks.forEach(task => createTaskElement(task, completedList));

function addTask() {
    if (taskInput.value.trim()) {
        let task = taskInput.value;
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        createTaskElement(task, taskList);
        taskInput.value = "";
    }
}

function createTaskElement(task, list) {
    let taskElement = document.createElement("li");
    taskElement.className = "task";
    taskElement.innerHTML = `
        <button onclick="completeTask(this)">✓</button>
        ${task}
    `;
    list.appendChild(taskElement);
}

function completeTask(button) {
    let task = button.parentElement;
    let taskText = task.textContent;

    tasks = tasks.filter(t => t !== taskText);
    completedTasks.push(taskText);

    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));

    taskList.removeChild(task);
    task.innerHTML = `
        <button onclick="removeTask(this)">✗</button>
        <span style="text-decoration: line-through;">${taskText}</span>
    `;
    completedList.appendChild(task);

    setTimeout(() => {
        removeTask(task.querySelector("button"));
    }, 2 * 24 * 60 * 60 * 1000);
}

function removeTask(button) {
    let task = button.parentElement;
    let taskText = task.textContent.slice(1);

    completedTasks = completedTasks.filter(t => t !== taskText);

    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    completedList.removeChild(task);
}
