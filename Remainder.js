const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const taskInput = document.querySelector('#task');
const deleteItm = document.querySelector(".fa fa-remove");
const eroorBlck = document.querySelector(".errorBlk");


loadEventListeners();

function loadEventListeners() {
    document.addEventListener("DOMContentLoaded", restoreTask)
    form.addEventListener('submit', addTask);
    document.body.addEventListener("click", deleteItem);
}

function restoreTask() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(func);

    function func(task) {
        const li = document.createElement('li');
        li.className = 'list-content';
        li.appendChild(document.createTextNode(task));
        const link = document.createElement('a');
        link.className = 'fa fa-remove';
        li.appendChild(link);
        taskList.appendChild(li);

    }
}

function addTask(e) {
    if (taskInput.value === '') {
        //        alert('Error Please add a task');
        disBlkCde("check your input");
        e.preventDefault();
    } else {
        const li = document.createElement('li');
        li.className = 'list-content';
        li.appendChild(document.createTextNode(taskInput.value));
        const link = document.createElement('a');
        link.className = 'fa fa-remove';
        li.appendChild(link);
        taskList.appendChild(li);

        storeTaskInLs(taskInput.value);

        taskInput.value = "";
        e.preventDefault();

    }
}

function disBlkCde(error) {
    const errorBlock = document.createElement("div");
    const inputAbv = document.querySelector(".heading-todo");
    const inputIn = document.querySelector(".headandadd");

    errorBlock.className = "errorBlk";
    errorBlock.appendChild(document.createTextNode(error));
     const link = document.createElement('a');
        link.className = 'fa fa-remove';
        errorBlock.appendChild(link);
    inputIn.prepend(errorBlock);
    setTimeout(clearThisError, 3000);
}

function clearThisError() {
    document.querySelector(".errorBlk").remove();
}

function storeTaskInLs(input) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(input);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteItem(e) {
    if (e.target.classList.contains("fa-remove")) {
        if (confirm("Are you sure")) {
            e.target.parentElement.remove();
            console.log("Deleted");
            deleteFromLS(e.target.parentElement);
        }
    } else if (e.target.classList.contains("clear-tasks")) {
        if (confirm("Are you sure you want to clear all the tasks")) {
            taskList.innerHTML = "";
            localStorage.clear();
            console.log("Cleared all");
        }
    }
}

function deleteFromLS(pa) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach(funct);

    function funct(taskItem, index) {
        if (pa.textContent === taskItem) {
            tasks.splice(index, 1);
        }
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
