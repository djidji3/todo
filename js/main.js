'use strict';

/* hasznalt html elemazonositok */
let day = document.querySelector('.body__day');
let date = document.querySelector('.body__date');
let newTaskInput = document.querySelector('.newTaskInput');
let addButton = document.querySelector('.addButton');
let actualTodoNumber = document.querySelector('.todo__number');
let pendingItemsCounter = document.querySelector('.pendingItemsCounter');
let doneItemsCounter = document.querySelector('.doneItemsCounter');
let todoListItems = document.querySelectorAll('.todo__list--item');
let todoList = document.querySelector('.todo__list');
let todoListPending = document.querySelector('.todo__list--pending');
let todoListDone = document.querySelector('.todo__list--done');
let todoListDeleteBtn = document.querySelectorAll('.todo__list--deleteBtn')
let taskRow = document.querySelectorAll('.todo__list--item');
let footer = document.querySelector('.footer');
let footerBtnComplete = document.querySelector('.footer__btn--complete');
let footerBtnClear = document.querySelector('.footer__btn--clear');

/* pelda a todos tomb-objectum tartalmara */
let todos = [];
/*  [{
            task: 'Ebed Amcsival',
            status: true
        },
        {
            text: 'Bevasarlas',
            done: false
        } 
];
*/


/* SEGEDFUGGVENY: jelenitse meg a het napjanak nevet itt: day*/
function displayDayOfTheWeek() {
    day.innerText = new Date()
        .toDateString()
        .split(' ')[0];
};

/* SEGEDFUGGVENY: jelenitse meg a datumot itt: date*/
function displayDate() {
    date.innerText = new Date()
        .toLocaleDateString()
        .replaceAll('. ', '-');
};


/* SEGEDFUGGVENY: lokalis todo objectumot kezelo */
/* title a key a localstorageben */
/* value az objectum teljes tartalma vagyis egy tomb,benne az objectum soraival*/
const storageManager = {
    /* storageManager.setTodoItem('feladatok', todos); */
    setTodoItem(key, value) {
        value = JSON.stringify(value);
        localStorage.setItem(key, value);
    },
    /*  storageManager.getTodoItem('feladatok'); */
    getTodoItem(key) {
        const value = localStorage.getItem(key);
        if (!value) {
            return null;
        }
        return JSON.parse(value);

    },
    /* storageManager.removeTodoItem('feladat1'); */
    removeTodoItem(key, value) {
        localStorage.removeItem(key, value.task);
    },
    /* storageManager.clearTodoItems('feladatok'); */
    clearTodoItems(key) {
        localStorage.clear(key);
    }
};


/* SEGEDFUGGVENY: localStorage adatainak beolvasasa 'todos' objectumba, ha vannak adatok*/
function loadInput2Todos() {
    /* ellenorzom hogy lett-e vmi beirva a bevitelimezobe */
    const task = newTaskInput.value;
    if (task === '') {
        alert('Please type a todo !');
        return;
    }
    /* todo objectuma igy nez ki */
    /* task attributom a bevitelimezo tartalma */
    /* ('status' megmondja hogy el van-e vegezve a feladat) */
    const todo = {
        task: task,
        status: false
    };

    /* a todo objectumot feltoltjuk a todos tombbe */
    todos.push(todo);
    /* li lista tartalmat uritjuk */

    /* betoltjuk a todos tartalmat az li-be */
    loadTodo2Div(todo);

    /*frissitjuk az elvegezendo feladatok szamat */
    refreshPendingItemsCounter();

    /* localStorage-ba a feltoljuk a todos tartalmat 'feladatok' neven */
    loadTodos2LocalStorage('feladatok', todos);
};


