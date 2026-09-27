const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");
const taskCount = document.getElementById("taskCount");
const clearCompletedButton = document.getElementById("clearCompleted");


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();


function addTask() {

    const text = taskInput.value.trim();


    if (text === "") {
        taskInput.focus();
        return;
    }

    const task = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(task);

    saveTasks();

    renderTasks();

    taskInput.value = "";

    taskInput.focus();
}


taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        addTask();
    }

});


addButton.addEventListener("click", addTask);


function toggleTask(id) {

    tasks = tasks.map(function (task) {

        if (task.id === id) {
            return {
                ...task,
                completed: !task.completed
            };
        }

        return task;

    });

    saveTasks();

    renderTasks();
}


function deleteTask(id) {

    tasks = tasks.filter(function (task) {
        return task.id !== id;
    });

    saveTasks();

    renderTasks();
}


function clearCompleted() {

    tasks = tasks.filter(function (task) {
        return !task.completed;
    });

    saveTasks();

    renderTasks();
}

clearCompletedButton.addEventListener(
    "click",
    clearCompleted
);


function renderTasks() {

    taskList.innerHTML = "";

    if (tasks.length === 0) {

        emptyState.style.display = "flex";

    } else {

        emptyState.style.display = "none";

        tasks.forEach(function (task) {

            const li = document.createElement("li");

            const label = document.createElement("label");

            label.className = "task-label";

            const checkbox = document.createElement("input");

            checkbox.type = "checkbox";

            checkbox.className = "task-checkbox";

            checkbox.checked = task.completed;


            checkbox.addEventListener(
                "change",
                function () {
                    toggleTask(task.id);
                }
            );


            const text = document.createElement("span");

            text.textContent = task.text;


            if (task.completed) {
                text.classList.add("completed");
            }


            label.appendChild(checkbox);

            label.appendChild(text);


            const deleteButton = document.createElement("button");

            deleteButton.textContent = "Видалити";

            deleteButton.className = "delete-button";

            deleteButton.type = "button";


            deleteButton.addEventListener(
                "click",
                function () {
                    deleteTask(task.id);
                }
            );


            // Збираємо li
            li.appendChild(label);

            li.appendChild(deleteButton);


            taskList.appendChild(li);

        });
    }


    updateTaskCount();
}


function updateTaskCount() {

    const total = tasks.length;

    const completed = tasks.filter(function (task) {
        return task.completed;
    }).length;


    if (total === 0) {

        taskCount.textContent = "0 завдань";

        return;
    }


    taskCount.textContent =
        `Всього: ${total} · Виконано: ${completed}`;
}


function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}