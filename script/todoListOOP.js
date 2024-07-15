
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
let tableBody = document.getElementById("todoListBody");
let addBtn = document.getElementById("addTaskBtn");
let taskManager = new TodoManager();

// main
addBtn.addEventListener("click", () => {
  let txtInput = document.getElementById("newTaskInput");
  if (txtInput.value) {
    taskManager.addTask(txtInput.value);
    txtInput.value = "";
  }
});

let storageArr = JSON.parse(localStorage.getItem("todo_list")) || [];
let todoArr = storageArr.map(item => JSON.parse(item));
todoArr.forEach((task) => {
  console.log(task);
  taskManager.addExistingTask(task);
});


function addTaskToScreen(task, index) {
  //create the element
  let tr_row = document.createElement("tr");
  tr_row.className = "todo-row";
  tr_row.id = `row${index}`;
  let td_chkbox = document.createElement("td");
  td_chkbox.className = "todo-cell";
  let chkbox = document.createElement("input");
  chkbox.className = "box";
  chkbox.type = "checkbox";
  chkbox.checked = task.isComplete;
  td_chkbox.appendChild(chkbox);
  tr_row.appendChild(td_chkbox);
  let td_id = document.createElement("td");
  td_id.className = "todo-cell";
  td_id.textContent = task.id;
  tr_row.appendChild(td_id);
  let td_desc = document.createElement("td");
  td_desc.className = "todo-cell";
  td_desc.textContent = task.description;
  tr_row.appendChild(td_desc);
  let td_date = document.createElement("td");
  td_date.className = "todo-cell";
  td_date.textContent = task.creationDate;
  tr_row.appendChild(td_date);
  let td_btn_edit = document.createElement("td");
  td_btn_edit.className = "todo-cell";
  let btn_edit = document.createElement("button");
  btn_edit.textContent = "edit";
  td_btn_edit.appendChild(btn_edit);
  tr_row.appendChild(td_btn_edit);
  let td_btn_del = document.createElement("td");
  td_btn_del.className = "todo-cell";
  let btn_del = document.createElement("button");
  btn_del.textContent = "delete";
  td_btn_del.appendChild(btn_del);
  tr_row.appendChild(td_btn_del);


  tableBody.appendChild(tr_row);

  chkbox.addEventListener("change", () => {
    let storageArr = JSON.parse(localStorage.getItem("todo_list")) || [];
    let todoArr = storageArr.map(item => JSON.parse(item));
    if (chkbox.checked == true) {
      task.isComplete = true;
      td_desc.style.textDecoration = "line-through";
      todoArr.forEach((item, ix) => {
        if (ix == index) {
          item.isComplete = true;
        }
      })
    } else {
      task.isComplete = false;
      td_desc.style.textDecoration = "none";
      todoArr.forEach((item, ix) => {
        if (ix == index) {
          item.isComplete = false;
        }
      })
    }
    todoArr = todoArr.map(item => JSON.stringify(item));
    localStorage.setItem("todo_list", JSON.stringify(todoArr));
  });

  btn_edit.addEventListener("click", () => {
    tr_row.removeChild(td_chkbox);
    tr_row.removeChild(td_id);
    tr_row.removeChild(td_desc);
    tr_row.removeChild(td_date);
    tr_row.removeChild(td_btn_edit);
    tr_row.removeChild(td_btn_del);
    makeRowEditable(task, index);
  });

  btn_del.addEventListener("click", () => { taskManager.removeTask(index) });

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

function updChkbox(isComplete) {
  if (isComplete == true) {

  }
}
function makeRowEditable(task, index) {
  let rowOnHtml = document.getElementById("row" + index);
  let td_chkbox = document.createElement("td");
  td_chkbox.className = "todo-cell";
  let chkbox = document.createElement("input");
  chkbox.className = "box";
  chkbox.type = "checkbox";
  chkbox.checked = task.isComplete;
  td_chkbox.appendChild(chkbox);
  rowOnHtml.appendChild(td_chkbox);
  let td_id = document.createElement("td");
  td_id.className = "todo-cell";
  td_id.textContent = task.id;
  rowOnHtml.appendChild(td_id);
  let editable = document.createElement("input");
  editable.type = "text";
  editable.className = "todo-cell";
  editable.id = "editInput" + index;
  editable.value = task.description;
  rowOnHtml.appendChild(editable);
  let td_date = document.createElement("td");
  td_date.className = "todo-cell";
  td_date.textContent = task.creationDate;
  rowOnHtml.appendChild(td_date);
  let td_btn_edit = document.createElement("td");
  td_btn_edit.className = "todo-cell";
  let btn_edit = document.createElement("button");
  btn_edit.textContent = "save";
  td_btn_edit.appendChild(btn_edit);
  rowOnHtml.appendChild(td_btn_edit);
  let td_btn_del = document.createElement("td");
  td_btn_del.className = "todo-cell";
  let btn_del = document.createElement("button");
  btn_del.textContent = "delete";
  td_btn_del.appendChild(btn_del);
  rowOnHtml.appendChild(td_btn_del);

  btn_edit.addEventListener("click", () => {
    editTask(index);
  });
}

function editTask(index) {
  let editInput = document.getElementById("editInput" + index);
  if (editInput.value) {
    taskManager.updateTask(index, editInput.value);
  }
}


