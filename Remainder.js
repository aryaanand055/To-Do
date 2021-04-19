const body = document.getElementById("body");
const ulListTDo = document.getElementById("todo");
const ulListDone = document.getElementById("done");
const form = document.getElementById("taskForm");
const formInput = document.getElementById("task");
const clearAll = document.getElementById("clear-tasks");
const filter = document.getElementById("filter");
const lists = document.getElementById("lists");
const button1 = document.getElementById("butt1")
const button2 = document.getElementById("butt2")

loadEventListeners();


function loadEventListeners() {
    button1.addEventListener("click", clearTasksTodo)
    button2.addEventListener("click", clearTasksDone)
    form.addEventListener("submit", addTask);
    ulListTDo.addEventListener("click", removeTaskTodo);
    ulListDone.addEventListener("click", removeTaskDone);
    document.addEventListener("DOMContentLoaded", restoreFromLS);
    filter.addEventListener("keyup", filterTasks);
    document.addEventListener("mousemove", changeBackground);
    lists.addEventListener("click", changeList);
    clearAll.addEventListener("mouseenter", displayElement);
    button1.addEventListener("mouseleave", displayElement2);
    button2.addEventListener("mouseleave", displayElement2);
}

function restoreFromLS() {
    let ls;
    if (localStorage.getItem("tasksToDo") === null) {
        ls = [];
    } else {
        ls = JSON.parse(localStorage.getItem("tasksToDo"));
    }
    ls.forEach(function (task) {
        const createdLi = document.createElement("li");
        createdLi.className = "list-content";

        const text = document.createTextNode(task);
        createdLi.appendChild(text);
        const deleteIcon = document.createElement("i");
        deleteIcon.classList = "fa fa-remove";
        createdLi.appendChild(deleteIcon);
        const checkBox = document.createElement("input");
        checkBox.type = "checkBox";
        checkBox.classList = "checkBoxes";
        createdLi.appendChild(checkBox);
        ulListTDo.appendChild(createdLi);
    })

    let lsd;
    if (localStorage.getItem("tasksDone") === null) {
        lsd = [];
    } else {
        lsd = JSON.parse(localStorage.getItem("tasksDone"));
    }
    lsd.forEach(function (task) {
        const createdLi = document.createElement("li");
        createdLi.className = "list-content";

        const text = document.createTextNode(task);
        createdLi.appendChild(text);
        const deleteIcon = document.createElement("i");
        deleteIcon.classList = "fa fa-remove";
        createdLi.appendChild(deleteIcon);
        const checkBox = document.createElement("input");
        checkBox.type = "checkBox";
        checkBox.classList = "checkBoxes";
        checkBox.checked = true;
        createdLi.appendChild(checkBox);
        createdLi.style.textDecoration = "line-through";
        createdLi.style.color = "rgb(0, 0, 1, 0.6)";
        ulListDone.appendChild(createdLi);
    })


}

function addTask(e) {
    if (formInput.value === "") {
        alert("The input is blank");
        e.preventDefault();
    } else {
        const createdLi = document.createElement("li");
        createdLi.className = "list-content";

        const text = document.createTextNode(formInput.value);
        createdLi.appendChild(text);
        const deleteIcon = document.createElement("i");
        deleteIcon.classList = "fa fa-remove";
        createdLi.appendChild(deleteIcon);
        const checkBox = document.createElement("input");
        checkBox.type = "checkBox";
        checkBox.classList = "checkBoxes";
        createdLi.appendChild(checkBox);
        ulListTDo.appendChild(createdLi);


        storeToLS(formInput.value, "todo");
        formInput.value = "";

        e.preventDefault();
    }
}

function removeTaskTodo(e) {
    if (e.target.classList.contains("fa-remove")) {
        e.target.parentElement.remove();

        deleteFromLS(e.target.parentElement, "todo")
    }
}

function removeTaskDone(e) {
    if (e.target.classList.contains("fa-remove")) {
        e.target.parentElement.remove();

        deleteFromLS(e.target.parentElement, "done")
    }
}

