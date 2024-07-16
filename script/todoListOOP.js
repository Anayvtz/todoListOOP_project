
// imports
import { addTaskToScreen } from "./domBuilder.js";

// classes
class Todo {
  id;
  description;
  creationDate;
  isComplete;
  constructor(id, description) {
    this.id = id;
    this.description = description;
    this.creationDate = new Date();
    this.isComplete = false;
  }
}

class TodoManager {
  tasks;
  constructor() {
    this.tasks = [];
  }

  addTask(description) {
    let d = new Date();
    let newTask = new Todo(d.getTime(), description);
    this.tasks.push(newTask);
    refreshScreen(this.tasks);
  }

  addExistingTask(task) {
    this.tasks.push(task);
    refreshScreen(this.tasks);
  }
  removeTask(index) {
    this.tasks.splice(index, 1);
    refreshScreen(this.tasks);
  }

  updateTask(index, newDescription) {
    this.tasks[index].description = newDescription;
    refreshScreen(this.tasks);
  }

  toggleIsComplete(index) {
    this.tasks[index].isComplete = !this.tasks[index].isComplete;
    refreshScreen(this.tasks);
  }
}

// globals
export let tableBody = document.getElementById("todoListBody");
let addBtn = document.getElementById("addTaskBtn");
export let taskManager = new TodoManager();

// main
addBtn.addEventListener("click", () => {
  let txtInput = document.getElementById("newTaskInput");
  if (txtInput.value) {
    taskManager.addTask(txtInput.value);
    txtInput.value = "";
  }
});
loadFromLocalStorage();

function loadFromLocalStorage() {
  let storageArr = JSON.parse(localStorage.getItem("todo_list")) || [];
  let todoArr = storageArr.map(item => JSON.parse(item));
  todoArr.forEach((task) => {
    console.log(task);
    taskManager.addExistingTask(task);
  });
}

function refreshScreen(tasks) {
  tableBody.innerHTML = "";
  localStorage.removeItem("todo_list");
  let storageArr = [];
  tasks.forEach((task, index) => {
    storageArr.push(JSON.stringify(task));
    addTaskToScreen(task, index);
  });
  localStorage.setItem("todo_list", JSON.stringify(storageArr));
}

export function editTask(index) {
  let editInput = document.getElementById("editInput" + index);
  if (editInput.value) {
    taskManager.updateTask(index, editInput.value);
  }
}


