document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("taskInput");
  const addTaskButton = document.getElementById("addTask");
  const taskList = document.getElementById("taskList");

  // Load tasks from local storage
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Function to update the task list
  function updateTaskList() {
    taskList.innerHTML = "";
    tasks.forEach(function (task, index) {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
              <span>${task}</span>
              <button class="edit" data-index="${index}">Edit</button>
              <button class="delete" data-index="${index}">Delete</button>
          `;
      taskList.appendChild(listItem);
    });

    // Add event listeners to edit and delete buttons
    const editButtons = document.querySelectorAll(".edit");
    editButtons.forEach(function (button) {
      button.addEventListener("click", function (event) {
        const index = event.target.getAttribute("data-index");
        const editedTask = prompt("Edit the task:", tasks[index]);
        if (editedTask !== null) {
          tasks[index] = editedTask;
          updateTaskList();
          saveTasksToLocalStorage();
        }
      });
    });

    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach(function (button) {
      button.addEventListener("click", function (event) {
        const index = event.target.getAttribute("data-index");
        tasks.splice(index, 1);
        updateTaskList();
        saveTasksToLocalStorage();
      });
    });
  }

  // Function to save tasks to local storage
  function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Initial update of task list
  updateTaskList();

  // Add a new task
  addTaskButton.addEventListener("click", function () {
    const taskText = taskInput.value.trim();
    if (taskText) {
      tasks.push(taskText);
      updateTaskList();
      saveTasksToLocalStorage();
      taskInput.value = "";
    }
  });
});