function storeToLS(taskToStore, place) {
    if (place === "todo") {
        let ls;
        if (localStorage.getItem("tasksToDo") === null) {
            ls = [];
        } else {
            ls = JSON.parse(localStorage.getItem("tasksToDo"));
        }
        ls.push(taskToStore);
        localStorage.setItem("tasksToDo", JSON.stringify(ls))
    } else if (place === "done") {
        let ls;
        if (localStorage.getItem("tasksDone") === null) {
            ls = [];
        } else {
            ls = JSON.parse(localStorage.getItem("tasksDone"));
        }
        ls.push(taskToStore);
        localStorage.setItem("tasksDone", JSON.stringify(ls))
    }
}

function deleteFromLS(itemToDel, place) {
    if (place === "todo") {
        let ls;
        if (localStorage.getItem("tasksToDo") === null) {
            ls = [];
        } else {
            ls = JSON.parse(localStorage.getItem("tasksToDo"));
        }

        let indexOfItem = ls.indexOf(itemToDel.textContent);
        ls.splice(indexOfItem, 1);




        localStorage.setItem("tasksToDo", JSON.stringify(ls));
    } else if (place === "done") {

        let ls;
        if (localStorage.getItem("tasksDone") === null) {
            ls = [];
        } else {
            ls = JSON.parse(localStorage.getItem("tasksDone"));
        }

        let indexOfItem = ls.indexOf(itemToDel.textContent);
        ls.splice(indexOfItem, 1);



        localStorage.setItem("tasksDone", JSON.stringify(ls));
    }
}

function clearTasksTodo() {
    if (confirm("Are you sure you want to delete all todo tasks?")) {
        const findList = ulListTDo.childNodes;
        let arrr2 = [];
        let ls;


        findList.forEach(function (nodoNow) {
            if (nodoNow.className === "list-content") {

                arrr2.push(nodoNow)
            }
        })

        arrr2.forEach(function (e) {
            e.remove()
        })
        ls = localStorage.getItem("tasksToDo");
        ls = JSON.stringify([]);
        localStorage.setItem("tasksToDo", ls);
    }
}

function clearTasksDone() {
    if (confirm("Are you sure you want to delete all completed tasks?")) {
        const findList = ulListDone.childNodes;
        let arrr2 = [];
        let ls;


        findList.forEach(function (nodoNow) {
            if (nodoNow.className === "list-content") {

                arrr2.push(nodoNow)
            }
        })

        arrr2.forEach(function (e) {
            e.remove()
        })
        ls = localStorage.getItem("tasksDone");
        ls = JSON.stringify([]);
        localStorage.setItem("tasksDone", ls);
    }

}

function changeList(e) {
    if (e.target.classList.contains("checkBoxes") && e.target.checked === true) {
        console.log("Yes");
        const moveTask = e.target.parentElement;
        deleteFromLS(e.target.parentElement, "todo");

        e.target.parentElement.remove();
        moveTask.style.textDecoration = "line-through";
        storeToLS(moveTask.textContent, "done")

        ulListDone.appendChild(moveTask);
    } else if (e.target.checked === false) {
        const moveTask = e.target.parentElement;
        deleteFromLS(e.target.parentElement, "done");
        e.target.parentElement.remove()
        moveTask.style.textDecoration = "none";
        storeToLS(moveTask.textContent, "todo")
        ulListTDo.appendChild(moveTask);
    } else {


    }
}



function filterTasks() {
    const filterValue = filter.value.toLowerCase();
    document.querySelectorAll(".list-content").forEach(filterTask);

    function filterTask(task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(filterValue) != -1) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    }
}

function changeBackground(e) {
    document.body.style.backgroundColor = `rgb(${e.offsetX}, ${e.offsetY}, 150 )`;
    if (e.target.classList.contains("fa")) {
        document.body.style.backgroundColor = `red`
    } else if (e.target.classList.contains("filter")) {
        document.body.style.backgroundColor = "#3bff3b"

    }
}

function displayElement() {
    clearAll.style.display = "none";
    button1.style.display = "inline-block";
    button2.style.display = "inline-block";
}

function displayElement2() {
    button1.style.display = "none";
    button2.style.display = "none";
    clearAll.style.display = "inline-block";
}