/* SEGEDFUGGVENY: egy todo-t megjeleniti a listaban */
function loadTodo2Div(todo) {
    let todoItem = document.createElement('div');
    todoItem.className = 'todo__list--item';
    todoListPending.appendChild(todoItem);
    todoItem.innerHTML = `
    <input type="checkbox" name="" id="">
    <span class='task'>${todo.task}</span>
    <button class='todo__list-deleteBtn'>Törlés</button>
    `;

    newTaskInput.value = '';

    /*    let ul = document.createElement('ul');
    todoListPending.appendChild(ul);
    let li = document.createElement('LI');
    li.className = 'todo__list--item';
    li.innerHTML = todo.task;
    ul.appendChild(li);
    let span = document.createElement("SPAN");
    span.className = "close";
    li.appendChild('span');
    let txt = document.createTextNode("\u00D7");
    li.appendChild(txt);
    newTaskInput.value = '';
 */
};


/* SEGEDFUGGVENY: todos-t  megjelenitese a listaban */
function loadTodos2Li() {
    if (todos && Array.isArray(todos)) {
        todos.forEach(item => loadTodo2Div(item));
    }
};

/* SEGEDFUGGVENY: li listaelemek torlese a listaban */
function removeLiItems() {
    let todoListItems = document.querySelectorAll('.todo__list--item');
    for (let i = 0; i < todoListItems.length; i += 1) {
        todoListItems[i].remove();

    }

};

/* a todos tartalmat feltoljuk a localStorage-ba 'feladatok' neven */
/*igy kell meghivni loadTodos2LocalStorage('feladatok', todos); */
function loadTodos2LocalStorage(key, value) {
    storageManager.setTodoItem(key, value);
};


/* SEGEDFUGGVENY: localStorage adatainak beolvasasa 'todos' objectumba, ha vannak adatok*/
function loadLocalStorage2Todos() {
    const savedTodos = storageManager.getTodoItem('feladatok');
    if (savedTodos) {
        todos = savedTodos;
    }
};

/* frissiti a folyamatban levo task-ok szamat jelzo mezot */
function refreshPendingItemsCounter() {
    let feladatok = todos;
    let counter = 0;
    feladatok.map((item) => {
        if (item.status === false) {
            counter += 1;
        }
    })
    pendingItemsCounter.innerText = counter;
};

/* frissiti az elvegzett task-ok szamat jelzo mezot */
function refreshDoneItemsCounter() {
    let feladatok = todos;
    let counter = 0;
    feladatok.map((item) => {
        if (item.status === true) {
            counter += 1;
        }
    })
    doneItemsCounter.innerText = counter;
};

/* egy todo elem torlese */
function deleteTodoItem(todo) {
    storageManager.removeTodoItems(todo)
}


/* torli az osszes feladatot, localstorage tartalmat, li elemeket */
/* clearAllTodos('feladatok'); */
function clearAllTodos() {
    todos = [];
    storageManager.clearTodoItems('feladatok');
    removeLiItems();
    refreshPendingItemsCounter();
};

/* torol egy sort a feladat listabol */
function deleteTaskRow(event) {
    if (event.target.className === 'todo__list-deleteBtn') {
        let task = (event.target.parentElement.children[1].innerText);
        console.log(task);
        let taskParent = event.target.parentElement;
        taskParent.remove();
        todos.forEach(function(element, index) {
            if (element.task === task)
                todos.splice(index, 1)
        })
    }
    loadTodos2LocalStorage('feladatok', todos);
};



/*                            ESEMENYKEZELO FUGGVENYEK */
/* + gombra kattintaskor */
addButton.addEventListener('click', loadInput2Todos);

/* 'Clear All' gombra kattintaskor */
footerBtnClear.addEventListener('click', clearAllTodos);

/* bmelyik todo elemen valo kattintaskor hivodik meg */
todoList.addEventListener('click', deleteTaskRow);

/*                                  MAIN */
displayDayOfTheWeek();
displayDate();
loadLocalStorage2Todos();
loadTodos2Li();
refreshPendingItemsCounter();


























/* regibol maradt */
/* 
let myNodelist = document.getElementsByTagName("LI");
for (let i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
} */
/* var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
} */

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
    }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
    }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value = "";

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }
}