
// import
import { taskManager, editTask, tableBody } from "./todoListOOP.js";

// functions
export function addTaskToScreen(task, index) {
    //create the element
    let trRow = document.createElement("tr");
    trRow.className = "todo-row";
    trRow.id = `row${index}`;
    let tdChkbox = document.createElement("td");
    tdChkbox.className = "todo-cell";
    let chkbox = document.createElement("input");
    chkbox.className = "box";
    chkbox.type = "checkbox";
    chkbox.checked = task.isComplete;
    tdChkbox.appendChild(chkbox);
    trRow.appendChild(tdChkbox);
    let tdId = document.createElement("td");
    tdId.className = "todo-cell";
    tdId.textContent = task.id;
    trRow.appendChild(tdId);
    let tdDesc = document.createElement("td");
    tdDesc.className = "todo-cell";
    tdDesc.textContent = task.description;
    trRow.appendChild(tdDesc);
    let tdDate = document.createElement("td");
    tdDate.className = "todo-cell";
    tdDate.textContent = task.creationDate;
    trRow.appendChild(tdDate);
    let tdBtnEdit = document.createElement("td");
    tdBtnEdit.className = "todo-cell";
    let btnEdit = document.createElement("button");
    btnEdit.textContent = "edit";
    tdBtnEdit.appendChild(btnEdit);
    trRow.appendChild(tdBtnEdit);
    let tdBtnDel = document.createElement("td");
    tdBtnDel.className = "todo-cell";
    let btnDel = document.createElement("button");
    btnDel.textContent = "delete";
    tdBtnDel.appendChild(btnDel);
    trRow.appendChild(tdBtnDel);


    tableBody.appendChild(trRow);

    chkbox.addEventListener("change", () => {
        let storageArr = JSON.parse(localStorage.getItem("todo_list")) || [];
        let todoArr = storageArr.map(item => JSON.parse(item));
        if (chkbox.checked == true) {
            task.isComplete = true;
            tdDesc.style.textDecoration = "line-through";
            todoArr.forEach((item, ix) => {
                if (ix == index) {
                    item.isComplete = true;
                }
            })
        } else {
            task.isComplete = false;
            tdDesc.style.textDecoration = "none";
            todoArr.forEach((item, ix) => {
                if (ix == index) {
                    item.isComplete = false;
                }
            })
        }
        todoArr = todoArr.map(item => JSON.stringify(item));
        localStorage.setItem("todo_list", JSON.stringify(todoArr));
    });

    btnEdit.addEventListener("click", () => {
        trRow.removeChild(tdChkbox);
        trRow.removeChild(tdId);
        trRow.removeChild(tdDesc);
        trRow.removeChild(tdDate);
        trRow.removeChild(tdBtnEdit);
        trRow.removeChild(tdBtnDel);
        makeRowEditable(task, index);
    });

    btnDel.addEventListener("click", () => { taskManager.removeTask(index) });

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