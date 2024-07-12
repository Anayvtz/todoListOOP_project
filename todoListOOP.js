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
    addTasksToScreen(this.tasks);
  }

  removeTask(index) {
    this.tasks.splice(index, 1);
    addTasksToScreen(this.tasks);
  }

  updateTask(index, newDescription) {
    this.tasks[index].description = newDescription;
    addTasksToScreen(this.tasks);
  }

  toggleIsComplete(index) {
    this.tasks[index].isComplete = !this.tasks[index].isComplete;
    addTasksToScreen(this.tasks);
  }
}

let tableBody = document.getElementById("todoListBody");
let addBtn = document.getElementById("addTaskBtn");
let taskManager = new TodoManager();

function addTaskToScreen(task, index) {
  //create the element
  let row = `
        <tr class="todo-row" id="row${index}">
          <td class="todo-cell">${task.isComplete}</td>
          <td class="todo-cell">${task.id}</td>
          <td class="todo-cell">${task.description}</td>
          <td class="todo-cell">${task.creationDate}</td>
          <td class="todo-cell">
          <button onclick="makeRowEditable(${task.isComplete},${task.id},'${task.description}','${task.creationDate}',${index})">Edit</button>
          </td>
          <td class="todo-cell">
           <button onclick="taskManager.removeTask(${index})">Delete</button>
          </td>
        </tr>
`;
  //append child
  tableBody.innerHTML += row;
}

function addTasksToScreen(tasks) {
  tableBody.innerHTML = "";
  tasks.forEach((task, index) => {
    addTaskToScreen(task, index);
  });
}

function makeRowEditable(isComplete, id, description, creationDate, index) {
  let rowOnHtml = document.getElementById("row" + index);
  let newRow = `
          <td class="todo-cell">${isComplete}</td>
          <td class="todo-cell">${id}</td>
          <td class="todo-cell">
          <input id="editInput${index}" value="${description}"/>
          </td>
          <td class="todo-cell">${creationDate}</td>
          <td class="todo-cell">
          <button onclick="editTask(${index})">Save</button>
          </td>
          <td class="todo-cell">
           <button onclick="taskManager.removeTask(${index})">Delete</button>
          </td>
`;
  rowOnHtml.innerHTML = newRow;
}

function editTask(index) {
  let editInput = document.getElementById("editInput" + index);
  if (editInput.value) {
    taskManager.updateTask(index, editInput.value);
  }
}

addBtn.addEventListener("click", () => {
  let txtInput = document.getElementById("newTaskInput");
  if (txtInput.value) {
    taskManager.addTask(txtInput.value);
    txtInput.value = "";
  }
});
